import {createEntityEntry, EntityMap} from "./Entity";
import {createRelationEntry, RelationMap} from "./Relation";
import {DotGraph} from "./dot_json_types";
import {types} from "mobx-state-tree";
import {mergeAll} from "ramda";

const Graph = types.model('Graph', {
  entities: EntityMap,
  relations: RelationMap
});

type IGraph = typeof Graph.Type;

function createEmptyGraph(): IGraph {
  return Graph.create({entities: {}, relations: {}})
}

function createGraph(dotGraph: DotGraph): IGraph {
  const graph = createEmptyGraph();
  graph.entities = mergeAll(dotGraph.objects.map((dotObject, index) => createEntityEntry(index, dotObject)));
  graph.relations = mergeAll(dotGraph.edges.map((dotEdge, index) => createRelationEntry(index, dotEdge)));
  return graph;
}

export {IGraph, createGraph, Graph};
