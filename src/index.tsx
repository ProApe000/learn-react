import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import '@ecom/auxo/es/styles/index.less';
import '@ecom/auxo-pro-form/es/preset/import/package/all';

const appElement = document.getElementById("app");
if (appElement) {
  const root = ReactDOM.createRoot(appElement);
  root.render(<App />);
} else {
  console.error("can't find app element in document");
}
