import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = props => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    axios
      .get("api/cart")
      .then(res => {
        setCart({ ...res.data.cart });
      })
      .catch(error => console.log(error.response.data.msg));
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
                  // onChange={handleChange}
                />
              </h4>
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
      {products.length != 0 ? (
        products.map(product => product)
      ) : (
        <div className='col-12 text-center'>
          <h1>Cart is empty!</h1>
        </div>
      )}
      {total !== 0 && total}
    </div>
  );
};

export default Cart;
