import React, { useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/NavBar";
import MapSearch from "../components/MapSearch";
import { Outlet } from "react-router-dom";

const Map = () => {
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
        Course Locations
      </div>
      <div className="pt-10 px-20 grid grid-flow-col grid-cols-3 justify-center">
        <div>
          <MapSearch />
        </div>
        <div className="col-span-2 p-3 flex flex-row justify-center content-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Map;
