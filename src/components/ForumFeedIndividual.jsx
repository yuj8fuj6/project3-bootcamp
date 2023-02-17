import React, { useState, useEffect, useContext } from "react";
import { ForumContext } from "../contexts/ForumContext";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowDownSquare, BsArrowUpSquare } from "react-icons/bs";

const ForumFeedIndividual = () => {
  const param = useParams();

  const allForumData = useContext(ForumContext);
  const { userData, allUserData } = useContext(UserContext);
  const allStudentData = allUserData.filter((user) => user.student);
  const forum = allForumData.filter((forum) => forum.id === param.id)[0];

  // console.log(allForumData);
  // console.log(forum);
  // console.log(allStudentData);

  return (
    <div className="h-full rounded-lg">
      <div className="p-1 h-[550px]">
        {allForumData && (
          <div className="bg-white rounded-lg mt-2 pt-2 pl-5 grid grid-cols-1 h-full content-start">
            <div className="bg-darkgrey rounded-lg text-yellow text-sm font-bold w-[600px] h-fit py-1 indent-4 ">
              {forum.course.course_code} - {forum.course.course_name}
            </div>
            <div className="grid grid-flow-col grid-cols-8 justify-start mt-2">
              <div className="text-darkgrey grid grid-cols-1 font-extrabold text-xl h-24">
                <BsArrowUpSquare className="hover:text-yellow hover:bg-darkgrey" />
                <span className="text-sm">
                  100 <br /> Upvotes
                </span>
                <BsArrowDownSquare className="hover:text-yellow hover:bg-darkgrey" />
              </div>
              <div className="text-darkgrey text-lg col-span-7 font-extrabold">
                <div className="text-darkgrey text-[10px] font-bold">
                  Created on {forum.updatedAt}
                </div>
                <div className="overflow-auto h-3/4 border-darkgrey border-1 mr-4 rounded-xl p-4 bg-slate-100">
                  {allForumData &&
                    forum.posts.map((post) => (
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
                                  (user) => user.student.id === post.studentId,
                                )[0].updatedAt
                              }
                            </span>
                          </p>
                          <p className="font-normal text-xs mt-1">
                            {post.content}
                          </p>
                          <p className="mt-2 flex flex-row justify-start gap-2 text-xs">
                            <BsArrowUpSquare className="hover:text-yellow hover:bg-darkgrey" />
                            <div>100</div>
                            <BsArrowDownSquare className="hover:text-yellow hover:bg-darkgrey" />
                            <div className="ml-5">Direct Message</div>
                            <div className="ml-5">Report</div>
                          </p>
                        </div>
                      </div>
                    ))}
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
