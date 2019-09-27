import {identifier, reference, serializable} from "serializr";
import {EntityModel} from "./EntityModel";

class RelationModel {
  @serializable(identifier()) id: number;
  @serializable(reference(EntityModel)) source: EntityModel;
  @serializable(reference(EntityModel)) target: EntityModel;

  constructor(props: {
    id?: number,
    source?: EntityModel,
    target?: EntityModel
  } = {}) {
    Object.assign(this, props);
  }
}

export {RelationModel};
