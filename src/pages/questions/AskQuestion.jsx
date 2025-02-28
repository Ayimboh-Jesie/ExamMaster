import React from "react";
import { useForm } from "react-hook-form";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import axiosInstance from "../../config/axios";

function AskQuestion({ onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   console.log("Submitted Data:", data);
  //   alert("Question Submitted Successfully!");
    // reset();
  // };
  const onSubmit = async (data) => {
    // e.preventDefault();
    try {
      const response = await axiosInstance.post(`Questions/`, data);
      // setIsLoading(true);
      console.log("asked question: ", response.data);
      if (response) {
        reset();
      }
      // setIsLoading(false);
      console.log("submitted question:", response )
    } catch (error) {
      console.log("unable to submit question",error)
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 h-fit w-full py-8 flex flex-col items-center ">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Ask a Question</h1>
          <p className="text-gray-600 mt-2">Get answers to all your questions.</p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-[90%] rounded-lg p-6 space-y-6 shadow-md"
        >
          <div className="flex flex-row gap-3 w-full">
            <div className="w-1/2">
              <select
                {...register("fieldOfStudy", { required: "Field of study is required" })}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Field of Study</option>
                {["Business and Management", "Communication", "Home Eco/Tourism/Hotel", "Engineering Technology", "Information/Com-Tech", "Medical and Biometric sciences", "Education", "Agropastoral and Food Sciences"].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              {errors.fieldOfStudy && <p className="text-red-500 text-sm">{errors.fieldOfStudy.message}</p>}
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
                {...register("examType", { required: "Exam type is required" })}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Exam Type</option>
                <optgroup label="Semester">
                  <option value="First Semester">First Semester</option>
                  <option value="Second Semester">Second Semester</option>
                </optgroup>
                <optgroup label="Exam Type">
                  <option value="Exam">Exam</option>
                  <option value="CA">CA</option>
                  <option value="Resit">Resit</option>
                </optgroup>
              </select>
              {errors.examType && <p className="text-red-500 text-sm">{errors.examType.message}</p>}
            </div>

            <div className="w-1/2">
              <select
                {...register("teacher", { required: "Teacher selection is required" })}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Teacher</option>
                {["Mr. Tantoh", "Mr. Deyou", "Mr. Kimbi", "Mr. Kuipo", "Mr. Ateh"].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              {errors.teacher && <p className="text-red-500 text-sm">{errors.teacher.message}</p>}
            </div>
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
                {...register("teacher", { required: "file selection is required" })}
                >
            {/* <FaUpload size={24} className="text-gray-500"/> */}
            <i className="pi pi-upload"></i>
            <input type="file" hidden />
            {errors.teacher && <p className="text-red-500 text-sm">{errors.teacher.message}</p>}
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
              type="submit"
              className="w-30 h-10 bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700"
            >
              Submit Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AskQuestion;
