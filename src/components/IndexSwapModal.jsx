import { useState } from "react";
import IndexSwapModalBody from "./IndexSwapModalBody";
import { Modal, Button } from "antd";
import "./indexSwapModal.css";

export default function IndexSwapModal() {
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
      <Button type="default" onClick={showModal}>
        Confirm Index Swap
      </Button>
      <Modal
        title="Confrim Swap Index"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="30vw"
        footer={null}
        className="modalBody"
      >
        <IndexSwapModalBody />
        <div className="modalFooter">
          <Button onClick={handleOk} className="modalBtn">
            Confirm swap
          </Button>
          <Button onClick={handleOk} className="modalBtn">
            Exit
          </Button>
        </div>
      </Modal>
    </>
  );
}
