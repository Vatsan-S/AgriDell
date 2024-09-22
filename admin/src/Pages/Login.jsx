import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../../serenesoil_fe/src/Config/api_url";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  // -------------------------states---------------------
  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/api/user/loginAdmin`,
        payload
      );
      console.log(response);
      localStorage.setItem('adminToken', response.data.token)
      location.reload()
      navigate('/products')
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if(token){
        navigate('/products')
    }
  }, []);
  const onchangeHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="loginPage">
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={onchangeHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onchangeHandler}
        />
        <button type="submit" className="button actionButton">Login</button>
      </form>
    </div>
  );
};

export default Login;
