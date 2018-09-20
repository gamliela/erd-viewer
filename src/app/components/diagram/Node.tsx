import * as React from "react";
import {observer} from "mobx-react";
import withDraggableSVG from "../../shared_modules/DraggableSVG";
import {action, computed, observable} from "mobx";
import {SimulationNodeDatum} from "d3-force";
import Simulation from "./Simulation";
import style from "./style.scss";

function round(p, n) {
  return p % n < n / 2 ? p - (p % n) : p + n - (p % n);
}

class NodeModel implements SimulationNodeDatum {
  @observable x = 0;
  @observable y = 0;
  @observable fx = null;
  @observable fy = null;

  constructor(public key: number,
              public name: string,
              private simulationModel: Simulation,
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

const DraggableGroup = withDraggableSVG("g");

@observer
class Node extends React.Component<{ node: NodeModel }> {
  render() {
    const {node} = this.props;
    return (
      <DraggableGroup className={style.Node}
                      onSVGDragStarted={node.onSVGDragStarted}
                      onSVGDrag={node.onSVGDrag}
                      onSVGDragEnded={node.onSVGDragEnded}>
        <circle r="1" cx={node.dx} cy={node.dy}/>
        <text x={node.dx} y={node.dy - 1}>{node.name}</text>
      </DraggableGroup>
    );
  }
}

export {NodeModel, Node};
