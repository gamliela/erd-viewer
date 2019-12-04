import * as React from "react";
import {observer} from "mobx-react";
import {Node} from "./Node";
import {Link} from "./Link";
import style from "./style.scss";
import cx from "classnames";
import {DiagramModel} from "./DiagramModel";

@observer
class Diagram extends React.Component<{ model: DiagramModel; className?: string }> {
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
    return this.props.model.nodes.map(node => <Node key={node.id} node={node}/>)
  }

  renderLinks() {
    return this.props.model.links.map(link => <Link key={link.id} link={link}/>)
  }
}

export {Diagram};
