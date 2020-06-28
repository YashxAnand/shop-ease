import React, { useContext, useState, useEffect } from "react";
import { Card, Form, Alert } from "react-bootstrap";
import AuthContext from "../../context/auth/AuthContext";
import { Link } from "react-router-dom";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    login({ email, password });
  };

  const { login, isAuthenticated, errors } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className='container'>
        <div className='row mt-5 justify-content-center'>
          <div className='col-6 mt-5'>
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
                  <h1>Login</h1>
                </Card.Title>
                <Form onSubmit={onSubmit}>
                  <Form.Group>
                    <Form.Label>
                      <strong>Email address</strong>
                    </Form.Label>
                    <Form.Control
                      type='email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      <strong>Password</strong>
                    </Form.Label>
                    <Form.Control
                      type='password'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      className='btn btn-warning'
                      type='submit'
                      value='Login'
                    />
                    <Form.Text muted>
                      <div className='row'>
                        <div className='col-4'>
                          <hr />
                        </div>
                        <div className='col-4 mt-2'>New to ShopEase?</div>
                        <div className='col-4'>
                          <hr />
                        </div>
                      </div>
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Link to='/signup'>
                      <Form.Control
                        type='submit'
                        value='Create Account'
                        className='btn btn-light'
                      />
                    </Link>
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

export default Login;
