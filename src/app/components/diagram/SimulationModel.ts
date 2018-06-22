import * as d3 from "d3-force";
import NodeModel from "./NodeModel";

const CHARGE_FORCE_STRENGTH = -0.5;

class SimulationModel {
  private simulation;

  constructor(public nodes: NodeModel[]) {
    this.simulation = d3.forceSimulation();
    this.simulation
      .nodes(nodes)
      .force("charge_force", d3.forceManyBody().strength(CHARGE_FORCE_STRENGTH))
      .force("center_force", d3.forceCenter(0, 0));
  }
}

export default SimulationModel;
