import {Instance, SnapshotIn, types} from "mobx-state-tree";
import {Entity, IEntity} from "./Entity";
import {DotEdge} from "./dot_json_types";

const Relation = types.model('Relation', {
  id: types.identifierNumber,
  source: types.reference(Entity),
  target: types.reference(Entity)
});

type IRelation = Instance<typeof Relation>;

type IRelationSnapshot = SnapshotIn<IRelation>;

const RelationMap = types.map(Relation);

type IRelationMap = typeof RelationMap.Type;

function createRelationEntry(id: number, dotEdge: DotEdge): IRelationMap {
  return RelationMap.create({id: {id, source: dotEdge.tail, target: dotEdge.head}});
}

function relationSnapshotFromDotEdge(id: number, dotEdge: DotEdge) : IRelationSnapshot {
  return {
    id,
    source: dotEdge.tail,
    target: dotEdge.head
  }
}

export {Relation, IRelation, RelationMap, createRelationEntry, relationSnapshotFromDotEdge};
