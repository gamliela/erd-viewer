import {createEntityEntry, EntityMap} from "./Entity";
import {createRelationEntry, RelationMap} from "./Relation";
import {DotGraph} from "./dot_json_types";
import {castToSnapshot, types} from "mobx-state-tree";
import {mergeAll} from "ramda";

const Graph = types.model('Graph', {
  entities: types.optional(EntityMap, {}),
  relations: types.optional(RelationMap, {})
});

type IGraph = typeof Graph.Type;

function graphFromDotGraph(dotGraph: DotGraph): IGraph {
  const entities = mergeAll(dotGraph.objects.map((dotObject, index) => createEntityEntry(index, dotObject)));
  const relations = mergeAll(dotGraph.edges.map((dotEdge, index) => createRelationEntry(index, dotEdge)));

  return Graph.create({
    entities: castToSnapshot(entities),
    relations: castToSnapshot(relations)
  });
}

export {IGraph, graphFromDotGraph, Graph};
