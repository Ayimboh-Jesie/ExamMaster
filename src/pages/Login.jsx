import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../config/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ openSignUp, closeLoginModal }) {
  const handleSignUpClick = () => {
    closeLoginModal(false);
    openSignUp(true);
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.get("Users/");
      const users = res.data;

      const foundUser = users.find((user) => user.email === data.email && user.password === data.password);
      if (foundUser) {
        console.log("user found:", foundUser);
        toast.success("Login Successful")
        // window.location.href = '/';
        navigate('/');
      }else{
        toast.error("email or password are incorrect.")
      }
    } catch (error) {
      console.log("Login error", error);
    }
  };

  return (
    <div className="flex flex-col gap-12 p-6 rounded-lg w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Sign In</h2>
          <hr className="mt-2 border-gray-300" />
        </div>

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
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full h-10 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        <div className="flex items-center my-6 gap-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button className="w-full h-10 flex items-center justify-center border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition">
          <i className="pi pi-google"></i> Sign in with Google
        </button>

        <div className="text-center mt-4">
          <span className="text-sm">Not registered yet?</span>
          <button
            onClick={handleSignUpClick}
            className="ml-2 text-blue-500 font-semibold hover:underline"
          >
            Create an Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
