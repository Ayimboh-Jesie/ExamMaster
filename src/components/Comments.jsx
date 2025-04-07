import React, {useEffect, useState} from 'react'
import {useAuth} from "../context/AuthContext.jsx"
import OneComment from "./OneComment.jsx";
import {useForm} from "react-hook-form";
import axiosInstance from "../config/axios.js";
import {toast} from "react-toastify";

function Comments({answer, onClose}) {

    const [isLoading, setIsLoading] =useState(false);
    const [comments, setComments] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" });

    const {user, token} = useAuth();

    const addComment = async(data) =>{
        setIsLoading(true);
        const commentData = {
            ...data,
            user: user._id,
        }
        console.log("comment data:", commentData);
        try {
            const res = await axiosInstance.post(`/answers/${answer._id}/comments`, commentData,{
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            if (res){
                toast.success("You commented an answer...");
                setComments(Array.isArray(res.data.comments) ? res.data.comments : []);
                await getComments();
            }

        }catch (err){
            if (err.stats === 401){
                toast.warning("Please login to comment answer");
                setIsLoading(false)
            }
            console.log("commenting error:", err.message);
        }finally {
            setIsLoading(false);
        }
    }

    const getComments = async() =>{
        try {
            const res = await axiosInstance.get(`/answers/${answer._id}/interactions`)

            if (res){
                setComments(Array.isArray(res.data.comments) ? res.data.comments : []);
                console.log("comments:", res.data.comments);
            }

        }catch (err){
            console.log("error fetching comments", err)
        }
    }


    useEffect(() => {
        getComments();
    }, []);

  return (
    <div className="bg-white p-6 rounded-lg max-w-full">

            <div className={`flex justify-start gap-8 items-center`}>
                <div className={`flex justify-center items-center w-12 h-12 rounded-full bg-green-300 uppercase text-xl text-white`}>{user?.name.substring(0,2)}</div>
                <div className={`w-3/5`}>
                    {errors.content && (
                        <p className="text-red-500 text-sm mt-1 text-center my-3">{errors.content.message}</p>
                    )}
                    <input {...register('content', {required: "comment content can't be empty"})} className={`w-full rounded-xl p-2 border border-gray-300 focus:outline-none`} placeholder={`Add a comment`}/>
                </div>
                <button
                    disabled={isLoading}
                    onClick={handleSubmit(addComment)}
                    className={`w-fit p-2 bg-blue-700 rounded-xl text-white px-3`}
                >
                    {isLoading ? "commenting" : "Add comment"}
                </button>
            </div>

      <h3 className="font-semibold mb-4 my-2 mt-6">Comments</h3>
        {Array.isArray(comments) && comments.length > 0 ? (
            comments.map(comment => (
                <OneComment key={comment._id} commemt={comment}/>
            ))
        ) : (
            <p className="text-gray-500">No comments yet</p>
        )}
      <div className={`flex justify-end`}>
          <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
          >
              Close
          </button>
      </div>
    </div>
  )
}

export default Comments