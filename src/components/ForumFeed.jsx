import React, { useState, useEffect, useContext } from "react";
import { ForumContext } from "../contexts/ForumContext";
import { UserContext } from "../contexts/UserContext";

const ForumFeed = () => {
  const allForumData = useContext(ForumContext);
  const { userData, allUserData } = useContext(UserContext);
  const allStudentData = allUserData.filter((user) => user.student)

  console.log(allForumData);
  console.log(allStudentData);

  return (
    <div className="h-full rounded-lg">
      <div className="overflow-auto p-1 h-[550px]">
        {allForumData &&
          allForumData.map((forum, index) => (
            <div className="bg-white rounded-lg mt-4 h-48 pt-4 pl-5 grid grid-cols-1 gap-5">
              <div className="bg-darkgrey rounded-lg text-yellow text-sm font-bold w-[600px] py-1 indent-4">
                {forum.course.course_code} - {forum.course.course_name}
              </div>
              <div className="grid grid-flow-col grid-cols-8 justify-start">
                <div className="text-darkgrey">Post Upvote</div>
                <div className="text-darkgrey text-lg col-span-7 font-extrabold">
                  <p>Latest Post:</p>
                  <p className="text-sm">
                    "{forum.posts[forum.posts.length - 1].content}"
                  </p>
                  <p className="text-sm font-normal">by </p>
                  <p className="text-sm font-normal">
                    {allUserData && 
                      allStudentData.filter(
                        (user) =>
                          user.student.id ===
                          forum.posts[forum.posts.length - 1].studentId,
                      )[0].first_name}
                  </p>
                </div>
              </div>
              <div className="text-darkgrey text-[10px] font-bold">
                Created on {forum.updatedAt}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ForumFeed;
