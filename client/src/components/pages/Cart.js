import React, { useEffect, useState, useContext } from "react";
import CartContext from "../../context/cart/CartContext";
import { Link } from "react-router-dom";

const Cart = props => {
  const [changes, setChanges] = useState({
    id: null,
    value: false,
  });

  const { getCart, cart, errors, updateCart, deleteItem } = useContext(
    CartContext
  );

  const handleChange = id => e => {
    setChanges({ id, value: true });
    cart.products.map(product => {
      if (product.product === id) product.quantity = e.target.value;
    });
  };

  const handleClick = (productID, quantity) => e => {
    setChanges({ ...changes, id: productID });
    updateCart(productID, quantity);
    setChanges({ ...changes, value: false });
    getCart();
  };

  const handleDelete = productID => e => {
    deleteItem(productID);
    getCart();
  };

  useEffect(() => {
    getCart();
  }, []);

  let products = [],
    total = 0;

  if (cart !== null) {
    cart.products.map(product => {
      products.push(
        <div>
          <div className='row mt-4'>
            <div className='col-3'>
              <img
                src={require(`../../images/${product.product}.jpg`)}
                alt={product.name}
                width='180rem'
              />
            </div>
            <div className='col-6'>
              <h4>
                <strong>{product.name}</strong>
              </h4>
              <h4 className='form-inline'>
                <span className='text-muted'>Quantity: </span>&nbsp;
                <input
                  type='number'
                  name=''
                  id=''
                  className='form-control'
                  style={{ width: "80px" }}
                  min='1'
                  value={product.quantity}
                  onChange={handleChange(product.product)}
                />
                {changes.value && changes.id === product.product && (
                  <button
                    className='btn btn-success ml-3'
                    onClick={handleClick(product.product, product.quantity)}
                  >
                    Update
                  </button>
                )}
                <button
                  className='btn btn-danger ml-3'
                  onClick={handleDelete(product.product)}
                >
                  Delete
                </button>
              </h4>
              {changes.id === product.product && (
                <p style={{ color: "red" }}>{errors}</p>
              )}
            </div>
            <div className='col-3 text-right'>
              <h4>&#8377;{product.cost}</h4>
            </div>
          </div>
          <hr />
        </div>
      );
    });

    total = (
      <div className='row'>
        <div className='col-3'>
          <h4>Total</h4>
        </div>
        <div className='col-9 text-right'>
          <h4>&#8377;{cart.total}</h4>
        </div>
      </div>
    );
  }

  return (
    <div className='container mt-4'>
      <h2>Shopping Cart</h2>
      <div className='row '>
        <div className='col-12 text-right'>
          <p className='text-muted'>Price</p>
        </div>
      </div>
      <hr />
      {products.length !== 0 ? (
        products.map(product => product)
      ) : (
        <div className='col-12 text-center'>
          <h1>Cart is empty!</h1>
        </div>
      )}
      {cart && cart.total !== 0 && total}
      {cart && cart.total !== 0 && (
        <div className='row mt-5 mb-5'>
          <div className='col-4'></div>
          <div className='col-4'>
            <Link to='/checkout' style={{ textDecoration: "none" }}>
              <button
                className='btn btn-warning d-block'
                style={{ display: "block", width: "100%", fontSize: "150%" }}
              >
                checkout
              </button>
            </Link>
          </div>
          <div className='col-4'></div>
        </div>
      )}
    </div>
  );
};

export default Cart;
