import { useState } from "react";
import "./Login.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the server
      const response = await axios.post("/login", { email, password });

      // Handle session-related data
      const cookies = response.headers["set-cookie"]; // Get cookies from response headers
      console.log(cookies);
      cookies.forEach((cookie) => {
        document.cookie = cookie; // Set each cookie in the browser
      });

      // Optionally, you can redirect the user to another page upon successful login
      // window.location.href = "/dashboard";

      console.log("Logged in successfully");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
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
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Login;
