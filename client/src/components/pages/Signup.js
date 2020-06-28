import React, { useContext, useState, useEffect } from "react";
import { Card, Form, Alert } from "react-bootstrap";
import AuthContext from "../../context/auth/AuthContext";

const Signup = props => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { isAuthenticated, registerUser, errors } = useContext(AuthContext);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    registerUser(formData);
  };

  useEffect(() => {
    isAuthenticated && props.history.push("/");
  }, [isAuthenticated]);

  const { name, email, phone, password } = formData;

  return (
    <>
      <div className='container'>
        <div className='row mt-5 justify-content-center'>
          <div className='col-6'>
            {errors &&
              errors.map(error => (
                <Alert variant='danger'>
                  <span className='fa fa-info-circle'></span>
                  {" " + error}
                </Alert>
              ))}
            <Card>
              <Card.Body>
                <Card.Title>
                  <h1>Create Account</h1>
                </Card.Title>
                <Form onSubmit={onSubmit}>
                  <Form.Group>
                    <Form.Label>
                      <strong>Name</strong>
                    </Form.Label>
                    <Form.Control
                      type='text'
                      name='name'
                      value={name}
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      <strong>Phone number</strong>
                    </Form.Label>
                    <div className='row'>
                      <div className='col-2'>
                        <Form.Control type='text' value='+91' />
                      </div>
                      <div className='col-10'>
                        <Form.Control
                          type='text'
                          name='phone'
                          value={phone}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      <strong>Email address</strong>
                    </Form.Label>
                    <Form.Control
                      type='email'
                      name='email'
                      value={email}
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      <strong>Password</strong>
                    </Form.Label>
                    <Form.Control
                      type='password'
                      name='password'
                      value={password}
                      onChange={onChange}
                    />
                    <Form.Text muted>
                      <span className='fa fa-info-circle'></span>
                      {"  "}
                      Password must be atleast 6 characters
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      className='btn btn-warning'
                      type='submit'
                      value='Create Account'
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
