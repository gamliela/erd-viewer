import * as React from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import {DotGraph} from "../../models/erd/dot_json_types";
import {computed, observable} from "mobx";
import Simulation from "./Simulation";
import {Node, NodeModel} from "./Node";
import {Link, LinkModel} from "./Link";

const ROUND_PRECISION = 0.1;
const BASE_VIEWPORT_WIDTH = 100;
const BASE_VIEWPORT_HEIGHT = 50;

class DiagramModel {
  zoomFactor: number = 1;
  @observable nodes: NodeModel[];
  @observable links: LinkModel[];
  public readonly simulationModel = new Simulation();

  constructor(graph: DotGraph) {
    this.nodes = graph.objects.map((obj, index) => new NodeModel(index, obj.name, this.simulationModel, ROUND_PRECISION));
    this.links = graph.edges.map((edge, index) => new LinkModel(index, this.nodes[edge.tail], this.nodes[edge.head]));
    this.simulationModel.init(this.nodes, this.links);
  }

  @computed get viewportWidth() {
    return this.zoomFactor * BASE_VIEWPORT_WIDTH;
  }

  @computed get viewportHeight() {
    return this.zoomFactor * BASE_VIEWPORT_HEIGHT;
  }
}

const Svg = styled.svg`
  user-select: none;
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
    return this.props.model.links.map(link => <Link key={link.key} link={link}/>)
  }
}

export {DiagramModel, Diagram};
