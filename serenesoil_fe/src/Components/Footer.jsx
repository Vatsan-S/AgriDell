import React from "react";
import { FaBehance } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footerContent">
        <div className="footerContentLeft">
          <h5 className="logo">
            Serene..<span>Soil</span>
          </h5>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy{" "}
          </p>
          <div className="footerSocialIcons">
            <div className="socialLogo">
              <FaBehance />
            </div>
            <div className="socialLogo">
              <FaLinkedin />
            </div>
            <div className="socialLogo"></div>
          </div>
        </div>
        <div className="footerContentCenter">
          <h2>Company</h2>
          <ul>
            <li className="footerLi">Home</li>
            <Link to='/about'><li className="footerLi">About Us</li></Link>
            <li className="footerLi">Delivery</li>
          </ul>
        </div>
        <div className="footerContentRight">
          <h2>Get In Touch</h2>
          <ul>
            <li className="footerLi">+91 9080706050</li>
            <li className="footerLi"></li>Sales@sarenesoil.com
          </ul>
        </div>
      </div>
      <hr />
      <p className="copyrightText">
        Copyright 2024 c sarenesoil.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
