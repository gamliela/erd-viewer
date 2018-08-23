import {computed, observable} from "mobx";
import NodeModel from "./NodeModel";
import LinkModel from "./LinkModel";
import EntityRelationGraph from "../../models/erd/EntityRelationGraph";
import SimulationModel from "./SimulationModel";

const BASE_VIEWPORT_WIDTH = 100;
const BASE_VIEWPORT_HEIGHT = 50;

class DiagramModel {
  zoomFactor: number = 1;
  @observable nodes: NodeModel[];
  @observable links: LinkModel[];
  public readonly simulationModel = new SimulationModel();

  constructor(graph: EntityRelationGraph) {
    // create a temporary map from given entity ids to new node models
    const entityToNodeMap = graph.entities.reduce((map: any, entity) => {
      map[entity.id] = new NodeModel(entity, this.simulationModel);
      return map;
    }, {});

    this.nodes = Object.values(entityToNodeMap);
    this.links = graph.relations.map(relation => {
      return new LinkModel(entityToNodeMap[relation.source.id], entityToNodeMap[relation.target.id]);
    });
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