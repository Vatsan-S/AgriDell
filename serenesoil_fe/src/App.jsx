import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Myorders from "./Pages/Myorders";
import About from "./Pages/About";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path='/myOrders' element={<Myorders/>}/>
          <Route path='/about' element={<About/>}/>
          {/* ------------create protected Route----------------  */}
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
