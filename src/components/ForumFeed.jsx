import React, { useState, useEffect, useContext } from "react";
import { ForumContext } from "../contexts/ForumContext";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { BsArrowDownSquare, BsArrowUpSquare } from "react-icons/bs";

const ForumFeed = () => {
  const { allForumData, setAllForumData } = useContext(ForumContext);
  const { userData, allUserData, setUserData } = useContext(UserContext);
  const allStudentData = allUserData.filter((user) => user.student);

  console.log(allForumData);
  // console.log(allStudentData);

  return (
    <div className="h-full rounded-lg">
      <div className="overflow-auto p-1 h-[600px]">
        {allForumData &&
          allForumData.map((forum) => (
            <div
              className="bg-white rounded-lg mt-4 h-48 pt-4 pl-5 grid grid-cols-1 gap-5"
              key={forum.id}
            >
              <Link to={`/forum/${forum.id}`}>
                <div className="bg-darkgrey rounded-lg text-yellow text-sm font-bold w-[600px] py-1 indent-4">
                  {forum.course.course_code} - {forum.course.course_name}
                </div>
                <div className="grid grid-flow-col grid-cols-8 justify-start mt-2">
                  <div className="text-darkgrey grid grid-cols-1 font-extrabold text-xl">
                    <BsArrowUpSquare className="hover:text-yellow hover:bg-darkgrey" />
                    <span className="text-sm">
                      100 <br /> Upvotes
                    </span>
                    <BsArrowDownSquare className="hover:text-yellow hover:bg-darkgrey" />
                  </div>
                  <div className="text-darkgrey text-lg col-span-7 font-extrabold">
                    <p>Latest Post:</p>
                    <p className="text-sm">
                      "{forum.posts[forum.posts.length - 1].content}"
                    </p>
                    <p className="text-sm font-normal">by </p>
                    <p className="text-sm font-normal">
                      {allUserData &&
                        `${
                          allStudentData.filter(
                            (user) =>
                              user.student.id ===
                              forum.posts[forum.posts.length - 1].studentId,
                          )[0].first_name
                        } ${
                          allStudentData.filter(
                            (user) =>
                              user.student.id ===
                              forum.posts[forum.posts.length - 1].studentId,
                          )[0].last_name
                        } on ${
                          allStudentData.filter(
                            (user) =>
                              user.student.id ===
                              forum.posts[forum.posts.length - 1].studentId,
                          )[0].createdAt
                        }`}
                    </p>
                  </div>
                </div>
                <div className="text-darkgrey text-[10px] font-bold">
                  Created on {forum.updatedAt}
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ForumFeed;
