import { PRODUCTS_FETCHED } from "../types";

export default (state, action) => {
  switch (action.type) {
    case PRODUCTS_FETCHED:
      return {
        ...state,
        featured: action.payload.products,
      };
    default:
      return state;
  }
};
