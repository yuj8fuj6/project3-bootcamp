import React from "react";
import { LoginButton } from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

const Login = () => {
  return (
    <div>
      <div className="bg-darkgrey text-yellow">Login</div>
      <LoginButton />
      <LogoutButton />
    </div>
  );
};

export default Login;
