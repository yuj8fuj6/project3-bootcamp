import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./message.css";

export default function Message() {
  useEffect(({ location }) => {
    const data = queryString.parse(location.search);

    console.log(location.search);
    console.log(data);
  });

  return <h1>Chat</h1>;
}

// import React from "react";
// import "./message.css";

// export default function Message({ own }) {
//   return (
//     <div className={own ? "message own" : "message"}>
//       <div className="messageTop">
//         <img
//           className="messageImage"
//           src="https://images.unsplash.com/photo-1527082395-e939b847da0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80"
//           atl=""
//         />
//         <p className="messageText">
//           Lorem Ipsum is simply dummy text of the printing and typesetting
//           industry. Lorem Ipsum has been the industry's standard dummy text ever
//           since the 1500s, when an unknown printer took a galley of type and
//           scrambled it to make a type specimen book.
//         </p>
//       </div>
//       <div className="messageBottom">1 hour ago</div>
//     </div>
//   );
// }
