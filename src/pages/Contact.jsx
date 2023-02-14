import React, { useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/NavBar";
import { UserContext } from "../contexts/UserContext";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const user = useContext(UserContext);
  const {
    email_address,
    first_name,
    last_name,
    phone_number,
    student,
    admin,
    professor,
  } = user;

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  });

  return (
    <div className="max-h-screen max-w-screen">
      <Navbar />
      <div className="px-20 pt-10 font-extrabold text-2xl text-yellow">
        Contact
      </div>
      <ContactForm
        email={email_address}
        first_name={first_name}
        last_name={last_name}
        phone={phone_number}
        student={student}
        admin={admin}
        professor={professor}
      />
    </div>
  );
};

export default Contact;
