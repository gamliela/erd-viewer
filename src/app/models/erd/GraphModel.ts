import {list, object, reference, serializable} from "serializr";
import {DotGraph} from "./dot_json_types";
import {EntityModel} from "./EntityModel";
import {RelationModel} from "./RelationModel";

class GraphModel {
  @serializable(list(object(EntityModel))) entities: EntityModel[] = [];
  @serializable(list(object(RelationModel))) relations: RelationModel[] = [];

  constructor(graph?: DotGraph) {
    if (graph) {
      this.entities = graph.objects.map((obj, id) => new EntityModel({
        id,
        name: obj.name
      }));
      this.relations = graph.edges.map((edge, id) => new RelationModel({
        id,
        source: this.entities[edge.tail],
        target: this.entities[edge.head]
      }));
    }
  }
}

export {GraphModel};
