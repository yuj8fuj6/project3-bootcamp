import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "./Button";

const email_endpoint = process.env.REACT_APP_FORMSPREE_EMAIL;

const ContactForm = ({ email, first_name, last_name, phone, student, admin, professor }) => {
  const { getAccessTokenSilently } = useAuth0();
  const issueContent = {
    issue: "",
    message: "",
    name: last_name + first_name,
    email: email, 
    phone: phone,
    id: student.id || admin.id || professor.id, //To edit if bugs out 
  };
  const [issueDetails, setIssueDetails] = useState(issueContent);

  const handleChange = (e) => {
    setIssueDetails({ ...issueDetails, [e.target.name]: e.target.value });
  };

  const personalDetails = `Name: ${issueDetails.name} \n ID: ${issueDetails.id} \n Email Address: ${issueDetails.email} \n Contact No.: ${issueDetails.phone}`;

  return (
    <div className="pt-10 px-20 grid grid-cols-1 justify-center w-1/2 max-h-full">
      <form action={email_endpoint} method="POST">
        <label>
          <p className="text-left text-yellow text-xl font-bold mt-2">
            Personal Details
          </p>
        </label>
        <textarea
          name="Personal Details"
          className="mt-2 h-1/3  w-full border text-darkgrey font-bold border-neutral-300 rounded-lg text-left indent-1 "
          value={personalDetails}
        />
        <label>
          <p className="text-left text-yellow text-xl font-bold mt-2">Issue:</p>
        </label>
        <select
          tabIndex={0}
          className="p-1 shadow bg-base-100 rounded-lg w-72 text-darkgrey text-base font-semibold"
          name="issue"
          onChange={handleChange}
        >
          <option value="Unable to change index">Unable to Change Index</option>
          <option value="Unable to register for course/ index">
            Unable to Register for Course/ Index
          </option>
          <option value="Unable to unregister course/ index">
            Unable to Unregister Course/ Index
          </option>
          <option value="Course code error">Course Code Error</option>
          <option value="Swap index">Swap Index</option>
          <option value="Changes to personal details">
            Changes to Personal Details
          </option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
        <label>
          <p className="text-left text-yellow text-xl font-bold mt-2">
            Detailed Description:
          </p>
        </label>
        <textarea
          className="mt-2 h-1/2 w-full border text-darkgrey font-bold border-neutral-300 rounded-lg text-left indent-1"
          name="message"
          onChange={handleChange}
          value={issueDetails.message}
        />
        <div className="flex justify-center mt-10">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
