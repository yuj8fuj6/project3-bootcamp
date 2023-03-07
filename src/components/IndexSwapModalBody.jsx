import React from "react";
import "./indexSwapModalBody.css";

// nice, this is a good example of breaking up a bigger component into multiple smaller pieces
export default function IndexSwapModalBody() {
  return (
    <div className="modalBody">
      <div className="">
        <h1 className="modalTitle">Index to Swap:</h1>
        <div className="modalInfoBox">
          <p className="modalInfoDetails">Data Structures and Algorithms</p>
        </div>
        <p>for</p>
        <div className="modalInfoBox">
          <p className="modalInfoDetails">Data Structures and Algorithms</p>
        </div>
      </div>
    </div>
  );
}
