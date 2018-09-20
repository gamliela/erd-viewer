import * as React from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import erdData from "../models/erd/ErdData";
import {Diagram, DiagramModel} from "../components/diagram/Diagram";

const diagramModel = new DiagramModel(erdData);

const StyledDiagram = styled(Diagram)`
  width: 100%
`;

@observer
class MainPage extends React.Component {
  render() {
    return (
      <div className="container">
        <StyledDiagram model={diagramModel}/>
      </div>
    );
  }
}

export {MainPage};
