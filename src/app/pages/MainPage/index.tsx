import * as React from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import erdData from "../../models/erd/ErdData";
import DiagramModel from "../../components/diagram/DiagramModel";
import Diagram from "../../components/diagram/Diagram";

const diagramModel = new DiagramModel(erdData);

const StyledDiagram = styled(Diagram)`
  width: 100%
`;

@observer
export default class MainPage extends React.Component {
  render() {
    return (
      <div className="container">
        <StyledDiagram model={diagramModel}/>
      </div>
    );
  }
}
