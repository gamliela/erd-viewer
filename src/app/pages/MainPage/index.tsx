import * as React from "react";
import {observer} from "mobx-react";
import {AppManager} from "../../AppManager";
import styled from "styled-components";

const Header = styled.h1`
  color: blue;
`;

export interface MainPageProps {
  appManager: AppManager;
}

@observer
export default class MainPage extends React.Component<MainPageProps> {
  render() {
    const appManager = this.props.appManager;
    return (
      <div>
        <Header>
          Hello World!
        </Header>
        <span>version: {appManager.version}</span>
      </div>
    );
  }
}
