import * as React from "react";
import {observer} from "mobx-react";
import style from "./style.scss";
import {LinkModel} from "./LinkModel";

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

export {Link};
