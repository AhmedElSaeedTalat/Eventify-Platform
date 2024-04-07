import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginSuccess,
} from "../../reduxToolkit/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Signup.css";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/register", {
        email,
        password,
        username,
      });

      if (!response || !response.data) {
        throw new Error("No response data received");
      }

      console.log("Signup response data:", response.data);

      const { message, sessionId } = response.data;

      if (!message || !sessionId) {
        throw new Error("Incomplete response data received");
      }

      // Dispatch login success action with user data
      dispatch(loginSuccess({ message, sessionId }));

      // Show success toast notification
      toast.success(message);

      // Redirect user to home page upon successful signup
      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
      dispatch(loginFailure());

      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="auth-form container">
      <div className="signup-form">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
