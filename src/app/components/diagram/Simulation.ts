import * as d3 from "d3-force";
import {action, autorun, computed, observable, values} from "mobx";
import {Instance, types} from "mobx-state-tree";
import {SimulationLinkDatum, SimulationNodeDatum} from "d3-force";
import {Diagram, GRID_PRECISION, IDiagram} from "./Diagram";
import {INode, Node} from "./Node";
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

// TODO: replace with factory function (insert into createSimulatedNode)
// class SimulatedNode implements SimulationNodeDatum {
//   @observable x = 0;
//   @observable y = 0;
//   @observable fx = null;
//   @observable fy = null;
//
//   constructor(public id: number, x: number, y: number) {
//     this.id = id; // TODO: is this required? I'm using the public keyword...
//     this.x = x;
//     this.y = y;
//   }
//
//   @computed get dx() {
//     return round(this.x, GRID_PRECISION);
//   }
//
//   @computed get dy() {
//     return round(this.y, GRID_PRECISION);
//   }
// }
//
// function createSimulatedNode(node : INode) {
//   return new SimulatedNode(node.id, node.x, node.y);
// }

function SimulatedNode(id: number,
                       x: number,
                       y: number,
                       notifyDragStarted: () => void,
                       notifyDragEnded: () => void) {
  return observable({
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
        notifyDragStarted();
        this.fx = x;
        this.fy = y;
      },

      onSVGDrag: (x, y) => {
        this.fx = x;
        this.fy = y;
      },

      onSVGDragEnded: () => {
        notifyDragEnded();
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

function SimulatedLink(sourceId: number, targetId: number) {
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

function SimulatedDiagram(diagram: any) {   // TODO: change type! (after we see the extend thing works)
  let d3Simulation = null;
  let animationFrameId = 0;

  const isRunning = () => d3Simulation != null;

  function initSimulation() {
    const nodes = values(diagram.nodes).map(node => node.simulatedNode);
    const links = values(diagram.links).map(link => link.simulatedLink);

    this.simulation = d3.forceSimulation();
    this.simulation
      .nodes(nodes)
      //.force("centering_force", d3.forceCenter())
      .force("charge_force", d3.forceManyBody().strength(CHARGE_FORCE_STRENGTH))
      .force("links_force", d3.forceLink(links).distance(LINK_DISTANCE))
      .force("collide_force", d3.forceCollide().strength(COLLIDE_FORCE_STRENGTH).radius(1.5))
      .alpha(ALPHA_INITIAL)
      .alphaMin(ALPHA_MIN)
      .alphaTarget(ALPHA_TARGET_WHEN_NOT_DRAGGING)
      .stop();

    this.restartSimulation();

    // if (DEBUG_MODE)
    //   autorun(this.logRunningState.bind(this));
  }

  function restartSimulation() {
    stopSimulation();
    if (d3Simulation.alpha() >= d3Simulation.alphaMin())
      animationFrameId = window.requestAnimationFrame(tickSimulation);
  }

  function tickSimulation() {
    d3Simulation.tick();
    restartSimulation();
  }

  function stopSimulation() {
    if (isRunning)
      window.cancelAnimationFrame(animationFrameId);
    animationFrameId = 0;
  }

  return {
    views: {
      isRunning
    },
    actions: {
      initSimulation,   // TODO: we'll probably want to call it after adding nodes to the diagram...

      notifyDragStarted() {
        d3Simulation.alphaTarget(ALPHA_TARGET_WHEN_DRAGGING).alpha(ALPHA_INITIAL);
        restartSimulation();
      },

      notifyDragEnded() {
        d3Simulation.alphaTarget(ALPHA_TARGET_WHEN_NOT_DRAGGING);
      }
    }
  }
}

export {SimulatedNode, SimulatedLink, SimulatedDiagram};
