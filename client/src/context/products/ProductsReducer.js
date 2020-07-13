import {
  PRODUCTS_FETCHED,
  CART_ADDITION_FAILED,
  CART_ADDITION_SUCCESS,
  CLEAR_MESSAGES,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
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
        search_errors: null,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        search_result: action.payload,
        search_errors: null,
      };
    case SEARCH_ERROR:
      return {
        ...state,
        search_result: null,
        search_errors: action.payload,
      };
    default:
      return state;
  }
};
