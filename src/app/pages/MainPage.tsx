import * as React from "react";
import {observer} from "mobx-react";
import erdData from "../models/erd/ErdData";
import {Diagram, DiagramModel} from "../components/diagram/Diagram";
import style from "./style.scss";

const diagramModel = new DiagramModel(erdData);

@observer
class MainPage extends React.Component {
  render() {
    return (
      <div className={style.MainPage}>
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand">Code Explorer</span>
        </nav>
        <Diagram className={style.Diagram} model={diagramModel}/>
      </div>
    );
  }
}

export {MainPage};
