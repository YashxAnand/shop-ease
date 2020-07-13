import React, { useReducer } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import { CART_SUCCESS, CART_FAILED, CLEAR_ERRORS } from "../types";
import axios from "axios";

const CartState = props => {
  const initialState = {
    cart: null,
    errors: null,
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  //actions
  const getCart = async () => {
    try {
      const res = await axios.get("/api/cart");
      dispatch({ type: CART_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: CART_FAILED, payload: error.response.data.msg });
      clearErrors();
    }
  };

  const updateCart = async (productID, quantity) => {
    try {
      const data = { productID, quantity };
      const res = await axios.put("/api/cart", data);
      dispatch({ type: CART_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: CART_FAILED, payload: error.response.data.msg });
      clearErrors();
    }
  };

  const deleteItem = async productID => {
    try {
      const res = await axios.delete(`/api/cart/${productID}`);
      dispatch({ type: CART_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: CART_FAILED, payload: error.response.data.msg });
      clearErrors();
    }
  };

  const clearErrors = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ERRORS });
    }, 3000);
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        errors: state.errors,
        getCart,
        updateCart,
        deleteItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
