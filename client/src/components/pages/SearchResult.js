import React, { useEffect, useContext } from "react";
import ProductsContext from "../../context/products/ProductsContext";
import { Link } from "react-router-dom";
const SearchResult = props => {
  const { search_result, search_errors, search_product } = useContext(
    ProductsContext
  );

  useEffect(() => {
    search_product(props.match.params.query);
  }, [search_result]);

  let results = [];
  if (search_result !== null) {
    search_result.map(result => {
      results.push(
        <div>
          <div className='row mt-4 mb-4'>
            <div className='col-4'>
              <img
                src={require(`../../images/${result._id}.jpg`)}
                width='180rem'
              />
            </div>
            <div className='col-6'>
              <h4>{result.name}</h4>
              <p>{result.description}</p>
              <div>
                <Link to={`/products/${result._id}`}>
                  <button className='btn btn-warning'>View</button>
                </Link>
              </div>
            </div>
          </div>
          <hr />
        </div>
      );
    });
  }

  if (search_errors !== null) {
    results.push(
      <div className='row mt-5 pt-5'>
        <div className='col-12 text-center'>
          <h2>No results for {props.match.params.query}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className='container mt-5'>
      {results.length === 0 && (
        <div className='row mt-5 pt-5'>
          <div className='col-12 text-center'>
            <h2>Loading...</h2>
          </div>
        </div>
      )}
      {results && results.map(result => result)}
    </div>
  );
};

export default SearchResult;
