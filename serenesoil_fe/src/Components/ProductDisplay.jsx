import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { fetchProductList } from "../Redux/Slice/dataSlice";

const ProductDisplay = ({ refinedList, setIsModalOpen, setCardData }) => {
  // ---------------------------------get user Data-------------------
  const token = localStorage.getItem("authToken");
  // console.log('token', token)
  const dispatch = useDispatch();
  // const product_list = useSelector((state) => state.product_list);
  // console.log(product_list)

  useEffect(() => {
    dispatch(fetchProductList());
  }, []);

  // ----------------------------handle Modal--------------------------

  return (
    <div className="productDisplay" id="productDisplay">
      <h2>Top Products</h2>

      <div className="productDisplayList">
        {refinedList.map((ele, index) => {
          return <ProductCard key={index} data={ele} token={token} setCardData={setCardData} setIsModalOpen={setIsModalOpen} />;
        })}
      </div>


    </div>
  );
};

export default ProductDisplay;
