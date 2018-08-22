import Entity from "../../models/erd/Entity";
import {observable} from "mobx";
import {SimulationNodeDatum} from "d3-force";

class NodeModel implements SimulationNodeDatum {
  @observable x = 0;
  @observable y = 0;

  constructor(public entity: Entity) {
  }

  get key() {
    return this.entity.id;
  }

  onSVGDragStarted(x, y) {
    console.log(`Drag started: ${x}, ${y}`);
  }

  onSVGDrag(x, y) {
    console.log(`Dragging: ${x}, ${y}`);
  }

  onSVGDragEnded() {
    console.log(`Drag ended!`);
  }
}

export default NodeModel;
