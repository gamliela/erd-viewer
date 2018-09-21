import * as React from "react";
import * as ReactDOM from "react-dom";
import {configure} from "mobx";
import "./theme/bootstrap.config.scss";
import {MainPage} from "./pages/main_page/MainPage";

configure({enforceActions: "observed"});

ReactDOM.render(<MainPage/>, document.getElementById('app-root'));
