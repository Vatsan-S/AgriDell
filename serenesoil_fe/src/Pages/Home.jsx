import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import Header from "../Components/Header";
import Filter from "../Components/Filter";
import ProductDisplay from "../Components/ProductDisplay";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredData } from "../Redux/Slice/dataSlice";
import {  addToCart, removeFromCart } from "../Redux/Slice/dataSlice";
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { SphereSpinner } from "react-spinners-kit";

const Home = () => {
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [refinedList, setRefinedList] = useState([]);
  const filteredData = useSelector((state) => state.filteredData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItem = useSelector((state) => state.cartItems);
  const status = useSelector((state)=>state.status)
  
  // console.log(status)
  // console.log(refinedList)
  const [cardData, setCardData] = useState({
    category: "",
    description: "",
    image: "",
    name: "",
    price: 0,
    stock: 0,
    _id: "",
  });
  // console.log(cardData, isModalOpen);
  const [categories, setCategories] = useState(filteredData);
  useEffect(() => {
    dispatch(setFilteredData(categories));
  }, [categories]);

  // ------------------------------handling add To cart----------------------
const handleAddtoCart = (e)=>{
  e.stopPropagation()
    if(!token){
      navigate('/')
    }else{
      // console.log(token)
      const decoded = jwtDecode(token)
      // console.log(decoded)
      dispatch(addToCart({userID: decoded.id, productID:cardData._id}))
    }
  }
  // ----------------------handling remove from cart-------------------------------
  const handleRemoveFromCart = (e)=>{
    e.stopPropagation()
    if(!token){
      alert("Please Login")
    }else{
      const decoded = jwtDecode(token)
      dispatch(removeFromCart({userID: decoded.id, productID:cardData._id}))
    }
  }
  return (
    <div>
      <Header />

      <Filter
        setRefinedList={setRefinedList}
        categories={categories}
        setCategories={setCategories}
      />
      {refinedList.length!==0?<ProductDisplay
        refinedList={refinedList}
        categories={categories}
        setCardData={setCardData}
        setIsModalOpen={setIsModalOpen}
      />:status==='Loading'?<div className="NoData"><SphereSpinner size={15} color="#000" /></div>:<div className="NoData">No Data Available</div>}
      {isModalOpen && (
        <div className="modalBG" onClick={() => setIsModalOpen(false)}>
          <div className="modalCard">
            <div className="productImageContainer">
              <img src={cardData.image} className="productImg" alt="" />
              
            </div>
            <div className="productInfo">
                <p className="productName">Hello{cardData.name}</p>
                <p className="productDescription">{cardData.description}</p>
                <div className="productActionData">
                  <p className="productPrice">Rs.{cardData.price}</p>
                  {!cartItem[cardData._id] ? (
                    <div
                      onClick={(e) => handleAddtoCart(e)}
                      className="addToCart"
                    >
                      <IoIosAdd />
                    </div>
                  ) : (
                    <div className="counterSetUp">
                      <div
                        onClick={(e) => dispatch(handleRemoveFromCart(e))}
                        className="increment"
                      >
                        <FiMinus />
                      </div>
                      <div className="count">{cartItem[cardData._id]}</div>
                      <div
                        onClick={(e) => handleAddtoCart(e)}
                        className="decrement"
                      >
                        <IoIosAdd />
                      </div>
                    </div>
                  )}
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
