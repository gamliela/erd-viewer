import * as React from "react";
import {observer} from "mobx-react";
import cx from "classnames";
import style from "./style.scss";
import {WorkbenchModel} from "../../models/workbench/WorkbenchModel";
import {Diagram} from "../../components/diagram/Diagram";
import {SideBar} from "./SideBar";

const workbench = new WorkbenchModel();

@observer
class MainPage extends React.Component {
  render() {
    return (
      <div className={cx("d-flex flex-column", style.MainPage)}>
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand">Code Explorer</span>
          <form className="form-inline">
            <button type="button" className="btn btn-secondary" onClick={workbench.load}>Load</button>
            <button type="button" className="btn btn-secondary ml-2" onClick={workbench.save}>Save</button>
          </form>
        </nav>
        <div className="flex-grow-1 d-flex">
          <SideBar workbench={workbench}/>
          <Diagram className={"flex-grow-1"} model={workbench.diagram}/>
        </div>
      </div>
    );
  }
}

export {MainPage};
