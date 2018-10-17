import * as React from "react";
import {observer} from "mobx-react";
import cx from "classnames";
import style from "./style.scss";
import erdData from "../../models/erd/ErdData";
import {Workbench} from "../../models/workbench/Workbench";
import {Diagram} from "../../components/diagram/Diagram";
import {SideBar} from "./SideBar";

const workbench = new Workbench(erdData);

@observer
class MainPage extends React.Component {
  render() {
    return (
      <div className={cx("d-flex flex-column", style.MainPage)}>
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand">Code Explorer</span>
        </nav>
        <div className="flex-grow-1 d-flex">
          <SideBar/>
          <Diagram className={"flex-grow-1"} model={workbench.diagram}/>
        </div>
      </div>
    );
  }
}

export {MainPage};