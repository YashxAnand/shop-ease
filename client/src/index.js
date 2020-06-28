import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import SidebarState from "./context/sidebar/SidebarState";
import AuthState from "./context/auth/AuthState";

ReactDOM.render(
  <React.StrictMode>
    <SidebarState>
      <AuthState>
        <App />
      </AuthState>
    </SidebarState>
  </React.StrictMode>,
  document.getElementById("root")
);
