import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {  addToCart, removeFromCart } from "../Redux/Slice/dataSlice";
import {useNavigate} from 'react-router-dom';

import {jwtDecode} from 'jwt-decode';


const ProductCard = ({ data, token, setIsModalOpen, setCardData }) => {
//   console.log(data)


  // -----------------------------------states-----------------------

  const cartItem = useSelector(state=>state.cartItems)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log("c",cartItem)

// ------------------------------handling add To cart----------------------
const handleAddtoCart = (e)=>{
e.stopPropagation()
  if(!token){
    navigate('/')
  }else{
    // console.log(token)
    const decoded = jwtDecode(token)
    // console.log(decoded)
    dispatch(addToCart({userID: decoded.id, productID:data._id}))
  }
}
// ----------------------handling remove from cart-------------------------------
const handleRemoveFromCart = (e)=>{
  e.stopPropagation()
  if(!token){
    alert("Please Login")
  }else{
    const decoded = jwtDecode(token)
    dispatch(removeFromCart({userID: decoded.id, productID:data._id}))
  }
}
// ----------------------------------handle onclick--------------------------------
const handleOnclick = ()=>{
  setCardData(data)
  setIsModalOpen(true)
}
  return (
    <div className="Product" onClick={handleOnclick}>
      <div className="productImageContainer">
        <img src={data.image} className="productImg" alt="" />
        {/* add wishlist */}
      </div>
      <div className="productInfo">
        <p className="productName">{data.name}</p>

        <p className="productDescription">{data.description.slice(0,88)}...</p>
        <div className="productActionData">
          <p className="productPrice">Rs.{data.price}</p>
          {!cartItem[data._id] ? (
            <div onClick={(e) => handleAddtoCart(e)} className="addToCart">
              <IoIosAdd />
            </div>
          ) : (
            <div className="counterSetUp">
                <div onClick={(e)=>dispatch(handleRemoveFromCart(e))} className="increment"><FiMinus /></div>
                <div className="count">{cartItem[data._id]}</div>
                <div onClick={(e)=>handleAddtoCart(e)} className="decrement"><IoIosAdd /></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
