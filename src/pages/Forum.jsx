import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/NavBar";
import axios from "axios";
import ForumSearch from "../components/ForumSearch";
import { Outlet } from "react-router-dom";

import { BACKEND_URL } from "../constants.js";

const Forum = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, []);

  return (
    <div className="max-h-screen max-w-screen overscroll-none">
      <Navbar />
      <div className="px-20 pt-10 font-extrabold text-2xl text-yellow ">
        Student Forums
      </div>
      <div className="pt-10 px-20 grid grid-flow-col grid-cols-3 justify-center">
        <div>
          <ForumSearch />
        </div>
        <div className="col-span-2 border-2 rounded-xl border-yellow p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Forum;
