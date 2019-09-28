import {action, observable} from "mobx";
import {deserialize, object, serializable, serialize} from "serializr";
import {DotGraph} from "../erd/dot_json_types";
import {DiagramModel} from "../../components/diagram/DiagramModel";
import {GraphModel} from "../erd/GraphModel";

// continue:
// * simulation should be started automatically
// * errors in load should be handled
// * move all simulation state and other volatile state into components state (?)

class WorkbenchModel {
  @serializable(object(GraphModel)) @observable graph: GraphModel;
  @serializable(object(DiagramModel)) @observable diagram: DiagramModel;

  constructor(graph: DotGraph) {
    this.graph = new GraphModel(graph);
    this.diagram = new DiagramModel(this.graph);
  }

  @action.bound
  load() {
    Object.assign(this, deserialize(WorkbenchModel, JSON.parse(localStorage.getItem("WorkbenchModel"))));
  }

  @action.bound
  save() {
    localStorage.setItem("WorkbenchModel", JSON.stringify(serialize(this)));
  }
}

export {WorkbenchModel};
