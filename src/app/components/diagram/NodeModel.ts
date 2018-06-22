import Entity from "../../models/erd/Entity";
import {observable} from "mobx";

class NodeModel {
  @observable x = 0;
  @observable y = 0;

  constructor(public entity: Entity) {
  }

  get key() {
    return this.entity.id;
  }
}

export default NodeModel;
