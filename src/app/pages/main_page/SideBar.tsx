import * as React from "react";
import {observer} from "mobx-react";
import cx from "classnames";
import style from "./style.scss";

@observer
class SideBar extends React.Component<{ className?: string }> {
  render() {
    const {className} = this.props;
    return (
      <div className={cx("bg-light", style.SideBar, className)}>
      </div>
    );
  }
}

export {SideBar};
