import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import SidebarState from "./context/sidebar/SidebarState";
import AuthState from "./context/auth/AuthState";
import ProductsState from "./context/products/ProductsState";

ReactDOM.render(
  <React.StrictMode>
    <SidebarState>
      <AuthState>
        <ProductsState>
          <App />
        </ProductsState>
      </AuthState>
    </SidebarState>
  </React.StrictMode>,
  document.getElementById("root")
);
