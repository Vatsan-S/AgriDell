import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";


const Navbar = () => {
  // ------------------------states-----------------------------
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [state, setState] = useState('')
  const navigate = useNavigate()
  // ----------------------handling logout-----------------------
  const handleClick = ()=>{
    if(state==='Login'){
      navigate('/')
      setIsDropDownOpen(false)
    }else{
      localStorage.removeItem('adminToken')
      setIsDropDownOpen(false)
      setState('Login')
      location.reload()
    }
    
  }

  useEffect(()=>{
    const token = localStorage.getItem('adminToken')
    if(token){
      setState('Logout')
    }else{
      setState('Login')
    }
  },[state])
  return (
    <div className="navbar">
      <Link to="/">
        <h5 className="logo">
          Serene..<span>Soil</span>
        </h5>
      </Link>
      <div className="profile profileIcon" onClick={()=>setIsDropDownOpen(!isDropDownOpen)}>
      <FaUser />
      {isDropDownOpen&&<div className="logoutDropDown" onClick={handleClick}>{state}</div>}
      </div>
    </div>
  );
};

export default Navbar;
