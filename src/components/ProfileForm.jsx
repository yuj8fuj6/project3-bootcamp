import React, { useEffect, useState } from "react";
import { useAuth0, User } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Button from "./Button";
import axios from "axios";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const ProfileForm = ({
  email,
  phone,
  url,
  updated_at,
  student,
  professor,
  admin,
}) => {
  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (e) => {
    await e.preventDefault();

    const accessToken = await getAccessTokenSilently({
      audience: `${audience}`,
      scope: "read:current_user",
    });
  };

  return (
    <div className="pt-10 px-20 grid grid-cols-1 justify-center w-full">
      <div className="grid grid-cols-3 justify-center gap-3">
        <div>
          <label>
            <p className="text-left text-yellow text-xl font-bold mt-2">
              Email Address:
            </p>
          </label>
          <input
            className="mt-2 w-full border text-darkgrey font-bold border-neutral-300 rounded-lg text-left indent-1 pr-24"
            value={email}
            readonly
          />
          <label>
            <p className="text-left text-yellow text-xl font-bold mt-2">
              Contact Phone No:
            </p>
          </label>
          <input
            className="mt-2 w-full border text-darkgrey font-bold border-neutral-300 rounded-lg text-left indent-1 pr-24"
            value={phone}
          />
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
                readonly
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
                readonly
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
                readonly
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
                readonly
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
                readonly
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
                readonly
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
                readonly
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
                readonly
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
                readonly
              />
            </>
          )}
        </div>
        <div className="grid grid-cols-1 ml-20 justify-center">
          <img
            src={url}
            alt="profile pic"
            className="h-64 w-64 max-w-none rounded-full object-cover"
          />
          <div>
            <Button>Upload Photo (WIP)</Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <Button>Confirm Changes</Button>
      </div>
    </div>
  );
};

export default ProfileForm;
