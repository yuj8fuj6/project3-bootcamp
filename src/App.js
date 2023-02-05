import "./App.css";
import Navbar from "./components/NavBar";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import Messenger from "./pages/Messenger";
import Contact from "./pages/Contact";
import Map from "./pages/Map";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
