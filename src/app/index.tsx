import * as React from "react";
import * as ReactDOM from "react-dom";
import {configure} from "mobx";
import "bootstrap-css-only/css/bootstrap.css";
import {MainPage} from "./pages/MainPage";

configure({enforceActions: "observed"});

ReactDOM.render(<MainPage/>, document.getElementById('app-root'));
