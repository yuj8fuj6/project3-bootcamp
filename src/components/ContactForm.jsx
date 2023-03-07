import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "./Button";
import { makeOptions } from '../common/utils.js'

const issueOptions = [
  {
    value: "Unable to change index",
    label: "Unable to change Index",
  },
  {
    value: "Unable to register for course/ index",
    label: "Unable to register for course/ Index",
  },
 // etc. etc.
]

const ContactForm = ({ email, first_name, last_name, phone, student, admin, professor }) => {
  const { getAccessTokenSilently } = useAuth0();
  // hooks always first in a component
  const [issueDetails, setIssueDetails] = useState(issueContent);

  const issueContent = {
    issue: "",
    message: "",
    name: last_name + first_name,
    email: email, 
    phone: phone,
    id: student.id || admin.id || professor.id, //To edit if bugs out  // redundant comment
  };

  const handleChange = (e) => {
    setIssueDetails({ ...issueDetails, [e.target.name]: e.target.value });
  };

  // \n works, but it would be nicer to use p tags or spans here, and use CSS to draw a nice layout on our page with line breaks
  const personalDetails = `Name: ${issueDetails.name} \n ID: ${issueDetails.id} \n Email Address: ${issueDetails.email} \n Contact No.: ${issueDetails.phone}`;

  return (
    <div className="pt-10 px-20 grid grid-cols-1 justify-center w-1/2 max-h-full">
      <form action={process.env.REACT_APP_FORMSPREE_EMAIL} method="POST">
        <label>
          <p className="text-left text-yellow text-xl font-bold mt-2">
            Personal Details
          </p>
        </label>
        <textarea
          name="Personal Details"
          className="mt-2 h-1/3  w-full border text-darkgrey font-bold border-neutral-300 rounded-lg text-left indent-1"
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

          {/* let's create a function, that will create these options, see utils.js and above the component */}
          {/* <option value="Unable to change index">Unable to Change Index</option> */}
          {/* Instead of making multiple lines of the above, how about so? */}
          {makeOptions(issueOptions)}
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
