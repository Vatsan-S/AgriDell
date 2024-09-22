import React from 'react';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Orders from './Pages/Orders';
import Products from './Pages/Products';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="appContent">
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/orders' element={<Orders/>}/>
          
        </Routes>
      </div>
    </div>
  );
};

export default App;