import React from "react";

function Question({ question }) {
    const truncateText = (text, maxLength) => {
        if (text?.length <= maxLength) {
            return text;
        }
        return text?.substring(0, maxLength) + "...";
    };
            console.log("new questions:", question);
  return (
    <div className="w-full">
      <div className="border rounded-lg p-4 mt-3 shadow-md w-full bg-white">
        <div className="flex flex-col justify-between gap-3 items-start text-sm">
          <div className="flex gap-12 text-center w-32">
            <p className="text-black">{question?.vote} votes</p>
            <p className="text-black">{question?.answer} answer</p>
            <p className="text-black">{question?.views} views</p>
          </div>
          <div className="mt-4 w-5/6">
            <p className="font-semibold text-blue-600 hover:underline cursor-pointer">
              {truncateText(question?.title, 50)}
            </p>
            <p className="text-gray-700 mt-2 text-left text-base/6">
            {truncateText(question?.description, 50)}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-6 text-gray-500 text-sm">
              <div className=" flex gap-2">
                <button className="bg-gray-200 px-2 py-1 rounded-md mr-2">
                  share
                </button>
                <button className="bg-gray-200 px-2 py-1 rounded-md">
                  upvote
                </button>
                <button className="bg-gray-200 px-2 py-1 rounded-md">
                  downvote
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  <i className="pi pi-user"></i>
                </span>
                <span>{question?.user}</span>
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
