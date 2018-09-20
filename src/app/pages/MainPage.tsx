import * as React from "react";
import {observer} from "mobx-react";
import erdData from "../models/erd/ErdData";
import {Diagram, DiagramModel} from "../components/diagram/Diagram";
import style from "./style.scss";
import cx from "classnames";

const diagramModel = new DiagramModel(erdData);

@observer
class MainPage extends React.Component {
  render() {
    return (
      <div className={cx(style.MainPage, 'container')}>
        <Diagram className={style.Diagram} model={diagramModel}/>
      </div>
    );
  }
}

export {MainPage};
