import {
  PRODUCTS_FETCHED,
  CART_ADDITION_FAILED,
  CART_ADDITION_SUCCESS,
  CLEAR_MESSAGES,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case PRODUCTS_FETCHED:
      return {
        ...state,
        featured: action.payload.products,
      };
    case CART_ADDITION_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case CART_ADDITION_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
        message: null,
      };
    default:
      return state;
  }
};
