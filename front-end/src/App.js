import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/Home/Home";
import EventDetails from "./components/EventDetails/EventDetails";
import EventsPage from "./components/EventsPage/EventsPage";
import UserProfilePage from "./components/userProfileComponents/UserProfilePage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import CreateEvent from "./components/userProfileComponents/CreateEvent";
import UpdateProfile from "./components/userProfileComponents/UpdateProfile";

function App() {
  const userAuth = useSelector((state) => state.auth.isLoggedIn);
  console.log(userAuth);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="event-details" element={<EventDetails />} />
        <Route path="signin" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="user-profile" element={<UserProfilePage />}>
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="update-profile" element={<UpdateProfile />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
