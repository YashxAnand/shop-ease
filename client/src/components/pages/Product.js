import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";
import ProductsContext from "../../context/products/ProductsContext";
import { Alert } from "react-bootstrap";
import axios from "axios";

const Product = props => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { isAuthenticated } = useContext(AuthContext);
  const { message, error, addToCart } = useContext(ProductsContext);

  const handleChange = e => {
    setQuantity(e.target.value);
  };

  const handleClick = e => {
    if (!isAuthenticated) {
      props.history.push("/login");
    } else {
      addToCart(props.match.params.id, quantity);
    }
  };

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
                value={quantity}
                onChange={handleChange}
              />
            </h4>
            <button className='btn btn-warning mt-2' onClick={handleClick}>
              Add to cart
            </button>
            <div className='mt-4'>
              {error && <Alert variant='danger'>{error}</Alert>}
              {message && <Alert variant='success'>{message}</Alert>}
            </div>
          </div>
        </div>
      )}
      <hr />
    </div>
  );
};

export default Product;
