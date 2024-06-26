import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginSuccess,
} from "../../reduxToolkit/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/login", {
        email,
        password,
      });
      const { message, sessionId, userId, username: userName } = response.data;

      console.log("Login response data:", response.data);

      // Dispatch login action with user data
      dispatch(loginSuccess({ message, sessionId, userId, userName }));

      // Save session ID and user ID in session storage
      sessionStorage.setItem("sessionId", sessionId);
      sessionStorage.setItem("userId", userId);

      // Show success toast notification
      toast.success(message);

      // Redirect user to home page upon successful login
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      dispatch(loginFailure());

      // Show error toast notification with error message
      toast.error(error.message);
    }
  };

  return (
    <div className="auth-form container">
      <form className="login-form">
        <h2 className="signin-header">Sign In</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
