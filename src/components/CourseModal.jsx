import { useState } from "react";
import ModalBody from "./ModalBody";
import { Modal, Button } from "antd";
import "./courseModal.css";

export default function CourseModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
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
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Course Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="30vw"
        footer={null}
        className="modalBody"
      >
        <ModalBody />
        <div className="modalFooter">
          <Button onClick={handleOk}>Exit</Button>
        </div>
      </Modal>
    </>
  );
}
