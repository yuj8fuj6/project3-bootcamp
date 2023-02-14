import "./App.css";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import Messenger from "./pages/Messenger";
import Contact from "./pages/Contact";
import Map from "./pages/Map";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";

const App = () => {
  return (
    <>
      <div className="App">
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Landing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/messenger" element={<Messenger />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/map" element={<Map />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </UserContextProvider>
      </div>
    </>
  );
};

export default App;
