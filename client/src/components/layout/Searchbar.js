import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";

const Searchbar = () => {
  const [query, setQuery] = useState("");

  const handleChange = e => {
    setQuery(e.target.value);
  };

  return (
    <div className='input-group  search-bar'>
      <Form action={`/search/${query}`}>
        <Form.Row>
          <Col xs={11}>
            <input
              type='text'
              placeholder='Search...'
              className='form-control '
              onChange={handleChange}
              style={{ width: "500px" }}
            />
          </Col>
          <Col>
            <button type='submit' className='btn btn-warning'>
              <span className='fa fa-search fa-lg'></span>
            </button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
};

export default Searchbar;
