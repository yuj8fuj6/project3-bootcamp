import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/NavBar";
import ProfileForm from "../components/ProfileForm.jsx";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const Profile = () => {
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
    updated_at,
  } = user;

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  });

  return (
    <div>
      <Navbar />
      {student && (
        <div className="px-20 pt-10 font-extrabold text-2xl text-yellow">
          Student Profile
        </div>
      )}
      {professor && (
        <div className="px-20 pt-10 font-extrabold text-2xl text-yellow">
          Staff Profile
        </div>
      )}
      {admin && (
        <div className="px-20 pt-10 font-extrabold text-2xl text-yellow">
          Admin Profile
        </div>
      )}
      <div className="px-20 pt-10 font-extrabold text-2xl text-yellow">
        {last_name} {first_name}
      </div>
      <ProfileForm
        email={email_address}
        phone={phone_number}
        url={profile_pic_url}
        updated_at={updated_at}
        student={student}
        professor={professor}
        admin={admin}
      />
    </div>
  );
};

export default Profile;
