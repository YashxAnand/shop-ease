import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";
import ProductsContext from "../../context/products/ProductsContext";
import { Alert, Modal, Button, Form, Col } from "react-bootstrap";
import axios from "axios";

const Product = props => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviewstate, setReviewstate] = useState({
    show: false,
    canWrite: true,
    rating: 5,
    comment: "",
    comment_id: null,
  });

  const { isAuthenticated, user } = useContext(AuthContext);
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

  const handleReviewChange = e => {
    if (e.target.name === "rating") {
      setReviewstate({ ...reviewstate, rating: e.target.value });
    } else {
      setReviewstate({ ...reviewstate, comment: e.target.value });
    }
  };

  const handleDelete = e => {
    axios
      .delete(
        `/api/products/review/${props.match.params.id}/${reviewstate.comment_id}`
      )
      .then(res => {
        loadProduct();
        setReviewstate({
          ...reviewstate,
          rating: 5,
          comment: "",
          comment_id: null,
          canWrite: true,
        });
      })
      .catch(err => console.log(error.message));
  };

  const handleReviewSubmit = e => {
    e.preventDefault();
    const { comment, rating } = reviewstate;
    if (reviewstate.canWrite) {
      axios
        .post(`/api/products/review/${props.match.params.id}`, {
          comment,
          rating,
        })
        .then(res => {
          loadProduct();
        })
        .catch(err => console.log(error.message));
    } else {
      axios
        .put(
          `/api/products/review/${props.match.params.id}/${reviewstate.comment_id}`,
          { comment, rating }
        )
        .then(res => {
          loadProduct();
        })
        .catch(err => console.log(error.message));
    }
  };

  const handleReviewClick = e => {
    if (!isAuthenticated) {
      props.history.push("/login");
    } else {
      setReviewstate({
        ...reviewstate,
        show: true,
      });
    }
  };

  const handleClose = () =>
    setReviewstate({
      ...reviewstate,
      show: false,
    });

  let reviewsarr = [];

  const loadProduct = () => {
    axios
      .get(`/api/products/${props.match.params.id}`)
      .then(res => {
        setProduct(res.data.product);
      })
      .catch(err => console.log(err.message));
  };

  useEffect(() => {
    if (product !== null && user !== null) {
      product.reviews.map(review => {
        if (review.user === user._id) {
          setReviewstate({
            ...reviewstate,
            canWrite: false,
            rating: review.rating,
            comment: review.comment,
            comment_id: review._id,
          });
        }
      });
    } else {
      loadProduct();
    }
  }, [product, user]);

  if (product !== null) {
    product.reviews.map(review => {
      reviewsarr.push(
        <div>
          <h4>{review.name}</h4>
          <h4>{review.rating}/5</h4>
          <p>{review.comment}</p>
          {user != null && review.user === user._id && (
            <div>
              <Button variant='secondary' onClick={handleReviewClick}>
                Edit Review
              </Button>
              <Button variant='danger' onClick={handleDelete} className='ml-2'>
                Delete Review
              </Button>
            </div>
          )}
          <hr />
        </div>
      );
    });
  }
  return (
    <div className='container'>
      {!product ? (
        <div className='row justify-content-center mt-5 pt-5'>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
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
          <hr />
          <h2>Reviews</h2>
          <h5>Rating: {product.avg_rating}/5</h5>

          {reviewstate.canWrite && (
            <button className='btn btn-warning' onClick={handleReviewClick}>
              Write a review
            </button>
          )}

          <Modal show={reviewstate.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Write a Review</Modal.Title>
            </Modal.Header>
            <Form
              action={`/products/${props.match.params.id}`}
              onSubmit={handleReviewSubmit}
            >
              <Modal.Body>
                <Form.Row>
                  <Col xs={12}>
                    <Form.Label>
                      <strong>Rating</strong>
                    </Form.Label>
                  </Col>
                  <Col xs={3}>
                    <Form.Control
                      type='number'
                      min='1'
                      max='5'
                      value={reviewstate.rating}
                      name='rating'
                      onChange={handleReviewChange}
                    />
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col xs={12}>
                    <Form.Label>
                      <strong>Comment</strong>
                    </Form.Label>
                  </Col>
                  <Col xs={12}>
                    <Form.Control
                      as='textarea'
                      rows='8'
                      name='comment'
                      value={reviewstate.comment}
                      onChange={handleReviewChange}
                    />
                  </Col>
                </Form.Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
                <Button type='submit' variant='primary' onClick={handleClose}>
                  Save Review
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
          <div className='mt-5'>
            {reviewsarr.length !== 0 && reviewsarr.map(review => review)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
