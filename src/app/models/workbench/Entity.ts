import {computed, observable} from "mobx";

class Entity {
  @observable node = null;

  constructor(public key: number, public name: string) {
  }

  @computed get isDisplayed() {
    return this.node != null;
  }
}

export {Entity};
