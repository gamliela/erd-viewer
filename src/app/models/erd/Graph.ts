import {Entity, entitySnapshotFromDotObject} from "./Entity";
import {Relation, relationSnapshotFromDotEdge} from "./Relation";
import {DotGraph} from "./dot_json_types";
import {Instance, SnapshotIn, types} from "mobx-state-tree";

const Graph = types.model('Graph', {
  entities: types.optional(types.array(Entity), []),
  relations: types.optional(types.array(Relation), [])
});

type IGraph = Instance<typeof Graph>;

type IGraphSnapshot = SnapshotIn<IGraph>;

function graphSnapshotFromDotGraph(dotGraph: DotGraph): IGraphSnapshot {
  return {
    entities: dotGraph.objects.map((dotObject, index) => entitySnapshotFromDotObject(index, dotObject)),
    relations: dotGraph.edges.map((dotEdge, index) => relationSnapshotFromDotEdge(index, dotEdge))
  }
}

export {Graph, IGraph, graphSnapshotFromDotGraph};
