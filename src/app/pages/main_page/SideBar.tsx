import * as React from "react";
import {observer} from "mobx-react";
import cx from "classnames";
import style from "./style.scss";
import {EntityList} from "./EntityList";
import {Workbench} from "../../models/workbench/Workbench";

@observer
class SideBar extends React.Component<{ className?: string, workbench: Workbench }> {
  render() {
    const {className, workbench} = this.props;
    return (
      <div className={cx("bg-light", style.SideBar, className)}>
        <EntityList workbench={workbench}/>
      </div>
    );
  }
}

export {SideBar};
