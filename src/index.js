import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from "./auth/auth0-provider-with-navigate";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_AUDIENCE,
        // scope: "read:current_user update:current_user_metadata",
      }}
      // redirect_uri={window.location.origin}
      // audience={process.env.REACT_APP_AUDIENCE}
      // scope="read:current_user update:current_user_metadata"
    >
      <BrowserRouter>
=======
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
>>>>>>> main
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>,
);
