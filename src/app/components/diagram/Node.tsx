import * as React from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import NodeModel from "./NodeModel";
import withDraggableSVG from "../../../shared_modules/DraggableSVG";

const CircleSVG = styled.circle`
`;

const TextSVG = styled.text`
  text-anchor: middle;
  alignment-baseline: ideographic;
  font-size: 2px;
`;

const GSVG = styled.g`
  cursor: move;
`;

const DraggableGroup = withDraggableSVG(GSVG);

@observer
class Node extends React.Component<{ node: NodeModel }> {
  render() {
    const {node} = this.props;
    return (
      <DraggableGroup onSVGDragStarted={node.onSVGDragStarted}
                      onSVGDrag={node.onSVGDrag}
                      onSVGDragEnded={node.onSVGDragEnded}>
        <CircleSVG r="1" cx={node.x} cy={node.y}/>
        <TextSVG x={node.x} y={node.y - 1}>Text</TextSVG>
      </DraggableGroup>
    );
  }
}

export default observer(Node);
