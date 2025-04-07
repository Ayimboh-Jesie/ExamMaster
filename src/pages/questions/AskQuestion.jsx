import React, { useState, useRef } from "react";
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

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (file) {
        formData.append('file', file);
      }

      formData.append('askedBy', user._id);

      console.log("question data:", formData);

      const response = await axiosInstance.post("/questions", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
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
            <select
                {...register("course", { required: "Course selection is required" })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select course</option>
              {["digital electronice", "Analysis", "Statistics", "C programming", "Database"].map((item) => (
                  <option key={item} value={item}>{item}</option>
              ))}
            </select>
            {errors.course && (
                <p className="text-red-500 text-sm mt-1">{errors.course.message}</p>
            )}
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

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attach File (Optional)
          </label>

          {/* Hidden file input */}
          <input
              type="file"
              id="file-upload"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx" // Limit file types if needed
          />

          {/* Custom upload button */}
          <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Choose File
          </label>
          <span className="ml-2 text-sm text-gray-500">
    {file ? file.name : 'No file chosen'}
  </span>

          {/* File preview */}
          {preview && (
              <div className="mt-4 relative">
                {file.type.startsWith('image/') ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-32 w-32 object-cover rounded-md"
                    />
                ) : (
                    <div className="flex items-center p-3 bg-gray-100 rounded-md">
                      <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="ml-2">{file.name}</span>
                    </div>
                )}
                <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
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