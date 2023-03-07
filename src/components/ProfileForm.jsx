import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "./Button";
import axios from "axios";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { BACKEND_URL } from "../constants.js";
import "./profileForm.css";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const ProfileForm = ({
  lastName,
  firstName,
  email,
  phone,
  url,
  updatedAt,
  student,
  professor,
  id,
  setUserData,
  userData,
}) => {
  const { getAccessTokenSilently } = useAuth0();
  const [phoneContact, setPhoneContact] = useState(phone);
  const [changedState, setChangedState] = useState(false);
  const [updatedPhotoFile, setUpdatedPhotoFile] = useState("");
  const [updatedPhotoFileURL, setUpdatedPhotoFileURL] = useState(url);
  const [changedPhoto, setChangedPhoto] = useState(false);
  const [profilePhotoURL, setProfilePhotoURL] = useState("");

  const handleChange = (e) => {
    setPhoneContact(e.target.value);
    setChangedState(true);
  };

  useEffect(() => {
    // what is the difference? better naming would be good here
    if (phoneContact == phone) {
      setChangedState(false);
    }
  }, [phoneContact]);

  const handleUpdatedPhoto = (e) => {
    setUpdatedPhotoFile(e.target.files[0]);
    const urlDisplay = URL.createObjectURL(e.target.files[0]);
    setUpdatedPhotoFileURL(urlDisplay);
    setChangedPhoto(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = await getAccessTokenSilently({
      audience: `${audience}`,
      scope: "read:current_user",
    });

    await axios
      .put(
        `${BACKEND_URL}/users/profile`,
        {
          phone_number: `${phoneContact}`,
          user_id: `${id}`,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.phone_number);
        setPhoneContact(res.data.phone_number);
        setUserData({ ...userData, phone_number: res.data.phone_number });
      })
      .catch((err) => {
        console.log(err);
        alert("Changes to profile are unsuccessful.");
      });

    alert("Profile has been successfully updated!");
    setChangedState(false);
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently({
      audience: `${audience}`,
      scope: "read:current_user",
    });

    // const photoURL = await uploadPhoto(updatedPhotoFile);
    // Do not know why this code below only works after 2 clicks. // I won't be able to answer that without knowing the app. WHat doesn't work? When you do what? Is there an error in the console or network tab?
    const profilePhotoRef = ref(storage, `${lastName} ${firstName}`);
    const photoURL = await uploadBytes(profilePhotoRef, updatedPhotoFile).then(
      () =>
        getDownloadURL(profilePhotoRef).then((downloadURL) => {
          setProfilePhotoURL(downloadURL);
          return downloadURL;
        })
    );
    await axios
      .put(
        `${BACKEND_URL}/users/photoURL`,
        {
          photoURL: `${photoURL}`,
          user_id: `${id}`,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setUpdatedPhotoFileURL(res.data.profile_pic_url);
        setUserData({ ...userData, profile_pic_url: res.data.profile_pic_url });
      })
      .catch((err) => {
        console.log(err);
        alert("Profile photo upload is unsuccessful."); // grrrrr
      });

    alert("Profile photo has been successfully uploaded!"); // grrrrr
    setProfilePhotoURL("");
    setChangedPhoto(false);
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
          {/* I think we could make this a component */}
          {student && (
          <>
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
            </>
          )}
        </div>
        <div className="profilePicContainer">
          <img
            src={updatedPhotoFileURL}
            alt="profile pic"
            className="profilePic"
          />
          <label className="flex justify-center mt-5">
            <p className="uploadPhotoButton">Upload Photo</p>
            <input
              type="file"
              className="hidden"
              onChange={handleUpdatedPhoto}
            />
          </label>
          <div className="flex justify-center p-4">
            {changedPhoto && (
              <Button onClick={handlePhotoSubmit}>Confirm Photo</Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        {changedState && (
          <Button onClick={handleSubmit}>Confirm Changes</Button>
        )}
      </div>
      <div className="px-5 text-base text-yellow">Updated at: {updatedAt}</div>
    </div>
  );
};

export default ProfileForm;
