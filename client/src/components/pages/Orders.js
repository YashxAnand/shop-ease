import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get("/api/orders").then(res => {
      setOrder(res.data.order);
    });
  }, []);
  if (!order) {
    return (
      <div className='container'>
        {!order && (
          <div className='row mt-5'>
            <div className='col-12 text-center'>
              <h1>Loading...</h1>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className='container'>
        {order.orders.length == 0 && (
          <div className='row mt-5'>
            <div className='col-12 text-center'>
              <h1>No order history</h1>
            </div>
          </div>
        )}
        {order.orders.length !== 0 &&
          order.orders.map(ord => (
            <div>
              {ord.products.map(prod => (
                <div>
                  <div className='row mt-4'>
                    <div className='col-3'>
                      <img
                        src={require(`../../images/${prod.product}.jpg`)}
                        alt={prod.name}
                        width='180rem'
                      />
                    </div>
                    <div className='col-6'>
                      <h4>
                        <strong>{prod.name}</strong>
                      </h4>
                      <h4 className='form-inline'>
                        <span className='text-muted'>Quantity: </span>&nbsp;
                        {prod.quantity}
                      </h4>
                      <h4>
                        Status:{" "}
                        <span className='text-success'>{ord.status}</span>
                      </h4>
                      <h4>Shipping Address</h4>
                      <p>
                        {ord.name}
                        <br />
                        {ord.address.line1}
                        <br />
                        {ord.address.line2}
                        <br />
                        {ord.address.zip_code}
                        <br />
                        {ord.address.city}, {ord.address.state}
                      </p>
                    </div>
                    <div className='col-3 text-right'>
                      <h4>&#8377;{prod.cost}</h4>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          ))}
      </div>
    );
  }
};

export default Orders;
