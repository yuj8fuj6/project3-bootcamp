import React, { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Button from "./Button";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { ForumContext } from "../contexts/ForumContext";
import { CourseContext } from "../contexts/CourseContext";
import { Modal } from "antd";
import axios from "axios";

import { BACKEND_URL } from "../constants.js";

const { Item } = Menu;

const ForumSearch = () => {
  const { allForumData, setAllForumData } = useContext(ForumContext);
  const { allCourseData, setAllCourseData } = useContext(CourseContext);
  const [filteredForums, setFilteredForums] = useState([]);
  const [filterState, setFilterState] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const handleClick = () => setOpenModal(true);

  const initialValues = { code: "", name: "", content: "" };

  useEffect(() => {
    axios.get(`${BACKEND_URL}/forums/filteredCourses`).then((response) => {
      setFilteredCourses(response.data);
    });
  }, [allCourseData]);

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div>
      <Menu
        style={{
          width: 400,
        }}
        defaultSelectedKeys={["1"]}
        mode="inline"
        className="rounded-lg text-yellow font-semibold pt-5 bg-white h-[625px]"
      >
        <p className="px-5 pb-5 text-xl text-darkgrey font-bold">
          COURSE FORUMS
        </p>
        <Button
          onClick={handleClick}
          className="mx-5 mb-5 border-darkgrey border-2 p-4 text-darkgrey rounded-3xl font-bold hover:text-yellow hover:bg-darkgrey"
        >
          ADD NEW FORUMS
        </Button>
        <Modal
          open={openModal}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          onOk={() => setOpenModal(false)}
          onCancel={() => setOpenModal(false)}
          centered
        >
          <div className="m-1 rounded-lg text-darkgrey">
            <div className="mt-2">
              <h1 className="text-xl font-bold">New Forum</h1>
              <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                  handleSubmit(values);
                  resetForm();
                }}
              >
                {(props) => {
                  console.log(props.values);
                  return (
                    <Form className="grid grid-cols-1">
                      <label htmlFor="code" className="text-sm font-bold mt-4">
                        Course Code
                      </label>
                      <select
                        type="text"
                        id="code"
                        name="code"
                        className="border-darkgrey border-1 rounded text-sm font-normal indent-3"
                        value={props.values.code}
                        onChange={props.handleChange}
                      >
                        {allCourseData &&
                          filteredCourses.map((course) => (
                            <option
                              value={course.course_code}
                              label={course.course_code}
                            >
                              {course.course_code}
                            </option>
                          ))}
                      </select>
                      <label className="text-sm font-bold mt-4">
                        Course Title
                      </label>
                      <select
                        type="text"
                        id="name"
                        name="name"
                        className="border-darkgrey border-1 rounded text-sm font-normal indent-3"
                        value={props.values.name}
                        onChange={props.handleChange}
                      >
                        {allCourseData &&
                          filteredCourses.map((course) => (
                            <option
                              value={course.course_name}
                              label={course.course_name}
                            >
                              {course.course_name}
                            </option>
                          ))}
                      </select>
                      <label className="text-sm font-bold mt-4">
                        Course Description
                      </label>
                      <textarea
                        type="text"
                        id="content"
                        name="content"
                        className="border-darkgrey border-1 rounded h-[125px] text-sm font-normal p-3"
                        value={props.values.content}
                        onChange={props.handleChange}
                        placeholder="Post your content here!"
                      />
                    </Form>
                  );
                }}
              </Formik>
              <div className="flex flex-row justify-center">
                <button className="bg-darkgrey rounded-full border-1 p-1 text-yellow font-bold px-3 mt-4 hover:bg-yellow hover:text-darkgrey">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <Formik initialValues={{ query: "" }}>
          {(formikProps) => {
            return (
              <Form className="mb-5 ml-5">
                <div className="form-group has-feedback has-clear flex flex-row gap-3">
                  <Field
                    className="form-control text-darkgrey border-darkgrey border-2 rounded-lg p-2"
                    name="query"
                    placeholder="Search Forums"
                    onChange={(e) => {
                      formikProps.handleChange(e);
                      const search = allForumData.filter(
                        (forum) =>
                          forum.title.toLowerCase().includes(e.target.value) ||
                          forum.title.toUpperCase().includes(e.target.value),
                      );
                      setFilteredForums(search);
                      setFilterState(true);
                    }}
                    value={formikProps.values.query}
                  />
                  <div className="text-right">
                    <button
                      type="reset"
                      className="btn btn-primary p-2 rounded-lg text-yellow bg-darkgrey"
                      value="Reset"
                      disabled={!formikProps.values.query}
                      onClick={() => {
                        formikProps.resetForm();
                        setFilterState(false);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        <div className="indent-5 h-96 overflow-auto p-2">
          {allForumData &&
            !filterState &&
            allForumData.map((forum) => (
              <Link to={`/forum/${forum.id}`}>
                <Item key={forum.id} className="bg-darkgrey">
                  <span>{forum.title}</span>
                </Item>
              </Link>
            ))}
          {allForumData &&
            filterState &&
            filteredForums.map((forum) => (
              <Link to={`/forum/${forum.id}`}>
                <Item key={forum.id} className="bg-darkgrey">
                  <span>{forum.title}</span>
                </Item>
              </Link>
            ))}
        </div>
      </Menu>
    </div>
  );
};

export default ForumSearch;
