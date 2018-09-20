import * as React from "react";
import {observer} from "mobx-react";
import {DotGraph} from "../../models/erd/dot_json_types";
import {computed, observable} from "mobx";
import Simulation from "./Simulation";
import {Node, NodeModel} from "./Node";
import {Link, LinkModel} from "./Link";
import style from "./style.scss";
import cx from "classnames";

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

@observer
class Diagram extends React.Component<{ className: string, model: DiagramModel }> {
  render() {
    const {className} = this.props;
    const viewBoxProp = `-${BASE_VIEWPORT_WIDTH / 2} -${BASE_VIEWPORT_HEIGHT / 2} ${BASE_VIEWPORT_WIDTH} ${BASE_VIEWPORT_HEIGHT}`;

    return (
      <svg className={cx(className, style.Diagram)} viewBox={viewBoxProp}>
        {this.renderNodes()}
        {this.renderLinks()}
      </svg>
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
