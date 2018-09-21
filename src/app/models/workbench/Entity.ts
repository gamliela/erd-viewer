import {computed, observable} from "mobx";

class Entity {
  @observable node = null;

  constructor(key: number, name: string) {
  }

  @computed get isDisplayed() {
    return this.node != null;
  }
}

export {Entity};
