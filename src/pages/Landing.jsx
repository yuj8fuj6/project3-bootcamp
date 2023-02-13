import React from "react";
import Modal from "../components/Modal";
import Navbar from "../components/NavBar";

const Landing = () => {
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
