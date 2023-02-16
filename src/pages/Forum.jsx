import React, { useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/NavBar";
import { UserContext } from "../contexts/UserContext";

const Forum = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const user = useContext(UserContext);

  const {
    admin,
    email_address,
    first_name,
    last_name,
    phone_number,
    professor,
    profile_pic_url,
    student,
    updatedAt,
  } = user;

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div className="bg-darkgrey text-yellow">Forum</div>
      </div>
    </>
  );
};

export default Forum;
