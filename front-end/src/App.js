import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/Home/Home";
import EventDetails from "./components/EventDetails/EventDetails";

function App() {
  const userAuth = useSelector((state) => state.auth.isLoggedIn);
  console.log(userAuth);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventDetails" element={<EventDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
