import React from "react";
import Navbar from "../components/NavBar";
import CourseModal from "../components/CourseModal";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-darkgrey text-yellow">Landing</div>
      <CourseModal />
    </div>
  );
};

export default Landing;
