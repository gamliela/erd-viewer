import {Instance, SnapshotIn, types} from "mobx-state-tree";
import {DotObject} from "./dot_json_types";

const Entity = types.model('Entity', {
  id: types.identifierNumber,
  name: types.string
});

type IEntity = Instance<typeof Entity>;

type IEntitySnapshot = SnapshotIn<IEntity>;

const EntityMap = types.map(Entity);

type IEntityMap = typeof EntityMap.Type;

function createEntityEntry(id: number, dotObject: DotObject): IEntityMap {
  return EntityMap.create({id: {id, name: dotObject.name}});
}

function entitySnapshotFromDotObject(id: number, dotObject: DotObject): IEntitySnapshot {
  return {
    id,
    name: dotObject.name
  };
}

export {Entity, IEntity, EntityMap, createEntityEntry, entitySnapshotFromDotObject};
