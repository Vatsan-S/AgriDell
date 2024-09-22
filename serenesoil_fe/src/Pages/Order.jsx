import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API_URL from "../Config/api_url";
import { jwtDecode } from "jwt-decode";
import { fetchCartItems } from "../Redux/Slice/dataSlice";

const Order = () => {
  // ------------------------------get token---------------------
  const token = localStorage.getItem("authToken");
  const decoded = jwtDecode(token);
  // ------------------------------states-----------------------
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cartItems);
  const product_list = useSelector((state) => state.product_list);
  const [paymentdata, setPaymentdata] = useState(null);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
  });
  // --------------------------get total cart amount-------------------------
  const getTotalCartAmount = () => {
    return product_list.reduce((total, item) => {
      if (cartItems[item._id] > 0) {
        return total + item.price * cartItems[item._id];
      }
      return total;
    }, 0);
  };

  const subtotal = getTotalCartAmount();
  console.log("sub", subtotal)
  const deliverFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliverFee;
  // --------------------onchange Handler--------------------
  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // -----------------------------handle payment-------------------------------
  const handlePayment = async (e) => {
    e.preventDefault();
    // createOrder(total)
    try {
      const response = await axios.post(
        "https://agridell.onrender.com/api/orders/placeOrder",
        {
          total,
          currency: "INR",
          receipt: "receipt1",
        }
      );
      console.log(response);
      setPaymentdata(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // ---------------------------handle checkout----------------------------------
  useEffect(() => {
    if (paymentdata) {
      const loadRazorpayScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => initiateCheckout();
        document.body.appendChild(script);
      };

      loadRazorpayScript();
    }
  }, [paymentdata]);

  const initiateCheckout = () => {
    if (!paymentdata) return;

    const options = {
      key: "rzp_test_Ex5SxT8OQlIlrc",
      amount: paymentdata.amount, 
      currency: "INR",
      name: "vatsan Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: paymentdata.id,
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        // console.log(response);
        createOrder();
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert('Payment Failed, try again', response.error.reason)
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  };
  // ----------------------------create Order------------------------------
  const createOrder = async () => {
    let orderItems = [];
    product_list.map((ele) => {
      if (cartItems[ele._id] > 0) {
        let itemInfo = { ...ele, quantity: cartItems[ele._id] };

        orderItems.push(itemInfo);
      }
    });
    const payload = {
      userID: decoded.id,
      items: orderItems,
      amount:  paymentdata.amount.toString().slice(0,-2),
      address: address,
      payment: true,
    };
    console.log(payload);
    try {
      
      const response = await axios.post(`${API_URL}/api/orders/createOrder`,payload)
      console.log(response)
      dispatch(fetchCartItems())
      console.log('fetch')
      navigate('/myOrders')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="placeOrder" onSubmit={handlePayment}>
      <div className="placeOrderLeft">
        <p className="title">Delivery Information</p>
        <div className="multiFields">
          <input
            required
            type="text"
            name="firstName"
            onChange={onchangeHandler}
            placeholder="First Name"
          />
          <input
            required
            type="text"
            name="lastName"
            onChange={onchangeHandler}
            placeholder="Last Name"
          />
        </div>
        <input
          required
          type="text"
          name="email"
          onChange={onchangeHandler}
          placeholder="Email"
        />
        <input
          required
          type="text"
          name="street"
          onChange={onchangeHandler}
          placeholder="Street"
        />
        <div className="multiFields">
          <input
            required
            type="text"
            name="city"
            onChange={onchangeHandler}
            placeholder="City"
          />
          <input
            required
            type="text"
            name="state"
            onChange={onchangeHandler}
            placeholder="State"
          />
        </div>
        <div className="multiFields">
          <input
            required
            type="text"
            name="zipcode"
            onChange={onchangeHandler}
            placeholder="Zipcode"
          />
        </div>
        <input
          required
          type="text"
          name="phone"
          onChange={onchangeHandler}
          placeholder="Phone"
        />
      </div>
      <div className="placeOrderRight">
        <div className="cartTotal">
          <h2>Cart Total</h2>
          <div>
            <div className="cartTotalDetails">
              <p>Subtotal</p>
              <p>{subtotal}</p>
            </div>
            <hr />
            <div className="cartTotalDetails">
              <p>Delivery Fee</p>
              <p>{deliverFee}</p>
            </div>
            <hr />
            <div className="cartTotalDetails">
              <b>Total</b>
              <b>{total}</b>
            </div>
          </div>
          <button type="submit">Pay</button>
          
        </div>
      </div>
      <button onClick={()=>dispatch(fetchCartItems())}>click</button>
    </form>
  );
};

export default Order;
