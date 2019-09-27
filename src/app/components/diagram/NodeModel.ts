import {SimulationNodeDatum} from "d3-force";
import {action, computed, observable} from "mobx";
import {identifier, serializable} from "serializr";
import SimulationModel from "./Simulation";

const GRID_PRECISION = 0.1;

function round(p, n) {
  return p % n < n / 2 ? p - (p % n) : p + n - (p % n);
}

class NodeModel implements SimulationNodeDatum {
  @serializable(identifier()) id: number;
  @serializable name: string;
  @serializable @observable x = 0;
  @serializable @observable y = 0;
  @observable fx = null;
  @observable fy = null;

  private simulationModel: SimulationModel;

  constructor(props: {
    id?: number,
    name?: string,
    simulationModel?: SimulationModel
  } = {}) {
    Object.assign(this, props);
  }

  @computed get dx() {
    return round(this.x, GRID_PRECISION);
  }

  @computed get dy() {
    return round(this.y, GRID_PRECISION);
  }

  @action.bound
  onSVGDragStarted(x, y) {
    if (this.simulationModel) {
      this.simulationModel.notifyDragStarted();
      this.fx = x;
      this.fy = y;
    }
  }

  @action.bound
  onSVGDrag(x, y) {
    if (this.simulationModel) {
      this.fx = x;
      this.fy = y;
    } else {
      this.x = x;
      this.y = y;
    }
  }

  @action.bound
  onSVGDragEnded() {
    if (this.simulationModel) {
      this.simulationModel.notifyDragEnded();
      this.fx = null;
      this.fy = null;
    }
  }
}

export {NodeModel};
