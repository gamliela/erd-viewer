import {castToReferenceSnapshot, types} from "mobx-state-tree";
import {DotGraph} from "../erd/dot_json_types";
import {createGraph, Graph} from "../erd/Graph";
import {createDiagram, Diagram} from "../../components/diagram/Diagram";

const Workbench = types.model('Workbench', {
  graph: types.reference(Graph),
  diagram: types.reference(Diagram),
});

type IWorkbench = typeof Workbench.Type;

function createWorkbench(dotGraph: DotGraph): IWorkbench {
  const graph = createGraph(dotGraph);
  const diagram = createDiagram(graph);
  return Workbench.create({
    graph: castToReferenceSnapshot(graph),
    diagram: castToReferenceSnapshot(diagram)
  });
}

export {Workbench, IWorkbench, createWorkbench};
