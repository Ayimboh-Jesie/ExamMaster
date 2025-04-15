import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axios";
import {useForm} from "react-hook-form";
import {useAuth} from "../../context/AuthContext";
import { toast } from "react-toastify";
import Comments from "../../components/Comments.jsx";

const QuestionDetails = () => {
  const { questionId } = useParams();
  const [data, setData] = useState(null);
  const [newAnswer, setNewAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

  const {token, user, isAuthenticated} = useAuth();

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
            await fetchQuestionDetails();
            toast.success("You have answered a question successfully!");
       } catch(err){
             console.log("Error answering question", err.response?.data || err.message);
             throw err;
             toast.error("Something went wrong please try again");
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

    const toggleComments = (answerId) => {
        if (selectedAnswerId === answerId) {
            setSelectedAnswerId(null);
        } else {
            setSelectedAnswerId(answerId);
            setSelectedAnswer(data.answers.find(a => a._id === answerId));
        }
    };

   useEffect(() => {
    fetchQuestionDetails();
  }, [questionId]);

const handleLikeAction = async (answerId, action) => {
  try {
    const endpoint = action === 'like'
      ? `/answers/${answerId}/like`
      : `/answers/${answerId}/like`;

      console.log("token in like:", token);

    const method = action === 'like' ? 'post' : 'delete';

    const response = await axiosInstance[method](endpoint, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setData(prevData => ({
      ...prevData,
      answers: prevData.answers.map(answer => {
        if (answer._id === answerId) {
          const currentLikes = Array.isArray(answer.likes) ? answer.likes : [];

          return {
            ...answer,
            likes: action === 'like'
              ? [...currentLikes, response.data] // Add new like
              : currentLikes.filter(like =>
                  (like.user?._id || like.user).toString() !== user._id.toString()
                )
          };
        }
        return answer;
      })
    }));

    toast.success(action === 'like' ? "Answer liked!" : "Answer unliked!");
  } catch (error) {
    console.error("Error:", error);
    if (error.response?.status === 400) {
      toast.warning(action === 'like'
        ? "You already liked this answer!"
        : "Like not found");
    } else {
      toast.error("Action failed. Please try again.");
    }
  }
};

  return (
    <>
      {loading ? (
          <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
              <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
              <p> Loading...</p>
          </div>
          ) : (
        <div className="px-12 my-12">
            <h2 className="text-2xl my-3">{data?.title}</h2>
            <div className="flex gap-12 text-sm text-gray-400">
              <p>Asked on  {new Date(data?.createdAt).toLocaleDateString()}</p>
              <p>Asked By {data?.askedBy?.name}</p>
            </div>
            <div className="my-4 border border-b-gray-400"></div>
            <div>
                <img
                    src={`http://localhost:3000/${data.file}`}
                    alt={`img`}
                    className={`w-1/3 h-1/3`}
                />
            </div>
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
                    data?.answers?.map((answer) => {
                      return(
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
                          <div className="flex gap-12 items-center">
                            <div className="flex items-center justify-between px-5 gap-8 p-2 w-48">
                                <button
                                  onClick={() => handleLikeAction(answer._id, 'like')}
                                  className="px-2 text-gray-400 hover:text-gray-700"
                                >
                                  <i className="pi pi-thumbs-up text-xl"></i>
                                </button>
                                    <span className="ml-2">{answer.likes?.length || 0}</span>

                                {/* Unlike Button - Always enabled */}
                                <button
                                  onClick={() => handleLikeAction(answer._id, 'unlike')}
                                  className="px-2  text-gray-400 hover:text-gray-700"
                                >
                                   <i className="pi pi-thumbs-down text-xl"></i>
                                </button>
                            </div>
                            <button onClick={() =>{toggleComments(answer._id)} }>
                                <span>{answer?.comments?.length}</span>
                                <i className="pi pi-comments text-xl text-gray-400 hover:text-gray-700 ml-2"></i>
                            </button>
                            <i className="pi pi-share-alt text-xl text-gray-400 hover:text-gray-700"></i>
                          </div>
                        </div>
                          {selectedAnswerId === answer._id && (
                              <Comments
                                  answer={answer}
                                  onClose={() => setSelectedAnswerId(null)}
                              />
                          )}
                      </div>
                      )
                    })
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

                 </textarea>
                <button
                    onClick={() => {
                        if (isAuthenticated()) {
                            handleSubmit(answerQuestion)();
                        } else {
                            toast.warning("Please log in to answer the question");
                        }
                    }}
                    className="bg-blue-500 rounded-lg text-white w-[20%] h-[12%] p-3 mb-24"
                >
                  Post Your Answer
                </button>
            </div>
          </div>
      )}
    </>
  );
};

export default QuestionDetails;
