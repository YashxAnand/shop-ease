import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";
import { Card, Form, Alert } from "react-bootstrap";

const EditProfile = () => {
  const { user, editProfile, update_success, update_failed } = useContext(
    AuthContext
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    editProfile(formData);
  };

  useEffect(() => {
    setFormData({ name: user.name, email: user.email, phone: user.phone });
  }, [user]);

  const { name, email, phone, password } = formData;
  return (
    <div className='container'>
      <div className='row mt-4'>
        <div className='col-12 text-center'>
          <h1>Update Profile</h1>
        </div>
      </div>
      <div className='row mt-5 justify-content-center'>
        <div className='col-6'>
          {update_failed &&
            update_failed.map(error => (
              <Alert variant='danger'>
                <span className='fa fa-info-circle'></span>
                {" " + error}
              </Alert>
            ))}
          {update_success && (
            <Alert variant='success'>
              <span className='fa fa-info-circle'></span>
              {" " + update_success}
            </Alert>
          )}
          <Card>
            <Card.Body>
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
                  <Form.Control
                    className='btn btn-success'
                    type='submit'
                    value='Update Profile'
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
