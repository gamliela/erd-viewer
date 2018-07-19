import * as React from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import NodeModel from "./NodeModel";
import withDraggableModel from "../../../shared_modules/Draggable";

const StyledNode = styled.circle`
  cursor: move
`;

const DraggableStyledNode = withDraggableModel(StyledNode);

function Node({node}: { node: NodeModel }) {
  return (
    <DraggableStyledNode r="1" cx={node.x} cy={node.y} model={node}>
    </DraggableStyledNode>
  );
}

export default observer(Node);
