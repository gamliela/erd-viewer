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

  private simulationModel = null;

  constructor(graph?: GraphModel) {
    if (graph) {
      const entityToNodeMap = {};
      this.nodes = graph.entities.map((entity, nodeId) => {
        entityToNodeMap[entity.id] = nodeId;
        return new NodeModel({
          id: nodeId,
          name: entity.name,
        })
      });
      this.links = graph.relations.map((relation, relationId) => new LinkModel({
        id: relationId,
        source: this.nodes[entityToNodeMap[relation.source.id]],
        target: this.nodes[entityToNodeMap[relation.target.id]]
      }));
      this.postDeserialize(false);
    }
  }

  // `simulationModel` is not persisted, so we need to update both the diagram and the nodes with a new `simulationModel`
  postDeserialize(startFrozen: boolean) {
    this.simulationModel = new SimulationModel();
    this.nodes.forEach(node => node.postDeserialize(this.simulationModel));
    this.simulationModel.init(this.nodes, this.links, startFrozen);
  }
}

export {DiagramModel};
