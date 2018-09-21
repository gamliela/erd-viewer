import * as React from "react";
import {observer} from "mobx-react";
import erdData from "../../models/erd/ErdData";
import {Diagram, DiagramModel} from "../../components/diagram/Diagram";
import cx from "classnames";
import style from "./style.scss";
import {SideBar} from "./SideBar";

const diagramModel = new DiagramModel(erdData);

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
          <Diagram className={"flex-grow-1"} model={diagramModel}/>
        </div>
      </div>
    );
  }
}

export {MainPage};
