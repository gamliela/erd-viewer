import * as React from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import NodeModel from "./NodeModel";

const StyledNode = styled.circle`
`;

function Node({node}: { node: NodeModel }) {
  return (
    <StyledNode r="1" cx={node.x} cy={node.y}>
    </StyledNode>
  );
}

export default observer(Node);
