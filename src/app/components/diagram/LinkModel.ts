import {observable} from "mobx";
import {SimulationLinkDatum} from "d3-force";
import NodeModel from "./NodeModel";

class LinkModel implements SimulationLinkDatum<NodeModel> {
  @observable source: NodeModel;
  @observable target: NodeModel;

  constructor(source: NodeModel, target: NodeModel) {
    this.source = source;
    this.target = target;
  }

  get key() {
    return `${this.source.key}-${this.target.key}`;
  }
}

export default LinkModel;
