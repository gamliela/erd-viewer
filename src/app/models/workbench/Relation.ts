import {computed, observable} from "mobx";
import {Entity} from "./Entity";

class Relation {
  @observable link = null;

  constructor(public key: number, public source: Entity, public target: Entity) {
  }

  @computed get isDisplayed() {
    return this.link != null;
  }
}

export {Relation};
