import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'
import App from "./App";
// import '@ecom/auxo/es/styles/index.less';
// import '@ecom/auxo-pro-form/es/preset/import/package/all';
// import valueA from './utils/A'
// console.log(valueA)

import "./utils/A";

const appElement = document.getElementById("app");
if (appElement) {
  const root = ReactDOM.createRoot(appElement);
  root.render(<BrowserRouter><App /></BrowserRouter>);
} else {
  console.error("can't find app element in document");
}
