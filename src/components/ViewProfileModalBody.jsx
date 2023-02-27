import React from "react";
import "./viewProfileModalBody.css";

export default function ViewProfileModalBody(profileInformation) {
  console.log("MODAL BODY PROFILE INFO", profileInformation);
  return (
    <div className="modalBody">
      <div className="">
        <div className="box">
          <h1 className="modalTitle">Name</h1>
          <div className="modalInfoBox">
            <p className="modalInfoDetails">
              {profileInformation.profileInformation.first_name}{" "}
              {profileInformation.profileInformation.last_name}
            </p>
          </div>
        </div>
        <div className="box">
          <h1 className="modalTitle">Email</h1>
          <div className="modalInfoBox">
            <p className="modalInfoDetails">
              {profileInformation.profileInformation.email_address}
            </p>
          </div>
        </div>
        <div className="box">
          <h1 className="modalTitle">School</h1>
          <div className="modalInfoBox">
            <p className="modalInfoDetails">
              {profileInformation.profileInformation.student.school}
            </p>
          </div>
        </div>
        <div className="box">
          <h1 className="modalTitle">Degree</h1>
          <div className="modalInfoBox">
            <p className="modalInfoDetails">
              {profileInformation.profileInformation.student.degree}
            </p>
          </div>
        </div>
        <div className="box">
          <h1 className="modalTitle">Academic Year</h1>
          <div className="modalInfoBox">
            <p className="modalInfoDetails">
              {profileInformation.profileInformation.student.academic_year}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
