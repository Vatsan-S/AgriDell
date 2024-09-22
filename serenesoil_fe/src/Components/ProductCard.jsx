import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {  addToCart, removeFromCart } from "../Redux/Slice/dataSlice";
import {useNavigate} from 'react-router-dom';

import {jwtDecode} from 'jwt-decode';


const ProductCard = ({ data, token }) => {
//   console.log(data)


  // -----------------------------------states-----------------------

  const cartItem = useSelector(state=>state.cartItems)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log("c",cartItem)

// ------------------------------handling add To cart----------------------
const handleAddtoCart = ()=>{

  if(!token){
    navigate('/login')
  }else{
    // console.log(token)
    const decoded = jwtDecode(token)
    // console.log(decoded)
    dispatch(addToCart({userID: decoded.id, productID:data._id}))
  }
}
// ----------------------handling remove from cart-------------------------------
const handleRemoveFromCart = ()=>{
  if(!token){
    alert("Please Login")
  }else{
    const decoded = jwtDecode(token)
    dispatch(removeFromCart({userID: decoded.id, productID:data._id}))
  }
}
  return (
    <div className="Product">
      <div className="productImageContainer">
        <img src={data.image} className="productImg" alt="" />
        {/* add wishlist */}
      </div>
      <div className="productInfo">
        <p className="productName">{data.name}</p>

        <p className="productDescription">{data.description}</p>
        <div className="productActionData">
          <p className="productPrice">Rs.{data.price}</p>
          {!cartItem[data._id] ? (
            <div onClick={() => handleAddtoCart()} className="addToCart">
              <IoIosAdd />
            </div>
          ) : (
            <div className="counterSetUp">
                <div onClick={()=>dispatch(handleRemoveFromCart())} className="increment"><FiMinus /></div>
                <div className="count">{cartItem[data._id]}</div>
                <div onClick={()=>handleAddtoCart()} className="decrement"><IoIosAdd /></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
