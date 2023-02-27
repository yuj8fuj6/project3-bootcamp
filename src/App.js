import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
// import Navbar from "./components/NavBar";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import Messenger from "./pages/Messenger";
import Contact from "./pages/Contact";
import Map from "./pages/Map";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";
import { CourseContextProvider } from "./contexts/CourseContext";
import { ForumContextProvider } from "./contexts/ForumContext";
import ForumFeed from "./components/ForumFeed";
import ForumFeedIndividual from "./components/ForumFeedIndividual";
import MapFeed from "./components/MapFeed";
import MapFeedIndividual from "./components/MapFeedIndividual";

const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="App">
        <UserContextProvider>
          <CourseContextProvider>
            <ForumContextProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="main" element={<Landing />} />
                <Route path="profile" element={<Profile />} />
                <Route path="forum" element={<Forum />}>
                  <Route index={true} element={<ForumFeed />} />
                  <Route path=":id" element={<ForumFeedIndividual />} />
                </Route>
                <Route path="messenger" element={<Messenger />} />
                <Route path="contact" element={<Contact />} />
                <Route path="map" element={<Map />}>
                  <Route index={true} element={<MapFeed />} />
                  <Route path=":id" element={<MapFeedIndividual />} />
                </Route>
              </Routes>
            </ForumContextProvider>
          </CourseContextProvider>
        </UserContextProvider>
      </div>
    </>
  );
};

export default App;
