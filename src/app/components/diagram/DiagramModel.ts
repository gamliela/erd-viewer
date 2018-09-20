import {computed, observable} from "mobx";
import {DotGraph} from "../../models/erd/dot_json_types";
import NodeModel from "./NodeModel";
import LinkModel from "./LinkModel";
import SimulationModel from "./SimulationModel";

const ROUND_PRECISION = 0.1;
const BASE_VIEWPORT_WIDTH = 100;
const BASE_VIEWPORT_HEIGHT = 50;

class DiagramModel {
  zoomFactor: number = 1;
  @observable nodes: NodeModel[];
  @observable links: LinkModel[];
  public readonly simulationModel = new SimulationModel();

  constructor(graph: DotGraph) {
    this.nodes = graph.objects.map((obj, index) => new NodeModel(index, obj.name, this.simulationModel, ROUND_PRECISION));
    this.links = graph.edges.map((edge, index) => new LinkModel(index, this.nodes[edge.tail], this.nodes[edge.head]));
    this.simulationModel.init(this.nodes, this.links);
  }

  @computed get viewportWidth() {
    return this.zoomFactor * BASE_VIEWPORT_WIDTH;
  }

  @computed get viewportHeight() {
    return this.zoomFactor * BASE_VIEWPORT_HEIGHT;
  }
}

export {BASE_VIEWPORT_WIDTH, BASE_VIEWPORT_HEIGHT};

export default DiagramModel;
