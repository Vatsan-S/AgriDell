  import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Filter from '../Components/Filter';
import ProductDisplay from '../Components/ProductDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredData } from '../Redux/Slice/dataSlice';
  
  const Home = () => {
    const dispatch = useDispatch()
    const [refinedList, setRefinedList] = useState([])
    const filteredData = useSelector(state=>state.filteredData)

    const [categories, setCategories] = useState(filteredData)
    useEffect(()=>{
      dispatch(setFilteredData(categories))
    },[categories])
    return (
        <div>
            <Header/>
            <Filter  setRefinedList={setRefinedList}  categories={categories} setCategories={setCategories}/>
            <ProductDisplay refinedList={refinedList}  categories={categories}/>
        </div>
    );
  };
  
  export default Home;