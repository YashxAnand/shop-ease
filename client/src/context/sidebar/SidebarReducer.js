import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return {
        ...state,
        sidebarOpen: action.payload,
      };
    case CLOSE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: action.payload,
      };
    default:
      return state;
  }
};
