import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axios";
import { useAuth } from "../../context/AuthContext";
import {toast} from "react-toastify";
import {useQuestions} from "../../context/QuestionsContext";

function AskQuestion({ onClose }) {

    const {getQuestions} = useQuestions();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError(null);

      const questionData = {
        ...data,
        askedBy: {
          _id: user._id,
          name: user.name
        }
      };
        console.log("question data: ", questionData);

//         return;

      const response = await axiosInstance.post("/questions", questionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      console.log("Question submitted:", response.data);
      reset();
      if (onClose) onClose();
      getQuestions();

    } catch (error) {
        if(error.status === 401){
            toast.warning("Please login to ask a question.");
        }
      console.error("Error submitting question:", error);
      setError(error.response?.data?.message || "Failed to submit question");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">Ask a Question</h1>
        <p className="text-gray-600 mt-2">Get answers to all your questions.</p>
      </header>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <select
              {...register("study_field", { required: "Field of study is required" })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Field of Study</option>
              {["Business and Management", "Communication", "Home Eco/Tourism/Hotel",
                "Engineering Technology", "Information/Com-Tech",
                "Medical and Biometric sciences", "Education",
                "Agropastoral and Food Sciences"].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            {errors.study_field && (
              <p className="text-red-500 text-sm mt-1">{errors.study_field.message}</p>
            )}
          </div>

          <div>
            <select
              {...register("year", { required: "Year is required" })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Year</option>
              {["2025", "2024", "2023", "2022", "2021", "2020"].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            {errors.year && (
              <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <select
              {...register("exam_type", { required: "Exam type is required" })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Exam Type</option>
              <optgroup label="Semester">
                <option value="First semester">First Semester</option>
                <option value="Second semester">Second Semester</option>
              </optgroup>
              <optgroup label="Exam Type">
                <option value="Exam">Exam</option>
                <option value="CA">CA</option>
                <option value="Resit">Resit</option>
              </optgroup>
            </select>
            {errors.exam_type && (
              <p className="text-red-500 text-sm mt-1">{errors.exam_type.message}</p>
            )}
          </div>

          <div>
            <select
              {...register("examiner", { required: "Teacher selection is required" })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Teacher</option>
              {["Mr. Tantoh", "Mr. Deyou", "Mr. Kimbi", "Mr. Kuipo", "Mr. Ateh"].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            {errors.examiner && (
              <p className="text-red-500 text-sm mt-1">{errors.examiner.message}</p>
            )}
          </div>
        </div>

        <div>
          <input
            placeholder="What is your question?"
            className="w-full rounded-lg p-3 border focus:ring-2 focus:ring-blue-500"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 20,
                message: "Title should be at least 20 characters"
              },
              maxLength: {
                value: 100,
                message: "Title should not exceed 100 characters"
              }
            })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 50,
                message: "Description must be at least 50 characters"
              }
            })}
            rows="5"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Explain your question in detail."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={() => {
              reset();
              if (onClose) onClose();
            }}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || !isValid}
            className={`px-6 py-2 rounded-md text-white transition ${
              isLoading || !isValid
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Submitting..." : "Submit Question"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AskQuestion;