import Entity from "./Entity";
import Relation from "./Relation";

class EntityRelationGraph {
  constructor(public entities: Entity[], public relations: Relation[]) {

  }
}

export default EntityRelationGraph;
