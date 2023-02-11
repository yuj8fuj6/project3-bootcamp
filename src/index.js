import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-u8fivmuxrql5gvqk.us.auth0.com"
      clientId="NmCojb06tiHPMsZVeiiPYhoP7nRnD6hr"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://project3-bootcamp/api",
        scope: "read:current_user update:current_user_metadata",
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
