import {castToSnapshot, types} from "mobx-state-tree";
import {DotGraph} from "../erd/dot_json_types";
import {Graph, graphSnapshotFromDotGraph, IGraph} from "../erd/Graph";
import {createDiagram, createEmptyDiagram, Diagram, IDiagram} from "../../components/diagram/Diagram";

const Workbench = types.model('Workbench', {
  graph: Graph,
  diagram: Diagram,
});

type IWorkbench = typeof Workbench.Type;

function createWorkbench(graph: IGraph, diagram: IDiagram): IWorkbench {
  return Workbench.create({
    graph: castToSnapshot(graph),
    diagram: castToSnapshot(diagram)
  });
}

function emptyWorkbench(): IWorkbench {
  const graph = Graph.create({entities: [], relations: []});
  const diagram = createEmptyDiagram();
  return createWorkbench(graph, diagram);
}

function workbenchFromDotGraph(dotGraph: DotGraph): IWorkbench {
  const graph = Graph.create(graphSnapshotFromDotGraph(dotGraph));
  const diagram = createDiagram(graph);
  return createWorkbench(graph, diagram);
}

export {Workbench, IWorkbench, emptyWorkbench, workbenchFromDotGraph};
