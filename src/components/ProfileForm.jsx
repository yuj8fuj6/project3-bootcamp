import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "./Button";
import axios from "axios";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { BACKEND_URL } from "../constants.js";

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
    await e.preventDefault();

    const accessToken = await getAccessTokenSilently({
      audience: `${audience}`,
      scope: "read:current_user",
    });
  };

  const uploadPhoto = async (updatedPhotoFile) => {
    const profilePhotoRef = ref(storage, `${lastName} ${firstName}`);
    if (updatedPhotoFile) {
      const photoURL = uploadBytes(profilePhotoRef, updatedPhotoFile)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((url) => {
          setProfilePhotoURL(url);
          return url;
        });
      return photoURL;
    }
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    let photoURL = await uploadPhoto(updatedPhotoFile);
    // Do not know why this code below only works after 2 clicks.
    // const profilePhotoRef = ref(storage, `${lastName} ${firstName}`);
    // await uploadBytes(profilePhotoRef, updatedPhotoFile).then(() =>
    //   getDownloadURL(profilePhotoRef).then((downloadURL) => {
    //     // console.log(downloadURL);
    //     setProfilePhotoURL(downloadURL);
    //     // console.log(profilePhotoURL);
    //   }),
    // );
    await axios
      .post(`${BACKEND_URL}/users/photoURL`, {
        photoURL: `${photoURL}`,
        user_id: `${id}`,
      })
      .then((res) => {
        console.log(res.data.profile_pic_url);
        setUpdatedPhotoFileURL(res.data.profile_pic_url);
      })
      .catch((err) => {
        console.log(err);
        alert("Profile photo upload is unsuccessful.");
      });

    alert("Profile photo has been successfully uploaded!");
    setProfilePhotoURL("");
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
            src={updatedPhotoFileURL}
            alt="profile pic"
            className="h-72 w-72 rounded-full object-cover"
          />
          <label className="flex justify-center mt-5">
            <p className="text-yellow hover:text-blue-400">Upload Photo</p>
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
        {changedState && <Button>Confirm Changes</Button>}
      </div>
      <div className="px-5 text-base text-yellow">Updated at: {updatedAt}</div>
    </div>
  );
};

export default ProfileForm;
