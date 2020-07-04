import React, { useContext, useEffect } from "react";
import ProductsContext from "../../context/products/ProductsContext";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const FeaturedItems = props => {
  const { featured, getFeaturedProducts } = useContext(ProductsContext);

  let electronics = [],
    clothings = [],
    furnitures = [];
  useEffect(() => {
    if (featured === null) {
      getFeaturedProducts();
    }
  }, [featured]);

  if (featured !== null) {
    featured.map(item => {
      switch (item.category) {
        case "Electronics":
          electronics.push(
            <div
              className='col-6 col-lg-4 mb-5 mt-3 text-center'
              key={item._id}
            >
              <Link to={`/products/${item._id}`} className='product-link'>
                <Card
                  className='clickable'
                  style={{ width: "18rem", height: "22rem" }}
                >
                  <Card.Img
                    variant='top'
                    src={require(`../../images/${item._id}.jpg`)}
                    style={{ width: "17.9rem", height: "15rem" }}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          );
          break;
        case "Clothing & Accessories":
          clothings.push(
            <div
              className='col-6 col-lg-4 mb-5 mt-3 text-center'
              key={item._id}
            >
              <Link to={`/products/${item._id}`} className='product-link'>
                <Card
                  className='clickable'
                  style={{ width: "18rem", height: "22rem" }}
                >
                  <Card.Img
                    variant='top'
                    src={require(`../../images/${item._id}.jpg`)}
                    style={{ width: "17.9rem", height: "15rem" }}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          );
          break;
        case "Furnitures":
          furnitures.push(
            <div
              className='col-6 col-lg-4 mb-5 mt-3 text-center'
              key={item._id}
            >
              <Link to={`products/${item._id}`} className='product-link'>
                <Card
                  className='clickable'
                  style={{ width: "18rem", height: "22rem" }}
                >
                  <Card.Img
                    variant='top'
                    src={require(`../../images/${item._id}.jpg`)}
                    style={{ width: "17.9rem", height: "15rem" }}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          );
          break;
      }
    });
  }

  return (
    <div className='container mt-5 '>
      <h2>Electronics</h2>
      <div className='row justify-content-center pb-5'>
        {electronics && electronics.map(electronic => electronic)}
      </div>
      <h2>Clothings & Accessories</h2>
      <div className='row justify-content-center pb-5'>
        {clothings && clothings.map(clothing => clothing)}
      </div>
      <h2>Furnitures</h2>
      <div className='row justify-content-center pb-5'>
        {furnitures && furnitures.map(furniture => furniture)}
      </div>
    </div>
  );
};

export default FeaturedItems;
