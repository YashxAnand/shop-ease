import React, { useReducer } from "react";
import SidebarContext from "./SidebarContext";
import SidebarReducer from "./SidebarReducer";
import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../types";

const SidebarState = props => {
  const initialState = {
    sidebarOpen: false,
  };

  const [state, dispatch] = useReducer(SidebarReducer, initialState);

  const setSidebarOpen = open => {
    dispatch({ type: open ? OPEN_SIDEBAR : CLOSE_SIDEBAR, payload: open });
  };

  return (
    <SidebarContext.Provider
      value={{ sidebarOpen: state.sidebarOpen, setSidebarOpen }}
    >
      {props.children}
    </SidebarContext.Provider>
  );
};

export default SidebarState;
