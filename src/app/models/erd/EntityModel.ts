import {identifier, serializable} from "serializr";

class EntityModel {
  @serializable(identifier()) id: number;
  @serializable name: string;

  constructor(props: {
    id?: number,
    name?: string,
  } = {}) {
    Object.assign(this, props);
  }
}

export {EntityModel};
