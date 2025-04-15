import React from "react";
import {Link} from "react-router-dom";
import FileDisplay from "./FilleDisplay.jsx";

// eslint-disable-next-line react/prop-types
function Question({ question }) {
    const truncateText = (text, maxLength) => {
        if (text?.length <= maxLength) {
            return text;
        }
        return text?.substring(0, maxLength) + "...";
    };
  return (
    <div className="w-full">
      <div className="border rounded-lg p-4 mt-3 shadow-md w-full bg-white">
        <div className="flex flex-col justify-between gap-3 items-start text-sm">
            <div className={`w-full flex justify-between items-center`}>
                {/* eslint-disable-next-line react/prop-types */}
                <div className={`${question.answers.length > 0  ? "text-green-700" : "text-black"} text-md`}>{question.answers.length} Answers</div>

            </div>
          <div className="mt-4 w-full">
              <FileDisplay filePath={question.file}/>
            <Link to={`/question/${question._id}`} className="font-semibold text-blue-600 hover:underline cursor-pointer">
              {truncateText(question?.title, 50)}
            </Link>
            <p className="text-gray-700 mt-2 text-left text-base/6">
            {truncateText(question?.description, 50)}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-6 text-gray-500 text-sm mt-8">
              <div className=" flex gap-3 w-full text-black">
                <button className="bg-blue-100 px-4 py-1 rounded-md w-full">
                    {/* eslint-disable-next-line react/prop-types */}
                  {question?.year}
                </button>
                <button className="bg-blue-100 px-4 py-1 rounded-md w-full">
                  {question?.examiner.substring(0,10)}
                </button>
                <button className="bg-blue-100 px-4 py-1 rounded-md w-full">
                  {question?.exam_type}
                </button>
              </div>
              <div className="flex justify-between  w-full items-center gap-2">
                  <div>
                      <span>Asked on:</span>
                      <p className={`text-md text-gray-400`}>{question.createdAt ? new Date(question.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                      }).replace(/ /g, ' ') : 'No date available'}</p>
                  </div>
                <div>
                    <span>By:</span>
                 <div>
                    <span>
                      <i className="pi pi-user mr-2"></i>
                    </span>
                    <span>{question?.askedBy?.name}</span>
                 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Question;
