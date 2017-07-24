import * as React from "react";
import * as ReactDOM from "react-dom";
import {configure} from "mobx";
import 'bulma/css/bulma.css';

import {AppManager} from "./AppManager";
import MainPage from "./pages/MainPage/index";

// mobx configuration
configure({enforceActions: true});

// create our app manager
const appManager: AppManager = new AppManager();

ReactDOM.render(
  <MainPage appManager={appManager}/>,
  document.getElementById('app-root'));
