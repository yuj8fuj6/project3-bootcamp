import React, { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Button from "./Button";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { ForumContext } from "../contexts/ForumContext";

const { Item } = Menu;

const ForumSearch = ({ index, store }) => {
  const allForumData = useContext(ForumContext) 
  const navigate = useNavigate(); 

  console.log(allForumData);

  const onClick = (e) => {
    navigate("/forum/1")
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 400,
      }}
      defaultSelectedKeys={["1"]}
      mode="inline"
      className="rounded-lg text-yellow font-semibold pt-5 bg-white h-[625px]"
    >
      <p className="px-5 pb-5 text-xl text-darkgrey font-bold">COURSE FORUMS</p>
      <Button className="mx-5 mb-5 border-darkgrey border-2 p-4 text-darkgrey rounded-3xl font-bold hover:text-yellow hover:bg-darkgrey">
        ADD NEW FORUMS
      </Button>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {(formikProps) => (
          <Form className="mb-5 ml-5">
            <div className="form-group has-feedback has-clear flex flex-row gap-3">
              <Field
                className="form-control  border-darkgrey border-2 rounded-lg p-2"
                name="query"
                placeholder="Search Forums"
                onChange={formikProps.handleChange}
                value={formikProps.values.query}
              />
              <div className="flex flex-row">
                <div>
                  <div className="text-right">
                    <button
                      type="reset"
                      className="btn btn-primary p-2 rounded-lg text-yellow bg-darkgrey"
                      value="Reset"
                      disabled={!formikProps.values.query}
                      onClick={formikProps.resetForm}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div className="indent-5 h-96 overflow-auto p-2">
        {allForumData &&
          allForumData.map((forum, index) => (
            <Item key={index} className="bg-darkgrey">
              <span>{forum.title}</span>
            </Item>
          ))}
      </div>
    </Menu>
  );
};

export default ForumSearch;
