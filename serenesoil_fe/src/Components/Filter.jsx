import React, { useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";

const Filter = ({
  
  categories,
  setCategories,
  
  setRefinedList,
}) => {
  // -------------------------------states----------------------------
  const [data, setData] = useState(categories);
  const [searchValue, setSearchValue] = useState("");
  const categoryList = ["oil", "spice", "utilities", "devotional", "cooking","cosmetics"];
  const product_list = useSelector((state) => state.product_list);
  // console.log(product_list)
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setRefinedList(
      product_list
        .filter((ele) => {
          if (categories.length === 0) {
            return true;
          } else {
            return categories.includes(ele.category);
          }
        })
        .filter((ele) => ele.name.toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [categories, searchValue, product_list]);
  //    -------------------------------handle submit----------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("working");
    setCategories(data);
  };

  // ------------------------------------handle checkbox Change-------------------------
  const handleChange = (e) => {
    if (e.target.checked === true) {
      // console.log(e.target.name)
      setData((prev) => [...prev, e.target.name]);
    } else if (e.target.checked === false) {
      setData((prev) => prev.filter((ele) => ele !== e.target.name));
    }
    // console.log(e.target.checked);
  };


  useEffect(()=>{
    if(isFilterOpen===false){
      setData(categories)
    }
  },[isFilterOpen])
 

  // ------------------------------handle search---------------------------
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    // setCategories(prev=>prev.filter((ele)=>ele.includes(e.target.value)))
  };

  // ====================================jsx==================================================
  return (
    <div className="exploreMenu" id="exploreMenu">
      
      
      <div className="filterContents">
      <button className="button" onClick={()=>setIsFilterOpen(!isFilterOpen)}>Filter</button>
        
          {isFilterOpen?<form className="filterForm" onSubmit={handleSubmit}>
            <h4>Categories</h4>
            <div className="catogoriesFilter">
            {categoryList.map((ele, index) => {
              return (
                <div key={index} className="catogoryList">
                  <input
                    type="checkbox"
                    checked={data.includes(ele)}
                    name={ele}
                    id={ele}
                    onChange={handleChange}
                  />
                  <label htmlFor={ele}>{ele}</label>
                </div>
              );
            })}
            </div>
            
           <div className="filterActions">
           <button type="submit" className="button actionButton">Apply</button>
           <p onClick={()=>{setIsFilterOpen(false)}}>Cancel</p>
           </div>
          </form>:<></>}
        </div>
      

      <div className="searchBox">
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default Filter;
