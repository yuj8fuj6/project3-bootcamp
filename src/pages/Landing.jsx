import React, { useEffect, useContext } from "react";
import Modal from "../components/Modal";
import Navbar from "../components/NavBar";
import { useAuth0 } from "@auth0/auth0-react";

const Landing = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  },[]);

  return (
    <>
      <Navbar />
      <div>
        <div className="bg-darkgrey text-yellow">Landing</div>
        <Modal />
      </div>
    </>
  );
};

export default Landing;
