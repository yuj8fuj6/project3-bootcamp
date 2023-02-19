import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "./Button";
import axios from "axios";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const ProfileForm = ({ email, phone, url, updatedAt, student, professor }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [phoneContact, setPhoneContact] = useState(phone);
  const [changedState, setChangedState] = useState(false);

  const handleChange = (e) => {
    setPhoneContact(e.target.value);
    setChangedState(true);
  };

  useEffect(() => {
    if (phoneContact == phone) {
      setChangedState(false);
    }
  }, [phoneContact]);

  console.log(phoneContact.toString().length == 8);

  const handleSubmit = async (e) => {
    await e.preventDefault();

    const accessToken = await getAccessTokenSilently({
      audience: `${audience}`,
      scope: "read:current_user",
    });
  };

  return (
    <div className="pt-5 px-20 grid grid-cols-1 justify-center w-full max-h-full">
      <div className="grid grid-cols-3 justify-center gap-6">
        <div>
          <label>
            <p className="text-left text-yellow text-xl font-bold mt-2">
              Email Address:
            </p>
          </label>
          <input
            className="mt-2 w-full border text-darkgrey font-bold border-neutral-300 rounded-lg text-left indent-1 pr-24"
            value={email}
            readOnly
          />
          <label>
            <p className="text-left text-yellow text-xl font-bold mt-2">
              Contact Phone No:
              <span className="text-red-600 text-xs ml-5">
                (Editable Field)
              </span>
            </p>
          </label>
          <input
            className="mt-2 w-full border text-darkgrey font-bold border-neutral-300 rounded-lg text-left indent-1 pr-24"
            value={phoneContact}
            onChange={handleChange}
            required
            minLength={8}
            maxLength={8}
          />
          {phoneContact.toString().length != 8 && (
            <p className="text-red-600 text-xs">
              Please insert a valid phone number.
            </p>
          )}
          {student && (
            <>
              <label>
                <p className="text-left text-yellow text-xl font-bold mt-2">
                  Current Degree Program:
                </p>
              </label>
              <textarea
                className="mt-2 w-full border text-darkgrey font-bold border-neutral-300 rounded-lg text-left indent-1"
                value={student.degree}
                readOnly
              />
            </>
          )}
          {student && (
            <>
              <label>
                <p className="text-left text-yellow text-xl font-bold mt-2">
                  School:
                </p>
              </label>
              <textarea
                className="mt-2 w-full border text-darkgrey font-bold border-neutral-300 rounded-lg text-left indent-1"
                value={student.school}
                readOnly
              />
            </>
          )}
          {professor && (
            <>
              <label>
                <p className="text-left text-yellow text-xl font-bold mt-2">
                  School:
                </p>
              </label>
              <textarea
                className="mt-2 w-full border text-darkgrey font-bold border-neutral-300 rounded-lg text-left indent-1"
                value={professor.school}
                readOnly
              />
            </>
          )}
          {student && (
            <>
              <label>
                <p className="text-left text-yellow text-xl font-bold mt-2">
                  Current Cumulative GPA:
                </p>
              </label>
              <input
                className="mt-2 w-full border text-darkgrey font-bold border-neutral-300 rounded-lg text-left indent-1"
                value={student.gpa}
                readOnly
              />
            </>
          )}
        </div>
        <div>
          {student && (
            <>
              <label>
                <p className="text-left text-yellow text-xl font-bold mt-2">
                  Academic Year:
                </p>
              </label>
              <input
                className="mt-2 w-full border text-darkgrey font-bold border-neutral-300 rounded-lg text-left indent-1"
                value={student.academic_year}
                readOnly
              />
            </>
          )}
          {student && (
            <>
              <label>
                <p className="text-left text-yellow text-xl font-bold mt-2">
                  Total Academic Units to graduate:
                </p>
              </label>
              <input
                className="mt-2 w-full border text-darkgrey font-bold border-neutral-300 rounded-lg text-left indent-1"
                value={student.total_unit}
                readOnly
              />
            </>
          )}
          {student && (
            <>
              <label>
                <p className="text-left text-yellow text-xl font-bold mt-2">
                  Completed Academic Units:
                </p>
              </label>
              <input
                className="mt-2 w-full border text-darkgrey font-bold border-neutral-300 rounded-lg text-left indent-1"
                value={student.completed_unit}
                readOnly
              />
            </>
          )}
          {student && (
            <>
              <label>
                <p className="text-left text-yellow text-xl font-bold mt-2">
                  Outstanding Academic Units:
                </p>
              </label>
              <input
                className="mt-2 w-full border text-darkgrey font-bold border-neutral-300 rounded-lg text-left indent-1"
                value={student.outstanding_unit}
                readOnly
              />
            </>
          )}
          {student && (
            <>
              <label>
                <p className="text-left text-yellow text-xl font-bold mt-2">
                  Academic Units Registered:
                </p>
              </label>
              <input
                className="mt-2 w-full border text-darkgrey font-bold border-neutral-300 rounded-lg text-left indent-1"
                value={student.yearly_unit}
                readOnly
              />
            </>
          )}
          {student && (
            <>
              <label>
                <p className="text-left text-yellow text-xl font-bold mt-2">
                  Completed Courses:
                </p>
              </label>
              <textarea
                className="mt-2 w-full border text-darkgrey font-bold border-neutral-300 rounded-lg text-left indent-1"
                value="To be filled!"
                readOnly
              />
            </>
          )}
        </div>
        <div className="grid grid-cols-1 ml-36 h-[350px]">
          <img
            src={url}
            alt="profile pic"
            className="h-72 w-72 rounded-full object-cover"
          />
          <div className="flex justify-center p-7">
            <Button>Upload Photo</Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        {changedState && <Button>Confirm Changes</Button>}
      </div>
      <div className="px-5 text-base text-yellow">Updated at: {updatedAt}</div>
    </div>
  );
};

export default ProfileForm;
