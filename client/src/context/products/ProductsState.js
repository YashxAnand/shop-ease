import React, { useReducer } from "react";
import axios from "axios";
import ProductsContext from "./ProductsContext";
import ProductsReducer from "./ProductsReducer";
import {
  PRODUCTS_FETCHED,
  CART_ADDITION_SUCCESS,
  CART_ADDITION_FAILED,
  CLEAR_MESSAGES,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
} from "../types";

const ProductsState = props => {
  const initialState = {
    featured: null,
    message: null,
    error: null,
    search_result: null,
    search_errors: null,
  };

  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  //Actions
  const getFeaturedProducts = async () => {
    try {
      const res = await axios.get("/api/products/featured");
      dispatch({ type: PRODUCTS_FETCHED, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  const clearMessages = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_MESSAGES });
    }, 3000);
  };

  const addToCart = async (productID, quantity) => {
    try {
      const res = await axios.post("/api/cart", { productID, quantity });
      dispatch({ type: CART_ADDITION_SUCCESS, payload: res.data.msg });
      clearMessages();
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: CART_ADDITION_FAILED,
        payload: error.response.data.msg,
      });
      clearMessages();
    }
  };

  const search_product = async query => {
    try {
      console.log(query);
      const res = await axios.get(`/api/products/search/${query}`);
      dispatch({ type: SEARCH_SUCCESS, payload: res.data.items });
    } catch (error) {
      dispatch({ type: SEARCH_ERROR, payload: error.response.data.msg });
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        featured: state.featured,
        message: state.message,
        error: state.error,
        search_result: state.search_result,
        search_errors: state.search_errors,
        search_product,
        getFeaturedProducts,
        addToCart,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsState;
