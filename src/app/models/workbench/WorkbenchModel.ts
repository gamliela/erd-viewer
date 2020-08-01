import {action, observable} from "mobx";
import {deserialize, object, serializable, serialize} from "serializr";
import {DiagramModel} from "../../components/diagram/DiagramModel";
import {GraphModel} from "../erd/GraphModel";
import randomGraph from "../erd/randomGraph";

class WorkbenchModel {
  @serializable(object(GraphModel)) @observable graph: GraphModel;
  @serializable(object(DiagramModel)) @observable diagram: DiagramModel;

  constructor() {
    this.graph = new GraphModel(randomGraph(10));
    this.diagram = new DiagramModel(this.graph);
  }

  @action.bound
  load() {
    const storedItem = localStorage.getItem("WorkbenchModel");
    if (storedItem) {
      Object.assign(this, deserialize(WorkbenchModel, JSON.parse(storedItem)));
      this.diagram.postDeserialize(true);
    }
  }

  @action.bound
  save() {
    localStorage.setItem("WorkbenchModel", JSON.stringify(serialize(this)));
  }
}

export {WorkbenchModel};
