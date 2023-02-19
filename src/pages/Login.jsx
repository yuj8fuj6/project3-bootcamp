import React from "react";
import Logo from "../components/Logo";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/main",
      },
    });
  };
  return (
    <div className="flex flex-wrap flex-col border-yellow border-2 justify-center content-center h-full w-full bg-no-repeat bg-center bg-cover rounded-xl bg-[url('https://images.unsplash.com/photo-1537420327992-d6e192287183?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80')]">
      <Logo className="h-1/3 pb-5" onClick={handleLogin} />
      <div className="font-bold text-yellow flex justify-center">
        Click Logo To Login
      </div>
    </div>
  );
};

export default Login;
