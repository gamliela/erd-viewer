import * as React from "react";
import * as ReactDOM from "react-dom";
import {configure} from "mobx";
import {MainPage} from "./pages/MainPage";

configure({enforceActions: "observed"});

ReactDOM.render(<MainPage/>, document.getElementById('app-root'));
