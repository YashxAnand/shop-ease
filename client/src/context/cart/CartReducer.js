import {
  CART_UPDATION_SUCCESS,
  CART_UPDATION_FAILED,
  CART_DELETION_SUCCESS,
  CART_DELETION_FAILED,
  CART_SUCCESS,
  CART_FAILED,
  CLEAR_ERRORS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case CART_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case CART_FAILED:
      return {
        ...state,
        errors: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null,
      };

    default:
      return state;
  }
};
