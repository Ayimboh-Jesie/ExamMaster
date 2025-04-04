import React from "react";
import {Link} from "react-router-dom";

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
            <div className={`${question.answers.length > 0  ? "text-green-700" : "text-black"} text-md`}>{question.answers.length} Answers</div>
          <div className="mt-4 w-5/6">
            <Link to={`/question/${question._id}`} className="font-semibold text-blue-600 hover:underline cursor-pointer">
              {truncateText(question?.title, 50)}
            </Link>
            <p className="text-gray-700 mt-2 text-left text-base/6">
            {truncateText(question?.description, 50)}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-6 text-gray-500 text-sm mt-8">
              <div className=" flex gap-3 w-full text-black">
                <button className="bg-blue-100 px-4 py-1 rounded-md w-full">
                  {question?.year}
                </button>
                <button className="bg-blue-100 px-4 py-1 rounded-md w-full">
                  {question?.examiner.substring(0,10)}
                </button>
                <button className="bg-blue-100 px-4 py-1 rounded-md w-full">
                  {question?.exam_type}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  <i className="pi pi-user"></i>
                </span>
                <span>{question?.askedBy?.name}</span>
                <p className="text-gray-400">{question?.create_At}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Question;
