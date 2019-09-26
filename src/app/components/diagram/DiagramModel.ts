import {observable} from "mobx";
import {NodeModel} from "./NodeModel";
import {LinkModel} from "./LinkModel";
import SimulationModel from "./Simulation";
import {DotGraph} from "../../models/erd/dot_json_types";

const GRID_PRECISION = 0.1;

class DiagramModel {
  zoomFactor: number = 50;
  @observable nodes: NodeModel[];
  @observable links: LinkModel[];
  public readonly simulationModel = new SimulationModel();

  constructor(graph: DotGraph) {
    this.nodes = graph.objects.map((obj, index) => new NodeModel(index, obj.name, this.simulationModel, GRID_PRECISION));
    this.links = graph.edges.map((edge, index) => new LinkModel(index, this.nodes[edge.tail], this.nodes[edge.head]));
    this.simulationModel.init(this.nodes, this.links);
  }
}

export {DiagramModel};
