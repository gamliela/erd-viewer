import * as d3 from "d3-force";
import {action, autorun, computed, observable} from "mobx";
import {NodeModel} from "./NodeModel";
import {LinkModel} from "./LinkModel";

const DEBUG_MODE = true;
const CHARGE_FORCE_STRENGTH = -0.5;
const COLLIDE_FORCE_STRENGTH = 0.5;
const LINK_DISTANCE = 10;
const ALPHA_INITIAL = 1;
const ALPHA_MIN = 0.001;
const ALPHA_TARGET_WHEN_NOT_DRAGGING = 0;   // must be < ALPHA_MIN
const ALPHA_TARGET_WHEN_DRAGGING = 0.3;     // must be > ALPHA_MIN

class SimulationModel {
  private simulation;
  @observable private animationFrameId = 0;

  init(nodes: NodeModel[], links: LinkModel[], startFrozen: boolean = false) {
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

    if (!startFrozen) {
      this.restartSimulation();
    }

    if (DEBUG_MODE)
      autorun(this.logRunningState.bind(this));
  }

  @action.bound
  restartSimulation() {
    this.stopSimulation();
    if (this.simulation.alpha() >= this.simulation.alphaMin())
      this.animationFrameId = window.requestAnimationFrame(this.tickSimulation);
  }

  @action.bound
  tickSimulation() {
    this.simulation.tick();
    this.restartSimulation();
  }

  @action.bound
  stopSimulation() {
    if (this.isRunning)
      window.cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = 0;
  }

  @computed get isRunning() {
    return this.animationFrameId != 0;
  }

  @action.bound
  notifyDragStarted() {
    this.simulation.alphaTarget(ALPHA_TARGET_WHEN_DRAGGING).alpha(ALPHA_INITIAL);
    this.restartSimulation();
  }

  @action.bound
  notifyDragEnded() {
    this.simulation.alphaTarget(ALPHA_TARGET_WHEN_NOT_DRAGGING);
  }

  private logRunningStateTimerStart = 0;

  logRunningState() {
    const now = performance.now();
    if (this.isRunning) {
      this.logRunningStateTimerStart = now;
      console.log('simulation started');
    } else
      console.log(`simulation ended (${(now - this.logRunningStateTimerStart) / 1000} seconds)`);
  }
}

export default SimulationModel;
