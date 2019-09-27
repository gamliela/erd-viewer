import {SimulationLinkDatum} from "d3-force";
import {observable} from "mobx";
import {identifier, reference, serializable} from "serializr";
import {NodeModel} from "./NodeModel";

class LinkModel implements SimulationLinkDatum<NodeModel> {
  @serializable(identifier()) id: number;
  @serializable(reference(NodeModel)) @observable source: NodeModel;
  @serializable(reference(NodeModel)) @observable target: NodeModel;

  constructor(props: {
    id?: number,
    source?: NodeModel,
    target?: NodeModel
  } = {}) {
    Object.assign(this, props);
  }
}

export {LinkModel};
