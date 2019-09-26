import {EntityModel} from "./EntityModel";

class RelationModel {
  constructor(public id: number, public source: EntityModel, public target: EntityModel) {
  }
}

export {RelationModel};
