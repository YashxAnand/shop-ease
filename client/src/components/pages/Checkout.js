import React, { useContext, useState } from "react";
import CartContext from "../../context/cart/CartContext";
import axios from "axios";

const loadScript = src => {
  return new Promise(resolve => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const Checkout = props => {
  const { cart } = useContext(CartContext);

  const [payment_options, set_payment_options] = useState({
    cod: false,
    online: true,
  });
  const [order_confirmed, setOrderConfirmed] = useState(false);

  const handleClick = e => {
    set_payment_options({
      cod: !payment_options.cod,
      online: !payment_options.online,
    });
  };
  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Network connection failed");
      return;
    }

    axios.post("/api/payment", { amount: cart.total }).then(res => {
      console.log(res.data);
      const options = {
        key: "rzp_test_69AzAueBR9O95Q",
        currency: res.data.currency,
        amount: res.data.amount,
        order_id: res.data.id,
        name: "ShopEase",
        description: "eCommerce website",
        image: "https://example.com/your_logo",
        handler: function (response) {
          const post_data = {
            name: document.getElementById("name").value,
            mobile: document.getElementById("mobile").value,
            zip_code: document.getElementById("zip-code").value,
            address_line1: document.getElementById("address-line1").value,
            address_line2: document.getElementById("address-line2").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,
            total: cart.total,
            products: cart.products,
          };
          axios
            .post("/api/orders", post_data)
            .then(res => {
              setOrderConfirmed(true);
            })
            .catch(err => console.log(err.response.data.msg));
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const post_data = {
      name: document.getElementById("name").value,
      mobile: document.getElementById("mobile").value,
      zip_code: document.getElementById("zip-code").value,
      address_line1: document.getElementById("address-line1").value,
      address_line2: document.getElementById("address-line2").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      total: cart.total,
      products: cart.products,
    };
    if (payment_options.cod) {
      axios
        .post("/api/orders", post_data)
        .then(res => {
          setOrderConfirmed(true);
        })
        .catch(err => console.log(err.response.data.msg));
    } else {
      displayRazorpay();
    }
  };

  if (!order_confirmed) {
    return (
      <div className='container'>
        <div className='row mt-5'>
          <h2>Address</h2>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>
              <strong>Full name</strong>
            </label>
            <input
              className='form-control'
              type='text'
              name='name'
              id='name'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='mobile'>
              <strong>Mobile number</strong>
            </label>
            <input
              type='text'
              className='form-control'
              name='mobile'
              id='mobile'
              maxLength='10'
              placeholder='Enter phone number without prefix'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='zip-code'>
              <strong>PIN code</strong>
            </label>
            <input
              type='text'
              className='form-control'
              name='zip-code'
              id='zip-code'
              maxLength='6'
              placeholder='6 digit [0-9] PIN code'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='address-line1'>
              <strong>Flat, House no., Building, Company, Apartment</strong>
            </label>
            <input
              type='text'
              className='form-control'
              name='address-line1'
              id='address-line1'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='address-line2'>
              <strong>Area, Colony, Street, Sector, Village</strong>
            </label>
            <input
              type='text'
              className='form-control'
              name='address-line2'
              id='address-line2'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='city'>
              <strong>Town/City</strong>
            </label>
            <input
              type='text'
              className='form-control'
              name='city'
              id='city'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='state'>
              <strong>State</strong>
            </label>
            <input
              type='text'
              className='form-control'
              name='state'
              id='state'
              required
            />
          </div>
          <div className='row mt-5'>
            <h2>Your order</h2>
            <table className='table table-bordered text-center'>
              <thead>
                <tr>
                  <th scope='col'>Product</th>
                  <th scope='col'>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart &&
                  cart.products.map(product => (
                    <tr>
                      <td>
                        {product.name}
                        <strong> &times; {product.quantity}</strong>
                      </td>
                      <td>&#8377;{product.quantity * product.cost}</td>
                    </tr>
                  ))}
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>&#8377;{cart.total}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className='row mt-5'>Payment methods</h2>
          <hr />
          <div className='col-12 mt-4'>
            <div className='form-check'>
              <div className='col-12'>
                <input
                  type='radio'
                  className='form-check-input'
                  name='cod'
                  id='cod'
                  value='option1'
                  checked={payment_options.cod}
                  onClick={handleClick}
                />
                <label htmlFor='cod' className='form-check-label'>
                  <h4>Cash on delivery</h4>
                </label>
              </div>
            </div>
            <div className='form-check'>
              <div className='col-12 align-self-center'>
                <input
                  type='radio'
                  className='form-check-input mt-5'
                  name='online'
                  id='online'
                  value='option2'
                  checked={payment_options.online}
                  onClick={handleClick}
                />
                <label htmlFor='online' className='form-check-label'>
                  <img
                    src={require("../../images/razorpay.jpg")}
                    width='150rem'
                    height='100rem'
                    alt='online'
                  />
                </label>
              </div>
            </div>
            <input
              type='submit'
              className='btn btn-warning mb-5'
              value={
                payment_options.cod
                  ? "Confirm order"
                  : `Place order & pay Rs.${cart.total}`
              }
            />
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-12 text-center'>
            <img
              src={require("../../images/success.png")}
              width='200rem'
              height='200rem'
            />
          </div>
          <div className='col-12 text-center'>
            <h1>Order Confirmed!</h1>
          </div>
        </div>
      </div>
    );
  }
};

export default Checkout;
