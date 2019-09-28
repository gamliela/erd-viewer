import {observable} from "mobx";
import {list, object, serializable} from "serializr";
import {NodeModel} from "./NodeModel";
import {LinkModel} from "./LinkModel";
import SimulationModel from "./Simulation";
import {GraphModel} from "../../models/erd/GraphModel";

class DiagramModel {
  @serializable zoomFactor: number = 50;
  @serializable(list(object(NodeModel))) @observable nodes: NodeModel[] = [];
  @serializable(list(object(LinkModel))) @observable links: LinkModel[] = [];

  private simulationModel = new SimulationModel();

  constructor(graph?: GraphModel) {
    if (graph) {
      const entityToNodeMap = {};
      this.nodes = graph.entities.map((entity, nodeId) => {
        entityToNodeMap[entity.id] = nodeId;
        return new NodeModel({
          id: nodeId,
          name: entity.name,
          simulationModel: this.simulationModel
        })
      });
      this.links = graph.relations.map((relation, relationId) => new LinkModel({
        id: relationId,
        source: this.nodes[entityToNodeMap[relation.source.id]],
        target: this.nodes[entityToNodeMap[relation.target.id]]
      }));
      this.simulationModel.init(this.nodes, this.links);
    }
  }
}

export {DiagramModel};
