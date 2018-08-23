import * as d3 from "d3-force";
import NodeModel from "./NodeModel";
import LinkModel from "./LinkModel";
import {action, observable} from "mobx";

const CHARGE_FORCE_STRENGTH = -0.5;
const COLLIDE_FORCE_STRENGTH = 0.5;
const LINK_DISTANCE = 10;
const ALPHA_MIN = 0.001;
const ALPHA_TARGET_WHEN_NOT_DRAGGING = 0;   // must be < ALPHA_MIN
const ALPHA_TARGET_WHEN_DRAGGING = 0.3;     // must be > ALPHA_MIN

class SimulationModel {
  private simulation;
  @observable running = true;

  init(nodes: NodeModel[], links: LinkModel[]) {
    this.simulation = d3.forceSimulation();
    this.simulation
      .nodes(nodes)
      .force("charge_force", d3.forceManyBody().strength(CHARGE_FORCE_STRENGTH))
      .force("links_force", d3.forceLink(links).distance(LINK_DISTANCE))
      .force("collide_force", d3.forceCollide().strength(COLLIDE_FORCE_STRENGTH).radius(1.5))
      .alphaMin(ALPHA_MIN)
      .on('end', () => { this.running = false } );
  }

  @action.bound
  notifyDragStarted() {
    this.simulation.alphaTarget(ALPHA_TARGET_WHEN_DRAGGING).restart();
    this.running = true;
  }

  @action.bound
  notifyDragEnded() {
    this.simulation.alphaTarget(ALPHA_TARGET_WHEN_NOT_DRAGGING);
  }
}

export default SimulationModel;
