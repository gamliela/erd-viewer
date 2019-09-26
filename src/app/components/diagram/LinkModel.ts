import {SimulationLinkDatum} from "d3-force";
import {NodeModel} from "./NodeModel";
import {observable} from "mobx";

class LinkModel implements SimulationLinkDatum<NodeModel> {
  @observable source: NodeModel;
  @observable target: NodeModel;

  constructor(public key: number, source: NodeModel, target: NodeModel) {
    this.source = source;
    this.target = target;
  }
}

export {LinkModel};
