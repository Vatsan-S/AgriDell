import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../Redux/Slice/dataSlice";

import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const Cart = () => {

  // ----------------------validating token----------------
  const token = localStorage.getItem('authToken')
  
  // ---------------------states------------------------
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cartItems);
  const product_list = useSelector((state) => state.product_list);
  //   console.log(product_list);
  // console.log(getTotalCartAmount())

  const getTotalCartAmount = () => {
    return product_list.reduce((total, item) => {
      if (cartItems[item._id] > 0) {
        return total + item.price * cartItems[item._id];
      }
      return total;
    }, 0);
  };

  const subtotal = getTotalCartAmount();
  // console.log(subtotal)
  const deliverFee = getTotalCartAmount()===0?0:2;
  const total = subtotal + deliverFee;
  // ----------------------handle delete from cart--------------------------
  const handleDeleteFromCart = (productID)=>{
    if(token){
      const decoded = jwtDecode(token)
      dispatch(deleteFromCart({userID: decoded.id, productID: productID}))
    }
  }
  return (
    <div className="cart">
      <div className="cartItems">
        <div className="cartItemsTitle">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Qty</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {product_list.map((ele, index) => {
          if (cartItems[ele._id] > 0) {
            return (
              <div key={index}>
                <div className="cartItemsTitle singleCartItem">
                  <img src={ele.image} alt="" />
                  <p>{ele.name}</p>
                  <p>Rs.{ele.price}</p>
                  <p>{cartItems[ele._id]}</p>
                  <p>Rs.{ele.price * cartItems[ele._id]}</p>
                  <p
                    className="cross"
                    onClick={() => handleDeleteFromCart(ele._id)}
                  >
                    <MdDelete /> Remove
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cartBottom">
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
          {getTotalCartAmount() > 0 && <button onClick={() => navigate("/order")}>
            Enter billing Details
          </button>}
        </div>
        <div className="cartPromoCode">
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
