import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import API_URL from "../Config/api_url.js";
import axios from "axios";
import { SphereSpinner } from "react-spinners-kit";

const Login = ({ setShowLogin }) => {
  // --------------------------states-------------------------------
  const [currentState, setCurrentState] = useState("Login");
  const [payload, setPayload] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  // ---------------------------onchange Handler----------------------------
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPayload((data) => ({ ...data, [name]: value }));
  };
  //  --------------------------on submit login-----------------------------
  const onLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("working")
    let url = `${API_URL}`;
    // console.log(url)
    if (currentState === "Login") {
      url += "/api/user/login";
    } else {
      url += "/api/user/register";
    }
    // console.log(url)

    try {
      const response = await axios.post(url, payload);
      console.log(response);
      localStorage.setItem('authToken', response.data.token)
      setLoading(false);
      setShowLogin(false)
      location.reload()
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error.response.data.message)
    }
  };
  return (
    <div className="loginModal">
      <form onSubmit={onLogin} className="loginContainer">
        <div className="loginTitle">
          <h2>{currentState}</h2>
          <div className="close" onClick={() => setShowLogin(false)}>
            <IoClose />
          </div>
        </div>
        <div className="loginInputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="Your name"
              name="username"
              onChange={onChangeHandler}
              value={payload.username}
              required
            />
          )}

          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={payload.email}
            placeholder="Your email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={payload.password}
            placeholder="Password"
            required
          />
        </div>
        {currentState === "Sign Up" ? (
          <div className="termsAndCondition">
            <input type="checkbox" required />
            <p>By Clicking this, you agree for our terms and conditions</p>
          </div>
        ) : (
          <></>
        )}
        {loading ? (
          <button disabled={loading} className="LoadingButton">
            <SphereSpinner size={15} color="#ffffff" loading={loading} />{" "}
            Loading
          </button>
        ) : (
          <button type="submit">
            {currentState === "Sign Up" ? "Create Account" : "Login"}
          </button>
        )}

        {currentState === "Login" ? (
          <p>
            New here?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Register </span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrentState("Login")}>Login</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
