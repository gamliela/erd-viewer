import {Instance, types} from "mobx-state-tree";
import {Entity} from "./Entity";
import {DotEdge} from "./dot_json_types";

const Relation = types.model('Relation', {
  id: types.identifierNumber,
  source: types.reference(Entity),
  target: types.reference(Entity)
});

type IRelation = Instance<typeof Relation>;

const RelationMap = types.map(Relation);

type IRelationMap = typeof RelationMap.Type;

function createRelationEntry(id: number, dotEdge: DotEdge): IRelationMap {
  return RelationMap.create({id: {id, source: dotEdge.tail, target: dotEdge.head}});
}

export {Relation, IRelation, RelationMap, createRelationEntry};
