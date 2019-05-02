import {castToSnapshot, SnapshotIn, types} from "mobx-state-tree";
import {DotGraph} from "../erd/dot_json_types";
import {emptyGraphSnapshot, Graph, graphSnapshotFromDotGraph, IGraph} from "../erd/Graph";
import {
  Diagram,
  emptyDiagramSnapshot,
  diagramSnapshotFromGraph,
  IDiagram
} from "../../components/diagram/Diagram";

const Workbench = types.model('Workbench', {
  graph: Graph,
  diagram: Diagram,
});

type IWorkbench = typeof Workbench.Type;

function emptyWorkbenchSnapshot(): SnapshotIn<typeof Workbench> {
  return {
    graph: emptyGraphSnapshot(),
    diagram: emptyDiagramSnapshot()
  };
}

function workbenchSnapshotFromDotGraph(dotGraph: DotGraph): SnapshotIn<typeof Workbench> {
  const graph = graphSnapshotFromDotGraph(dotGraph);
  return {
    graph,
    diagram: diagramSnapshotFromGraph(graph)
  };
}

export {Workbench, IWorkbench, emptyWorkbenchSnapshot, workbenchSnapshotFromDotGraph};
