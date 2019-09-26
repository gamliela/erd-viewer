import {DotGraph} from "./dot_json_types";
import {EntityModel} from "./EntityModel";
import {RelationModel} from "./RelationModel";

class GraphModel {
  entities: EntityModel[];
  relations: RelationModel[];

  constructor(graph: DotGraph) {
    this.entities = graph.objects.map((obj, index) => new EntityModel(index, obj.name));
    this.relations = graph.edges.map((edge, index) => new RelationModel(index, this.entities[edge.tail], this.entities[edge.head]));
  }
}

export {GraphModel};
