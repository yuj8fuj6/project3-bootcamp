import React from "react";

const Button = (props) => {
  return (
    <button
      className="border-yellow border-2 text-yellow px-4 py-1 rounded-full lg:text-xl"
      {...props}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
