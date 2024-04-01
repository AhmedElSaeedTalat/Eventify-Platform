import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailure } from "../../reduxToolkit/slices/authSlice";
import { toast } from "react-toastify";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      });

      toast.success(`User registered successfully`);
      navigate("/signin");
    } catch (error) {
      console.error("Error creating user:", error);
      dispatch(loginFailure());
      if (error.response && error.response.data) {
        // If error.response.data exists and it's an object, convert it to a string
        const errorMessage =
          typeof error.response.data === "object"
            ? JSON.stringify(error.response.data)
            : error.response.data;
        let errorMsg = JSON.parse(errorMessage);
        toast.error(`Signup failed. ${errorMsg.error}. Please try again.`);
      } else {
        // If error.response.data does not exist or it's not an object, display a generic error message
        toast.error(
          "Signup failed. An unexpected error occurred. Please try again."
        );
      }
    }
  };

  return (
    <div className="auth-form container">
      <div className="signup-form">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
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
