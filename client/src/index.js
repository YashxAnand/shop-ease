import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import SidebarState from "./context/sidebar/SidebarState";

ReactDOM.render(
  <React.StrictMode>
    <SidebarState>
      <App />
    </SidebarState>
  </React.StrictMode>,
  document.getElementById("root")
);
