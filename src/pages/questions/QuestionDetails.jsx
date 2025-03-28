import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axios";

const QuestionDetails = () => {
  const { questionId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestionDetails = async () => {
    try {
      const response = await axiosInstance.get(`/answers/${questionId}`);
      console.log("question with ans: ", response.data);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch question");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionDetails();
  }, [questionId]);

  return (
    <>
      <div className="px-12 my-12">
        <h2 className="text-2xl my-3">{data?.title}</h2>
        <div className="flex gap-12 text-sm text-gray-400">
          <p>Asked Today</p>
          <p>Modified Today</p>
          <p>Asked By {data?.askedBy?.username}</p>
        </div>
        <div className="my-4 border border-b-gray-400"></div>
        <div className="flex gap-8">
          <div className="">
            <p className="leading-18 text-justify">{data?.description}</p>
          </div>
        </div>
        <div className="my-4 mt-24">
          <p className="text-xl font-medium">
            {data?.answers?.length} Answers{" "}
          </p>
          <div className="mt-5">
            <div>
              {data?.answers?.length > 0 ? (
                data?.answers?.map((answer) => (
                  <div className="bg-white shadow-md rounded-lg p-4 my-5">
                    <div className="flex items-center gap-8 ">
                      <div className="w-12 h-12 flex justify-center items-center bg-blue-700 text-white rounded-full uppercase">
                        {answer.answeredBy.name.substring(0, 2)}
                      </div>
                      <p className="answer-author">{answer.answeredBy.name}</p>
                    </div>
                    <div className="flex gap-8 my-5">
                      <div key={answer._id} className="answer-card">
                        <p className="answer-text">{answer.detail}</p>
                      </div>
                    </div>
                    <div className="flex gap-12 items-center">
                      <div className="flex gap-6 items-center">
                        <div className="flex items-center justify-between px-5 gap-8 p-2 w-48 rounded-2xl bg-gray-200">
                          <p className="border-r-gray-500 w-5/6 border">
                            Upvote
                          </p>
                          <p>Down</p>
                        </div>
                        <p>comment</p>
                        <p>share</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No answers yet. Be the first to answer!</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex p-4">Your Answer</div>
          <textarea className="w-[70%] h-[50%] border p-8 m-4">
            Write your Answers here!
          </textarea>
          <div>
            <button className="bg-blue-500 rounded-lg text-white w-[20%] h-[12%] p-4 mb-24">
              Post Your Answer
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionDetails;
