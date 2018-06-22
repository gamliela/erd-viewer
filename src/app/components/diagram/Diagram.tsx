import * as React from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import DiagramModel, {BASE_VIEWPORT_HEIGHT, BASE_VIEWPORT_WIDTH} from "./DiagramModel";
import Node from "./Node";

const Svg = styled.svg`
  width: 100%;
`;

@observer
class Diagram extends React.Component<{ model: DiagramModel }> {
  render() {
    const viewBoxProp = `-${BASE_VIEWPORT_WIDTH / 2} -${BASE_VIEWPORT_HEIGHT / 2} ${BASE_VIEWPORT_WIDTH} ${BASE_VIEWPORT_HEIGHT}`;

    return (
      <Svg viewBox={viewBoxProp}>
        {this.renderNodes()}
        {this.renderLinks()}
      </Svg>
    );
  }

  renderNodes() {
    return this.props.model.nodes.map(node => <Node key={node.key} node={node}/>)
  }

  renderLinks() {

  }
}

export default Diagram;
