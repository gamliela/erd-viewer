import * as React from "react";
import {observer} from "mobx-react";
import {DotGraph} from "../../models/erd/dot_json_types";
import {observable} from "mobx";
import Simulation from "./Simulation";
import {Node, NodeModel} from "./Node";
import {Link, LinkModel} from "./Link";
import style from "./style.scss";
import cx from "classnames";

const GRID_PRECISION = 0.1;

class DiagramModel {
  zoomFactor: number = 50;
  @observable nodes: NodeModel[];
  @observable links: LinkModel[];
  public readonly simulationModel = new Simulation();

  constructor(graph: DotGraph) {
    this.nodes = graph.objects.map((obj, index) => new NodeModel(index, obj.name, this.simulationModel, GRID_PRECISION));
    this.links = graph.edges.map((edge, index) => new LinkModel(index, this.nodes[edge.tail], this.nodes[edge.head]));
    this.simulationModel.init(this.nodes, this.links);
  }
}

@observer
class Diagram extends React.Component<{ model: DiagramModel, className?: string }> {
  render() {
    const {className, model} = this.props;
    const {zoomFactor} = model;
    const viewBoxProp = `-${zoomFactor / 2} -${zoomFactor / 2} ${zoomFactor} ${zoomFactor}`;

    return (
      <svg className={cx(style.Diagram, className)} viewBox={viewBoxProp}>
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
