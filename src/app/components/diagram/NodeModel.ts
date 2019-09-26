import {SimulationNodeDatum} from "d3-force";
import {action, computed, observable} from "mobx";
import SimulationModel from "./Simulation";

function round(p, n) {
  return p % n < n / 2 ? p - (p % n) : p + n - (p % n);
}

class NodeModel implements SimulationNodeDatum {
  @observable x = 0;
  @observable y = 0;
  @observable fx = null;
  @observable fy = null;

  constructor(public id: number,
              public name: string,
              private simulationModel: SimulationModel,
              private roundPrecision: number) {
  }

  @computed get dx() {
    return round(this.x, this.roundPrecision);
  }

  @computed get dy() {
    return round(this.y, this.roundPrecision);
  }

  @action.bound
  onSVGDragStarted(x, y) {
    this.simulationModel.notifyDragStarted();
    this.fx = x;
    this.fy = y;
  }

  @action.bound
  onSVGDrag(x, y) {
    this.fx = x;
    this.fy = y;
  }

  @action.bound
  onSVGDragEnded() {
    this.simulationModel.notifyDragEnded();
    this.fx = null;
    this.fy = null;
  }
}

export {NodeModel};
