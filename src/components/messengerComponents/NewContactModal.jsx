import React, { useRef } from "react";
import { Form, Button, Input } from "antd";
// import { useContacts } from "./ContactsProvider";

export default function NewContactModal({ closeModal }) {
  const emailRef = useRef();
  // const { createContact } = useContacts();

  function handleSubmit(e) {
    e.preventDefault();

    // createContact(emailRef.current.value);
    closeModal(false);
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        label="Email"
        name="email"
        ref={emailRef}
        rules={[
          {
            required: true,
            message: "Please enter an email!",
          },
        ]}
      >
        <Input />
        <Button type="default" htmlType="submit" onClick={closeModal}>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
}
