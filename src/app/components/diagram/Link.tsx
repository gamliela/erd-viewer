import * as React from "react";
import {observer} from "mobx-react";
import {SimulationLinkDatum} from "d3-force";
import {observable} from "mobx";
import {NodeModel} from "./Node";
import style from "./style.scss";

class LinkModel implements SimulationLinkDatum<NodeModel> {
  @observable source: NodeModel;
  @observable target: NodeModel;

  constructor(public key: number, source: NodeModel, target: NodeModel) {
    this.source = source;
    this.target = target;
  }
}

@observer
class Link extends React.Component<{ link: LinkModel }> {
  render() {
    const {link} = this.props;
    return (
      <line className={style.Link} x1={link.source.dx} y1={link.source.dy} x2={link.target.dx} y2={link.target.dy}>
      </line>
    );
  }
}

export {LinkModel, Link};
