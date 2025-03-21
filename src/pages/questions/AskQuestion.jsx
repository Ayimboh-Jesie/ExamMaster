import React, {useState} from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axios";
import {useAuth} from "../../context/AuthContext";

function AskQuestion({ onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const {token, user} = useAuth();

  const onSubmit = async (data) => {
      console.log("token from useAuth", token);
      console.log("question data: ", data);
      console.log("auth user id: ", user._id);
    try {
        setIsLoading(true)
        const questionData = {
          ...data,
          askedBy: user._id,
        };
      const response = await axiosInstance.post(`Questions/`, questionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }});

      console.log("asked question: ", response.data);
      if (response) {
          setIsLoading(false)
        reset();
        onClose();
        window.location.href = "/";
      }
      console.log("submitted question:", response )
    } catch (error) {
      console.log("unable to submit question",error)
    }finally{ setIsLoading(false);}
  };

  const [filePreview, setFilePreview] = React.useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="max-w-4xl px-4 h-fit w-full py-8 flex flex-col items-center ">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Ask a Question</h1>
          <p className="text-gray-600 mt-2">Get answers to all your questions.</p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white space-y-3"
        >
          <div className="flex flex-row gap-3 w-full">
            <div className="w-1/2">
              <select
                {...register("study_field", { required: "Field of study is required" })}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Field of Study</option>
                {["Business and Management", "Communication", "Home Eco/Tourism/Hotel", "Engineering Technology", "Information/Com-Tech", "Medical and Biometric sciences", "Education", "Agropastoral and Food Sciences"].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              {errors.study_field && <p className="text-red-500 text-sm">{errors.study_field.message}</p>}
            </div>

            <div className="w-1/2">
              <select
                {...register("year", { required: "Year is required" })}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Year</option>
                {["2025", "2024", "2023", "2022", "2021", "2020"].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
            </div>
          </div>

          <div className="flex flex-row gap-3 w-full">
            <div className="w-1/2">
              <select
                {...register("exam_type", { required: "Exam type is required" })}
                className="w-full p-3 border rounded-lg"
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
              {errors.exam_type && <p className="text-red-500 text-sm">{errors.exam_type.message}</p>}
            </div>

            <div className="w-1/2">
              <select
                {...register("examiner", { required: "Teacher selection is required" })}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Teacher</option>
                {["Mr. Tantoh", "Mr. Deyou", "Mr. Kimbi", "Mr. Kuipo", "Mr. Ateh"].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              {errors.examiner && <p className="text-red-500 text-sm">{errors.examiner.message}</p>}
            </div>
          </div>

          <div>
            <input placeholder="what is your question" className="w-full rounded-lg p-3 border"
                {...register("title", {
                    required: "Title can't be empty",
                    minLength: { value:20, message:"title should not be more than 20 characters"}
                })}
            />
            {errors.title && <p className="text-red-500 text-sm"> {errors.title}</p>}
          </div>

          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: { value: 10, message: "Description must be at least 10 characters" },
            })}
            rows="5"
            className="w-full p-3 border rounded-lg"
            placeholder="Explain your question in detail."
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

          <label className="w-full h-[100px] flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50" 
                {...register("file")}
                >
            <i className="pi pi-upload"></i>
            <input type="file"  />
          </label>

          <div className="flex justify-between mt-6 space-x-4">
            <button
              type="button"
              onClick={() => {
                reset();
                if (onClose) onClose();
              }}
              className="w-20 h-10 bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700"
            >
              Cancel
            </button>

            <button
              disabled={isLoading}
              type="submit"
              className="w-30 h-10 bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700"
            >
              {isLoading ? "Loading..." : "Submit Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AskQuestion;
