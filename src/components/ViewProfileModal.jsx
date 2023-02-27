import { useState } from "react";
import ViewProfileModalBody from "./ViewProfileModalBody";
import { Modal, Button } from "antd";
import "./viewProfileModal.css";
import axios from "axios";
import { BACKEND_URL } from "../constants";

export default function ViewProfileModal(recipientEmail) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileInformation, setProfileInformation] = useState({});

  const showModal = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/users/${recipientEmail.recipientEmail}`
      );
      console.log(response.data);
      setProfileInformation(response.data);
    } catch (err) {
      console.log("ERROR", err);
    }
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="default" onClick={() => showModal()}>
        View Profile
      </Button>
      <Modal
        title="Profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="30vw"
        footer={null}
        className="modalBody"
      >
        <ViewProfileModalBody profileInformation={profileInformation} />
        <div className="modalFooter">
          <Button onClick={handleOk} className="modalBtn">
            Exit
          </Button>
        </div>
      </Modal>
    </>
  );
}
