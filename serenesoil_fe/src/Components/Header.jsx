import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header_content">
        <h2>Your Organic Products from Serene Environment</h2>
       
        <Link to='/about'><button>Read About Us</button></Link>
      </div>
    </div>
  );
};

export default Header;
