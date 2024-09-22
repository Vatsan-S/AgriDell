import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa6";
import { resetData } from "../Redux/Slice/dataSlice";

const Navbar = ({ setShowLogin }) => {
  // ---------------states------------------------------------
  const [menu, setMenu] = useState("Home");
  const cartItems = useSelector((state) => state.cartItems);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //   console.log(cartItems);
  const token = localStorage.getItem("authToken");
  // console.log("token", token);

  let count = 0;
  for (let key in cartItems) {
    if (cartItems[key] > 0) {
      count += cartItems[key];
    }
  }
  //   console.log(count)

  // -------------------------logout functionality-----------------------

  const logout = ()=>{
    dispatch(resetData())
    localStorage.removeItem('authToken')
    navigate('/')
  }
  return (
    <div className="navbar">
      <Link to="/">
        <h5 className="logo">
          Serene..<span>Soil</span>
        </h5>
      </Link>
      <ul className="navbar_menu">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#footer"
          onClick={() => setMenu("Contact")}
          className={menu === "Contact" ? "active" : ""}
        >
          Contact Us
        </a>
        <Link
        to='/about'
          onClick={() => setMenu("About")}
          className={menu === "About" ? "active" : ""}
        >
          About
        </Link>
      </ul>
      <div className="navbar_right">
        
        <Link to="/cart" className="navbar_cart_icon">
          <FaShoppingCart />
          <div className={count === 0 ? "" : "dot"}></div>
        </Link>
        {token ? (
          <div className="navbarProfile">
            <div className="profileIcon">
              <FaUser />
            </div>
            <ul className="navProfileDropDown">
              <li onClick={()=>navigate('/myOrders')}>Orders</li>
              <li onClick={logout}>Log Out</li>
            </ul>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
