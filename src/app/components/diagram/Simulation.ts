import * as d3 from "d3-force";
import {action, autorun, computed, observable, values} from "mobx";
import {Instance, types} from "mobx-state-tree";
import {SimulationLinkDatum, SimulationNodeDatum} from "d3-force";
import {Diagram, GRID_PRECISION, IDiagram, DiagramModel} from "./Diagram";
import {INode, INodeParent, Node} from "./Node";
import {ILink} from "./Link";

const DEBUG_MODE = true;
const CHARGE_FORCE_STRENGTH = -0.5;
const COLLIDE_FORCE_STRENGTH = 0.5;
const LINK_DISTANCE = 10;
const ALPHA_INITIAL = 1;
const ALPHA_MIN = 0.001;
const ALPHA_TARGET_WHEN_NOT_DRAGGING = 0;   // must be < ALPHA_MIN
const ALPHA_TARGET_WHEN_DRAGGING = 0.3;     // must be > ALPHA_MIN

function round(p, n) {
  return p % n < n / 2 ? p - (p % n) : p + n - (p % n);
}

interface ISimulatedNode extends SimulationNodeDatum {
  readonly dx: number,
  readonly dy: number,
  onSVGDragStarted: (x: number, y: number) => void,
  onSVGDrag: (x: number, y: number) => void,
  onSVGDragEnded: () => void
}

function createSimulatedNode(id: number,
                             x: number,
                             y: number,
                             onDragStarted: () => void,
                             onDragEnded: () => void): ISimulatedNode {
  return observable.object({
      id: id,
      x: x,
      y: y,
      fx: null,
      fy: null,

      get dx() {
        return round(this.x, GRID_PRECISION);
      },

      get dy() {
        return round(this.y, GRID_PRECISION);
      },

      onSVGDragStarted: (x, y) => {
        onDragStarted();
        this.fx = x;
        this.fy = y;
      },

      onSVGDrag: (x, y) => {
        this.fx = x;
        this.fy = y;
      },

      onSVGDragEnded: () => {
        onDragEnded();
        this.fx = null;
        this.fy = null;
      }
    },
    {
      onSVGDragStarted: action.bound,
      onSVGDrag: action.bound,
      onSVGDragEnded: action.bound
    },
    {
      deep: false   // d3 may add other properties, we don't want them to be observables! (TODO: check this)
    });
}

interface ISimulatedLink extends SimulationLinkDatum<SimulationNodeDatum> {
  source: number,
  target: number
}

function createSimulatedLink(sourceId: number, targetId: number): ISimulatedLink {
  return {
    source: sourceId,
    target: targetId
  };
}

// // TODO: replace with factory function
// class Simulation {
//   private simulation;
//   @observable animationFrameId = 0;
//
//   init(nodes: SimulationNodeDatum[], links: SimulationLinkDatum<SimulationNodeDatum>[]) {
//     this.simulation = d3.forceSimulation();
//     this.simulation
//       .nodes(nodes)
//       //.force("centering_force", d3.forceCenter())
//       .force("charge_force", d3.forceManyBody().strength(CHARGE_FORCE_STRENGTH))
//       .force("links_force", d3.forceLink(links).distance(LINK_DISTANCE))
//       .force("collide_force", d3.forceCollide().strength(COLLIDE_FORCE_STRENGTH).radius(1.5))
//       .alpha(ALPHA_INITIAL)
//       .alphaMin(ALPHA_MIN)
//       .alphaTarget(ALPHA_TARGET_WHEN_NOT_DRAGGING)
//       .stop();
//
//     this.restartSimulation();
//
//     if (DEBUG_MODE)
//       autorun(this.logRunningState.bind(this));
//   }
//
//   @action.bound
//   restartSimulation() {
//     this.stopSimulation();
//     if (this.simulation.alpha() >= this.simulation.alphaMin())
//       this.animationFrameId = window.requestAnimationFrame(this.tickSimulation);
//   }
//
//   @action.bound
//   tickSimulation() {
//     this.simulation.tick();
//     this.restartSimulation();
//   }
//
//   @action.bound
//   stopSimulation() {
//     if (this.isRunning)
//       window.cancelAnimationFrame(this.animationFrameId);
//     this.animationFrameId = 0;
//   }
//
//   @computed get isRunning() {
//     return this.animationFrameId != 0;
//   }
//
//   @action.bound
//   notifyDragStarted() {
//     this.simulation.alphaTarget(ALPHA_TARGET_WHEN_DRAGGING).alpha(ALPHA_INITIAL);
//     this.restartSimulation();
//   }
//
//   @action.bound
//   notifyDragEnded() {
//     this.simulation.alphaTarget(ALPHA_TARGET_WHEN_NOT_DRAGGING);
//   }
//
//   private logRunningStateTimerStart = 0;
//
//   // TODO: wrap with React hook function
//   logRunningState() {
//     const now = performance.now();
//     if (this.isRunning) {
//       this.logRunningStateTimerStart = now;
//       console.log('simulation started');
//     } else
//       console.log(`simulation ended (${(now - this.logRunningStateTimerStart) / 1000} seconds)`);
//   }
// }

function SimulatedDiagramType(self: { simulatedNodes: SimulationNodeDatum[], simulatedLinks: SimulationLinkDatum<SimulationNodeDatum>[] }) {
  let d3Simulation = null;
  let animationFrameId = 0;

  const isRunning = () => animationFrameId != 0;

  function initSimulation() {
    this.simulation = d3.forceSimulation();
    this.simulation
      .nodes(self.simulatedNodes)
      //.force("centering_force", d3.forceCenter())
      .force("charge_force", d3.forceManyBody().strength(CHARGE_FORCE_STRENGTH))
      .force("links_force", d3.forceLink(self.simulatedLinks).distance(LINK_DISTANCE))
      .force("collide_force", d3.forceCollide().strength(COLLIDE_FORCE_STRENGTH).radius(1.5))
      .alpha(ALPHA_INITIAL)
      .alphaMin(ALPHA_MIN)
      .alphaTarget(ALPHA_TARGET_WHEN_NOT_DRAGGING)
      .stop();

    this.requestSimulationTick();

    // if (DEBUG_MODE)
    //   autorun(this.logRunningState.bind(this));
  }

  function requestSimulationTick() {
    window.cancelAnimationFrame(animationFrameId);
    if (d3Simulation.alpha() >= d3Simulation.alphaMin())
      animationFrameId = window.requestAnimationFrame(() => {
        d3Simulation.tick();
        requestSimulationTick();
      });
  }

  return {
    views: {
      isRunning
    },
    actions: {
      initSimulation,   // TODO: we'll probably want to call it after adding nodes to the diagram...

      onDragStarted() {
        d3Simulation.alphaTarget(ALPHA_TARGET_WHEN_DRAGGING).alpha(ALPHA_INITIAL);
        requestSimulationTick();
      },

      onDragEnded() {
        d3Simulation.alphaTarget(ALPHA_TARGET_WHEN_NOT_DRAGGING);
      }
    }
  }
}

export {createSimulatedNode, createSimulatedLink, SimulatedDiagramType};
