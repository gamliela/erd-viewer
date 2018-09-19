import * as React from "react";
import * as ReactDOM from "react-dom";
import 'bulma/css/bulma.css';
import MainPage from "./pages/MainPage/index";
import {configure} from "mobx";

configure({enforceActions: "observed"});

ReactDOM.render(<MainPage/>, document.getElementById('app-root'));
