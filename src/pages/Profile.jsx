import React, { useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/NavBar";
import ProfileForm from "../components/ProfileForm.jsx";
import { UserContext } from "../contexts/UserContext";

const Profile = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const user = useContext(UserContext);
  const {
    id, 
    admin,
    email_address,
    first_name,
    last_name,
    professor,
    student,
    updatedAt,
  } = user.userData;

  const profile_pic_url = user.userPhotoURL; 
  const phone_number = user.userPhone; 
  const setUserPhone = user.setUserPhone; 

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, []);

  return (
    <div className="max-h-screen max-w-screen">
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
      {student && (
        <div className="px-20 text-base text-yellow">
          Student ID: {student.id}
        </div>
      )}
      {professor && (
        <div className="px-20 text-base text-yellow">
          Staff ID: {professor.id}
        </div>
      )}
      {admin && (
        <div className="px-20 text-base text-yellow">Admin ID: {admin.id}</div>
      )}
      <div className="px-20 text-xs text-red-600">
        Note: Only the contact phone no. field and profile picture are editable.
      </div>
      <ProfileForm
        lastName = {last_name}
        firstName = {first_name}
        email={email_address}
        phone={phone_number}
        url={profile_pic_url}
        updatedAt={updatedAt}
        student={student}
        professor={professor}
        id = {id}
        setUserPhone = {setUserPhone}
      />
    </div>
  );
};

export default Profile;
