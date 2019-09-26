import {DotGraph} from "../erd/dot_json_types";
import {DiagramModel} from "../../components/diagram/DiagramModel";
import {GraphModel} from "../erd/GraphModel";

class WorkbenchModel {
  graph: GraphModel;
  diagram: DiagramModel;

  constructor(graph: DotGraph) {
    this.graph = new GraphModel(graph);
    this.diagram = new DiagramModel(graph);
  }
}

export {WorkbenchModel};
