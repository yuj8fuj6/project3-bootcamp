import React, { useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ForumContext } from "../contexts/ForumContext";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  BsArrowDownSquare,
  BsArrowUpSquare,
  BsArrowLeftCircle,
  BsFillTrashFill,
  BsFillAwardFill,
} from "react-icons/bs";
import { Form, Formik } from "formik";
import axios from "axios";

import { BACKEND_URL } from "../constants.js";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const ForumFeedIndividual = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [totalPostVote, setTotalPostVote] = useState(0);

  const { getAccessTokenSilently } = useAuth0();
  const { allForumData, setAllForumData } = useContext(ForumContext);
  const { userData, allUserData, setUserData } = useContext(UserContext);

  const allStudentData = allUserData.filter((user) => user.student);
  const forum = allForumData.filter((forum) => forum.id === param.id)[0];
  const currentUserStudentID = userData.student.id;

  const initialValues = { content: "" };

  const handleSubmit = async (values) => {
    const accessToken = await getAccessTokenSilently({
      audience: `${audience}`,
      scope: "read:current_user",
    });
    const newPost = {
      student_id: currentUserStudentID,
      content: `${values.content}`,
      forum_id: forum.id,
    };
    await axios
      .post(`${BACKEND_URL}/forums/newPost`, newPost, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setAllForumData(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("No post was created!");
      });
  };

  const handleDelete = async (postID) => {
    const accessToken = await getAccessTokenSilently({
      audience: `${audience}`,
      scope: "read:current_user",
    });
    await axios
      .post(
        `${BACKEND_URL}/forums/deletePost`,
        { postID: postID },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        setAllForumData(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("No post was deleted!");
      });
  };

  const handleClickUpVote = async (data) => {
    const accessToken = await getAccessTokenSilently({
      audience: `${audience}`,
      scope: "read:current_user",
    });
    await axios
      .post(
        `${BACKEND_URL}/forums/newPostVote`,
        {
          upvote: true,
          post_id: data.postID,
          student_id: currentUserStudentID,
          forum_id: data.postForumID,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        setAllForumData(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Upvote failed!");
      });
  };

  useEffect(() => {
    if (allForumData) {
      axios.get(`${BACKEND_URL}/forums/${param.id}`).then((res) => {
        setTotalPostVote(res.data);
      });
    }
  }, [allForumData]);

  return (
    <div className="h-full rounded-lg">
      <div className="p-1">
        {allForumData && (
          <div className="bg-white rounded-lg mt-2 pt-2 pl-5 grid grid-cols-1 content-start">
            <div className="flex flex-row">
              <div className="bg-darkgrey rounded-lg text-yellow text-sm font-bold w-[500px] h-fit py-1 indent-4 ">
                {forum.course.course_code} - {forum.course.course_name}
              </div>
              <button
                className="hover:text-yellow hover-darkgrey font-extrabold text-xl flex flex-row ml-40 py-1"
                onClick={() => {
                  navigate("/forum");
                }}
              >
                <BsArrowLeftCircle />
                <span className="text-sm ml-2">Back to Summary</span>
              </button>
            </div>
            <div className="grid grid-flow-col grid-cols-8 justify-start mt-2">
              <div className="text-darkgrey grid grid-cols-1 font-extrabold text-xl h-24">
                <span className="text-xs">
                  <div className="text-lg mb-2">
                    {totalPostVote} <BsFillAwardFill />
                  </div>
                  Total <br /> Upvotes
                </span>
              </div>
              <div className="text-darkgrey text-lg col-span-7 font-extrabold">
                <div className="text-darkgrey text-[10px] font-bold">
                  Created on {forum.updatedAt}
                </div>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values, { resetForm }) => {
                    handleSubmit(values);
                    resetForm();
                  }}
                >
                  {(props) => {
                    return (
                      <Form className="grid grid-cols-1 gap-2 mb-2">
                        <label className="text-darkgrey font-extrabold">
                          Post Content
                        </label>
                        <textarea
                          type="text"
                          id="content"
                          name="content"
                          className="border-darkgrey border-1 rounded mr-4 h-[125px] text-sm font-normal p-3"
                          value={props.values.short || props.values.content}
                          onChange={props.handleChange}
                          placeholder="Post your content here!"
                        />
                        <button
                          className="text-darkgrey text-sm border-1 rounded-full border-darkgrey w-3/12 hover:bg-darkgrey hover:text-yellow disabled:border-slate-400 disabled:text-slate-400"
                          type="submit"
                          disabled={props.values.content == ""}
                        >
                          Submit Post
                        </button>
                      </Form>
                    );
                  }}
                </Formik>
                <div className="overflow-auto h-72 border-darkgrey border-1 mb-4 mr-4 rounded-xl p-4 bg-slate-100">
                  {allForumData &&
                    forum.posts.map((post) => {
                      return (
                        <div className="grid grid-flow-col grid-cols-8 justify-start h-24">
                          <img
                            src={
                              allStudentData.filter(
                                (user) => user.student.id === post.studentId,
                              )[0].profile_pic_url
                            }
                            alt="Forum Profile Pic"
                            className="rounded-full w-12 h-12"
                          />
                          <div className="col-span-7 text-sm">
                            <p>
                              {
                                allStudentData.filter(
                                  (user) => user.student.id === post.studentId,
                                )[0].last_name
                              }{" "}
                              {
                                allStudentData.filter(
                                  (user) => user.student.id === post.studentId,
                                )[0].first_name
                              }{" "}
                              <span className="text-xs pl-6">
                                - Updated at{" "}
                                {
                                  allStudentData.filter(
                                    (user) =>
                                      user.student.id === post.studentId,
                                  )[0].updatedAt
                                }
                              </span>
                            </p>
                            <p className="font-normal text-xs mt-1">
                              {post.content}
                            </p>
                            <p className="mt-2 flex flex-row justify-start gap-2 text-xs">
                              <button
                                onClick={() => {
                                  const data = {
                                    postID: post.id,
                                    postForumID: post.forum_id,
                                  };
                                  handleClickUpVote(data);
                                }}
                              >
                                <BsArrowUpSquare className="hover:text-yellow hover:bg-darkgrey " />
                              </button>
                              <div>{post.upvote}</div>
                              <button
                                onClick={() => {
                                  const data = {
                                    postID: post.id,
                                    postForumID: post.forum_id,
                                  };
                                  handleClickUpVote(data);
                                }}
                              >
                                <BsArrowDownSquare className="hover:text-yellow hover:bg-darkgrey " />
                              </button>
                              <Link to="/messenger">
                                <div className="ml-5 hover:text-yellow">
                                  Direct Message
                                </div>
                              </Link>
                              <Link to="/contact">
                                <div className="ml-5 hover:text-yellow">
                                  Report
                                </div>
                              </Link>
                              {post.studentId === currentUserStudentID && (
                                <button
                                  className="ml-5 hover:text-yellow text-lg text-red-400"
                                  onClick={() => {
                                    handleDelete(post.id);
                                  }}
                                >
                                  <BsFillTrashFill />
                                </button>
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumFeedIndividual;
