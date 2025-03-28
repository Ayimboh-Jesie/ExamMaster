import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axiosInstance from "../../config/axios";

const QuestionDetails = () =>{
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
        setError(err.response?.data?.error || 'Failed to fetch question');
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchQuestionDetails();
    }, [questionId]);

    return(
        <>
            <div className="px-12 my-12">
                <h2 className="text-2xl my-3">
                    {data?.title}
                </h2>
                <div className="flex gap-12 text-sm text-gray-400">
                    <p>Asked Today</p>
                    <p>Modified Today</p>
                    <p>Asked By {data?.askedBy?.username}</p>
                </div>
                <div className="my-4 border border-b-gray-400">

                </div>
                <div className="flex gap-8">
                    <div className="">
                        <p className="leading-18 text-justify">
                            {data?.description}
                        </p>
                    </div>
                </div>
                <div className="my-4 mt-24">
                  <p className="text-xl font-medium">{data?.answers?.length} Answers </p>
                  <div className="mt-5">

                    <div>
                       {data?.answers?.length > 0 ? (
                          data?.answers?.map(answer => (
                            <div className="bg-white shadow-md rounded-lg p-4 my-5">
                              <div className="flex items-center gap-8 ">
                                  <div className="w-12 h-12 flex justify-center items-center bg-blue-700 text-white rounded-full uppercase">
                                    {answer.answeredBy.name.substring(0,2)}
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
                                    <p className="border-r-gray-500 w-5/6 border">Upvote</p>
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
{/*                  <div className="max-w-6xl ml-8 rounded-md p-4 mb-32"> */}
{/*                       Answer Header */}
{/*                       <div className="flex justify-between items-center border-b pb-2"> */}
{/*                         <div className="flex items-center gap-2"> */}
{/*                           <img */}
{/*                             src="https://via.placeholder.com/40" */}
{/*                             alt="User Avatar" */}
{/*                             className="w-10 h-10 rounded-full" */}
{/*                           /> */}
{/*                           <div> */}
{/*                             <p className="font-semibold text-gray-800">MBO</p> */}
{/*                             <p className="text-sm text-gray-500">31k ● 5 ● 52 ● 52</p> */}
{/*                           </div> */}
{/*                         </div> */}
{/*                         <p className="text-sm text-gray-500">answered Aug 29, 2011 at 13:02</p> */}
{/*                       </div> */}

{/*                       Answer Content */}
{/*                       <p className="mt-4 text-gray-700"> */}
{/*                         It OP is not fluent in Ruby, then it could be event hardcoded set of indexes, it */}
{/*                         doesn't matter. Tracking numbers are fixed-length strings. */}
{/*                       </p> */}

{/*                       Comments Section */}
{/*                       <div className="mt-4 border-t pt-2"> */}
{/*                         <div className="text-sm text-gray-600"> */}
{/*                           <span className="font-semibold text-blue-600">Benoit Garret</span>{" "} */}
{/*                           <span>Aug 29, 2011 at 13:08</span> */}
{/*                           <p className="mt-1"> */}
{/*                             Combine this with <code className="bg-gray-200 p-1 rounded">even?</code>,{" "} */}
{/*                             <code className="bg-gray-200 p-1 rounded">odd?</code>, and{" "} */}
{/*                             <code className="bg-gray-200 p-1 rounded">each_with_index</code> and it */}
{/*                             should be a piece of cake. */}
{/*                           </p> */}
{/*                         </div> */}

{/*                         <div className="text-sm text-gray-600 mt-2"> */}
{/*                           <span className="font-semibold text-blue-600">Shipgford</span>{" "} */}
{/*                           <span>Aug 29, 2011 at 14:57</span> */}
{/*                           <p className="mt-1"> */}
{/*                             @Benoit: I'm not necessarily "fluent" in Ruby, but I'd love to see how you'd */}
{/*                             use <code className="bg-gray-200 p-1 rounded">even?</code>,{" "} */}
{/*                             <code className="bg-gray-200 p-1 rounded">odd?</code>, and{" "} */}
{/*                             <code className="bg-gray-200 p-1 rounded">each_with_index</code>. */}
{/*                           </p> */}
{/*                         </div> */}

{/*                         <div className="text-sm text-gray-600 mt-2"> */}
{/*                           <span className="font-semibold text-blue-600">Benoit Garret</span>{" "} */}
{/*                           <span>Aug 29, 2011 at 15:44</span> */}
{/*                           <p className="mt-1"> */}
{/*                             @Shipgford <code className="bg-gray-200 p-1 rounded">index.odd?</code>,{" "} */}
{/*                             <code className="bg-gray-200 p-1 rounded">index.even?</code>, and{" "} */}
{/*                             <code className="bg-gray-200 p-1 rounded"> */}
{/*                               number_string.chars.each_with_index */}
{/*                             </code>{" "} */}
{/*                             <code className="bg-gray-200 p-1 rounded"> */}
{/*                               {"{ char, index | ... your code goes here ... }"} */}
{/*                             </code> */}
{/*                             . Is that what you had in mind? */}
{/*                           </p> */}
{/*                         </div> */}
{/*                       </div> */}

{/*                       Add Comment */}
{/*                       <div className="mt-4"> */}
{/*                         <input */}
{/*                           type="text" */}
{/*                           placeholder="Add a comment" */}
{/*                           className="w-full border p-2 rounded-md text-sm" */}
{/*                         /> */}
{/*                       </div> */}
{/*                     </div> */}
            </div>
        </>
    );
}

export default QuestionDetails;