import React, { useReducer } from "react";
import axios from "axios";
import ProductsContext from "./ProductsContext";
import ProductsReducer from "./ProductsReducer";
import { PRODUCTS_FETCHED } from "../types";

const ProductsState = props => {
  const initialState = {
    featured: null,
    cart: null,
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

  return (
    <ProductsContext.Provider
      value={{
        featured: state.featured,
        cart: state.cart,
        getFeaturedProducts,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsState;
