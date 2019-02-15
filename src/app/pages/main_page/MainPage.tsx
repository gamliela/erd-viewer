import * as React from "react";
import {observer} from "mobx-react";
import cx from "classnames";
import style from "./style.scss";
import erdData from "../../models/erd/ErdData";
import {createWorkbench, Workbench} from "../../models/workbench/Workbench";
import {DiagramView} from "../../components/diagram/Diagram";
import {SideBar} from "./SideBar";

const workbench = createWorkbench(erdData);

@observer
class MainPage extends React.Component {
  render() {
    return (
      <div className={cx("d-flex flex-column", style.MainPage)}>
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand">Code Explorer</span>
        </nav>
        <div className="flex-grow-1 d-flex">
          <SideBar workbench={workbench}/>
          <DiagramView className={"flex-grow-1"} diagram={workbench.diagram}/>
        </div>
      </div>
    );
  }
}

export {MainPage};
