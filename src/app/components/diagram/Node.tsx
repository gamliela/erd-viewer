import * as React from "react";
import {observer} from "mobx-react";
import withDraggableSVG from "../../../shared_modules/DraggableSVG";
import style from "./style.scss";
import {NodeModel} from "./NodeModel";

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

export {Node};
