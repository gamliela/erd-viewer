import {computed, observable} from "mobx";
import {Entity} from "./Entity";

class Relation {
  @observable link = null;

  constructor(key: number, source: Entity, target: Entity) {
  }

  @computed get isDisplayed() {
    return this.link != null;
  }
}

export {Relation};
