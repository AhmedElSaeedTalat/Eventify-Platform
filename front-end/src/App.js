import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const userAuth = useSelector((state) => state.auth.isLoggedIn);
  console.log(userAuth);
  return (
    <div className="App">
      <Navbar />
      <h1>Home Page</h1>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
