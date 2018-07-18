import * as React from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import LinkModel from "./LinkModel";

const StyledLink = styled.line`
  stroke: black;
  stroke-width: 0.1;
`;

function Link({link}: { link: LinkModel }) {
  return (
    <StyledLink x1={link.source.x} y1={link.source.y} x2={link.target.x} y2={link.target.y}>
    </StyledLink>
  );
}

export default observer(Link);
