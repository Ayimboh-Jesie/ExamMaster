import React from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

function AskQuestion() {
  return (
    <div>
      <div className=" h-screen">
        <Navbar />
        <div className="flex">
          <aside className="w-2/12">
            <Sidebar />
          </aside>
          <div
            style={{ padding: "64px" }}
            className="max-w-4xl mx-auto px-4  w-full py-8 flex flex-col items-center"
          >
            <header className="mb-6">
              <h1 className="text-3xl font-semibold text-gray-900 text-center">
                Ask a Question
              </h1>
              <p className="text-gray-600 mt-2 text-center">
                Get answers to all your questions.
              </p>
            </header>
            <br />

            <form className="bg-white borderh-[70%] w-[90%] flex flex-col rounded-lg p-6 space-y-6 shadow-md">
              <div className="space-y-4">
                <div className="flex flex-col gap-3">
                  <select
                    style={{ padding: "12px", margin: "12px" }}
                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] p-2.5"
                  >
                    <option className="text-gray-900" value="Option1">
                      Field of Study
                    </option>
                    <option className="text-gray-900" value="Option1">
                      Business and Management
                    </option>
                    <option className="text-gray-900" value="Option1">
                      Communication
                    </option>
                    <option className="text-gray-900" value="Option1">
                      Home Eco/Tourism/Hotel
                    </option>
                    <option className="text-gray-900" value="Option1">
                      Engineering Technology
                    </option>
                    <option className="text-gray-900" value="Option1">
                      Information/Com-Tech
                    </option>
                    <option className="text-gray-900" value="Option1">
                      Medical and Biometric Sciences
                    </option>
                    <option className="text-gray-900" value="Option1">
                      Education
                    </option>
                    <option className="text-gray-900" value="Option1">
                      Agropastoral and Food Sciences
                    </option>
                  </select>

                  <select
                    style={{ padding: "12px", margin: "12px" }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] p-2.5"
                  >
                    <option className="text-gray-900" value="Option1">
                      Year
                    </option>
                    <option className="text-gray-900" value="Option1">
                      2024
                    </option>
                    <option className="text-gray-900" value="Option1">
                      2023
                    </option>
                    <option className="text-gray-900" value="Option1">
                      2022
                    </option>
                  </select>

                  <select
                    style={{ padding: "12px", margin: "12px" }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] p-2.5"
                  >
                    <option className="text-gray-900" value="Option1">
                      Exam Type
                    </option>
                    <optgroup label="Semester Options">
                      <option className="text-gray-900" value="First Semester">
                        First Semester
                      </option>
                      <option className="text-gray-900" value="Second Semester">
                        Second Semester
                      </option>
                    </optgroup>
                    <optgroup label="Exam Options">
                      <option className="text-gray-900" value="Exam">
                        Exam
                      </option>
                      <option className="text-gray-900" value="CA">
                        CA
                      </option>
                      <option className="text-gray-900" value="Resit">
                        Resit
                      </option>
                    </optgroup>
                  </select>

                  <select
                    style={{ padding: "12px", margin: "12px" }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] p-2.5"
                  >
                    <option className="text-gray-900" value="Option1">
                      Teacher
                    </option>
                    <option className="text-gray-900" value="Option1">
                      Mr. Ateh
                    </option>
                    <option className="text-gray-900" value="Option1">
                      Mr. Deyou
                    </option>
                    <option className="text-gray-900" value="Option1">
                      Mr. Tantoh
                    </option>
                    <option className="text-gray-900" value="Option1">
                      Mr. Kuipo
                    </option>
                    <option className="text-gray-900" value="Option1">
                      Mr. Kimbi
                    </option>
                  </select>

                  <div>
                    <p className="mt-2 text-center">
                      If you have the Quiz as a file:
                    </p>
                    <label
                      htmlFor="description"
                      className=" text-center self-start block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      style={{ padding: "12px", margin: "12px" }}
                      id="description"
                      name="description"
                      rows="6"
                      className="mt-1 block w-[90%] border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Explain in detail what you are trying to achieve or what issue you are facing."
                    ></textarea>
                  </div>

                  <div>
                    <label
                      htmlFor="file"
                      className="self-start block text-sm font-medium text-gray-700"
                    >
                      File Upload
                    </label>
                  </div>
                </div>
                <br />
              </div>

              <div
                style={{ padding: "12px", margin: "12px" }}
                className="flex justify-between mt-6 space-x-4"
              >
                <button
                  onClick={onclose}
                  type="button"
                  className=" w-20 h-10 bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-30 h-10 bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Question
                </button>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AskQuestion;
