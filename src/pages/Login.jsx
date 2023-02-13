import React from "react";
import Logo from "../components/Logo";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {

  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/main",
      },
    });
  };
  return (
    <div className="flex flex-wrap flex-col justify-center content-center h-full w-full">
      <Logo className="h-1/3 pb-5" onClick={handleLogin}/>
      <div className="bg-darkgrey font-bold text-yellow flex justify-center">
        Click Logo To Login
      </div>
    </div>
  );
};

export default Login;
