import {observable} from "mobx";
import {NodeModel} from "./NodeModel";
import {LinkModel} from "./LinkModel";
import SimulationModel from "./Simulation";
import {DotGraph} from "../../models/erd/dot_json_types";
import {list, object, serializable} from "serializr";

class DiagramModel {
  @serializable zoomFactor: number = 50;
  @serializable(list(object(NodeModel))) @observable nodes: NodeModel[] = [];
  @serializable(list(object(LinkModel))) @observable links: LinkModel[] = [];

  private simulationModel = new SimulationModel();

  constructor(graph?: DotGraph) {
    if (graph) {
      this.nodes = graph.objects.map((obj, id) => new NodeModel({
        id,
        name: obj.name,
        simulationModel: this.simulationModel
      }));
      this.links = graph.edges.map((edge, id) => new LinkModel({
        id,
        source: this.nodes[edge.tail],
        target: this.nodes[edge.head]
      }));
      this.simulationModel.init(this.nodes, this.links);
    }
  }
}

export {DiagramModel};
