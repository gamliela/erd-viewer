import * as d3 from "d3-force";
import NodeModel from "./NodeModel";
import LinkModel from "./LinkModel";

const CHARGE_FORCE_STRENGTH = -0.5;
const COLLIDE_FORCE_STRENGTH = 0.5;
const LINK_DISTANCE = 10;

class SimulationModel {
  private simulation;

  constructor(nodes: NodeModel[], links: LinkModel[]) {
    this.simulation = d3.forceSimulation();
    this.simulation
      .nodes(nodes)
      .force("charge_force", d3.forceManyBody().strength(CHARGE_FORCE_STRENGTH))
      .force("links_force", d3.forceLink(links).distance(LINK_DISTANCE))
      .force("collide_force", d3.forceCollide().strength(COLLIDE_FORCE_STRENGTH).radius(1.5));
  }
}

export default SimulationModel;
