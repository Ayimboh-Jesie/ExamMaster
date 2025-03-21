import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../config/axios";
import {toast} from 'react-toastify';
import {ModalContext} from "../context/ModalContext";

function SignUp() {

    const {closeSignUpModal, setIsLoginOpen} = useContext(ModalContext);
  const [isLoading, setIsLoading] = useState(false);
  const handleLoginClick = () => {
      console.log("opening login form and closing signup form");
    setIsLoginOpen(true);
    closeSignUpModal(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(`users/register`, data);
      setIsLoading(true);
      if (response) {
        reset();
        handleLoginClick();
        toast.success("account created successfully");
      }
      setIsLoading(false);
      console.log("registered user:", response )
    } catch (error) {
      console.log("unable to create user",error);
      toast.error("something went wrong while creating your account", error);
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white w-full p-6">
      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-2 ">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Sign Up</h2>
          <hr className="mt-2 border-gray-300" />
        </div>
        <input
          name="name"
          type="text"
          placeholder="Enter your username"
          className="w-full p-3 border rounded-lg mb-3"
          {...register("name", {
            required: "username is required!",
          })}
        //  className="w-full p-3 border border-gray-300 rounded-lg"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

        <div>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                message: "Invalid email format!",
              },
            })}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required!",
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters",
              },
              maxLength: {
                value: 10,
                message: "Password cannot exceed 10 characters",
              },
            })}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          className="w-full p-3 border rounded-lg mb-3"
          {...register("confirmPassword", {
            required: "confirmPassword is required!",
            validate: (value) =>
              value === watch("password") || "Passwords do not match!",
          })}
        />
        {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}

        <button
          disabled={isLoading}
          type="submit"
          className={`w-full h-10 text-white py-3 rounded-lg transition ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          }`}
        >
          {isLoading ? "Loading...": "Sign Up"}
        </button>

        <div className="flex items-center my-6 gap-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button className="w-full h-10 flex items-center justify-center border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition">
          <i className="pi pi-google"></i> Sign up with Google
        </button>

        <div className="flex justify-center items-center text-center mt-4">
          <span className="text-sm">Already have an account?</span>
          <div
            onClick={handleLoginClick}
            className="ml-2 text-blue-500 font-semibold hover:underline"
          >
            Login
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
