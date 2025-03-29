import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axios";
import {useForm} from "react-hook-form";
import {useAuth} from "../../context/AuthContext";

const QuestionDetails = () => {
  const { questionId } = useParams();
  const [data, setData] = useState(null);
  const [newAnswer, setNewAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {token, user} = useAuth();

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

   const answerQuestion = async(data) => {
       console.log("answer data: ", data);
       setIsLoading(true);
       const answerData = {
            ...data,
            questionId: questionId,
            answeredBy: user._id
       }
       try{
            const response = await axiosInstance.post(`/answers`, answerData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log("new answer response", response);
            setNewAnswer(response.data);
            setIsLoading(false);
            reset();
            fetchQuestionDetails();
       } catch(err){
             console.log("Error answering question", err.response?.data || err.message);
             throw err;
       }finally{
            setIsLoading(false);
       }
   }

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
      {loading ? (<p className="w-full h-full flex justify-center items-center text-2xl text-blue-700">Fetching data...</p>) : (
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
                      <div key={answer._id} className="bg-white shadow-md rounded-lg p-4 my-5">
                        <div className="flex items-center gap-8 ">
                          <div className="w-12 h-12 flex justify-center items-center bg-blue-700 text-white rounded-full uppercase">
                            {answer.answeredBy.name.substring(0, 2)}
                          </div>
                          <p className="answer-author">{answer.answeredBy.name}</p>
                        </div>
                        <div className="flex gap-8 my-5 py-4">
                          <div className="flex flex-col gap-6">
                            <p className="answer-text">{answer.title}</p>
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
            <div className="flex flex-col justify-start w-full">
              <div className=" p-4">Your Answer</div>
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                 <textarea
                   placeholder="Write your answer here"
                   {...register("title", {required: "answer title can't be empty"})}
                   className="w-[70%] h-[50%] border p-8 my-4">

                 </textarea> {errors.detail && <p className="text-red-500 text-sm">{errors.detail.message}</p>}
                  <textarea
                    placeholder="give a better description to your answer"
                    {...register("detail", {required: "answer detail can't be empty"})}
                    className="w-[70%] h-[50%] border p-8 my-4">

                  </textarea>
                <button onClick={handleSubmit(answerQuestion)} className="bg-blue-500 rounded-lg text-white w-[20%] h-[12%] p-3 mb-24">
                  Post Your Answer
                </button>
            </div>
          </div>
      )}

    </>
  );
};

export default QuestionDetails;
