import React from "react";
import "./modalBody.css";

export default function ModalBody() {
  return (
    <div className="modalBody">
      <div className="modalSeparation">
        <div className="box">
          <h1 className="modalTitle">Course Title</h1>
          <div className="modalInfoBox">
            <p className="modalInfoDetails">Data Structures and Algorithms</p>
          </div>
        </div>
        <div className="box">
          <h1 className="modalTitle">Course Location</h1>
          <div className="modalInfoBox">
            <p className="modalInfoDetails">LT26</p>
          </div>
        </div>
        <div className="box">
          <h1 className="modalTitle">Academic Unit</h1>
          <div className="modalInfoBox">
            <p className="modalInfoDetails">3</p>
          </div>
        </div>
        <div className="box">
          <h1 className="modalTitle">Lecturer</h1>
          <div className="modalInfoBox">
            <p className="modalInfoDetails">Prof. Tan Ah Beng</p>
          </div>
        </div>
        <div className="box">
          <h1 className="modalTitle">Course Description</h1>
          <div className="modalInfoBox">
            <p className="modalInfoDetails">
              A brief introduction to Data Structures and Algorithms. Students
              will learn to apply Algorithms to real-life problems. Students
              will need to pass this course before they can apply for the
              Object-Oriented Programming module in Java.
            </p>
          </div>
        </div>
      </div>
      <div className="modalSeparation">
        <div className="box">
          <h1 className="modalTitle">Map</h1>
          <div className="modalInfoBox">
            <p className="modalInfoDetails">Map</p>
          </div>
        </div>
        <div className="box">
          <h1 className="modalTitle">Selected Index</h1>
          <div className="modalInfoBox">
            <p className="modalInfoDetails">3</p>
          </div>
        </div>
        <div className="box">
          <h1 className="modalTitle">Pre-requisites</h1>
          <div className="modalInfoBox">
            <p className="modalInfoDetails">EEE234, EEE456</p>
          </div>
        </div>
        <div className="box">
          <h1 className="modalTitle">Available Indexes/Vacancies</h1>
          <div className="modalInfoBox">
            <p className="modalInfoDetails">23456/0 - Tue - 12:30 to 14:30</p>
            <p className="modalInfoDetails">23456/0 - Tue - 12:30 to 14:30</p>
            <p className="modalInfoDetails">23456/0 - Tue - 12:30 to 14:30</p>
          </div>
        </div>
      </div>
    </div>
  );
}
