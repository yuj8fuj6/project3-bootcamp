import React from "react";

export default function ModalBody() {
  return (
    <div className="sm:flex">
      <div className="mt-2">
        <h1 className="text-sm">Course Code</h1>
        <p className="text-sm text-gray-500">EE123</p>
        <h1 className="text-sm">Course Title</h1>
        <p className="text-sm text-gray-500">Data Structures and Algorithms</p>
        <h1 className="text-sm">Course Location</h1>
        <p className="text-sm text-gray-500">LT26</p>
        <h1 className="text-sm">Academic Unit</h1>
        <p className="text-sm text-gray-500">3</p>
        <h1 className="text-sm">Lecturer</h1>
        <p className="text-sm text-gray-500">Prof. Tan Ah Beng</p>
        <h1 className="text-sm">Course Description</h1>
        <p className="text-sm text-gray-500">
          A brief introduction to Data Structures and Algorithms. Students will
          learn to apply Algorithms to real-life problems. Students will need to
          pass this course before they can apply for the Object-Oriented
          Programming module in Java.
        </p>
      </div>
      <div className="mt-2">
        <h1 className="text-sm">Map</h1>
        <p className="text-sm text-gray-500">Map</p>
        <h1 className="text-sm">Selected Index</h1>
        <p className="text-sm text-gray-500">3</p>
        <h1 className="text-sm">Pre-requisites</h1>
        <p className="text-sm text-gray-500">EEE234, EEE456</p>
        <h1 className="text-sm">Available Indexes/Vacancies</h1>
        <p className="text-sm text-gray-500">23456/0 - Tue - 12:30 to 14:30</p>
        <p className="text-sm text-gray-500">23456/0 - Tue - 12:30 to 14:30</p>
        <p className="text-sm text-gray-500">23456/0 - Tue - 12:30 to 14:30</p>
      </div>
    </div>
  );
}
