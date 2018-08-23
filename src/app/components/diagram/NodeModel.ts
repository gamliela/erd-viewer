import Entity from "../../models/erd/Entity";
import {action, observable} from "mobx";
import {SimulationNodeDatum} from "d3-force";
import SimulationModel from "./SimulationModel";

class NodeModel implements SimulationNodeDatum {
  @observable x = 0;
  @observable y = 0;
  @observable fx = null;
  @observable fy = null;

  constructor(public entity: Entity, private simulationModel: SimulationModel) {
  }

  get key() {
    return this.entity.id;
  }

  @action.bound
  onSVGDragStarted(x, y) {
    console.log(`Drag started: ${x}, ${y}`);
    this.simulationModel.notifyDragStarted();
    this.fx = x;
    this.fy = y;
  }

  @action.bound
  onSVGDrag(x, y) {
    console.log(`Dragging: ${x}, ${y}`);
    this.fx = x;
    this.fy = y;
  }

  @action.bound
  onSVGDragEnded() {
    console.log(`Drag ended!`);
    this.simulationModel.notifyDragEnded();
    this.fx = null;
    this.fy = null;
  }
}

export default NodeModel;
