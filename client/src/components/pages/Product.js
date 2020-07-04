import React, { useState, useEffect } from "react";
import axios from "axios";

const Product = props => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/products/${props.match.params.id}`)
      .then(res => setProduct(res.data.product))
      .catch(err => console.log(err.message));
  }, []);

  return (
    <div className='container'>
      {!product ? (
        <div className='row justify-content-center mt-5 pt-5'>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className='row mt-5'>
          <div className='col-3'>
            <img
              src={require(`../../images/${product._id}.jpg`)}
              width='300rem'
              height='300rem'
            />
          </div>
          <div className='col-2'></div>
          <div className='col-6 '>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <hr />
            <h4>
              {" "}
              <span className='text-muted'>Price:</span>
              &nbsp;&#8377;{product.price}
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
              />
            </h4>
            <button className='btn btn-warning mt-2'>Add to cart</button>
          </div>
        </div>
      )}
      <hr />
    </div>
  );
};

export default Product;
