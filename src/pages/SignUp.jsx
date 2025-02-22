import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import Login from "./Login";

function SignUp({ openLogin, closeSignupModal }) {
  const handleLoginClick = () => {
    closeSignupModal(false);
    openLogin(true);
  };

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // Submit form logic
    }
  }, [formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm password is required!";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match!";
    }
    return errors;
  };

  return (
    <div className="bg-white w-full p-6">

      <form onSubmit={handleSubmit} className=" flex flex-col gap-4 ">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Sign Up</h2>
          <hr className="mt-2 border-gray-300" />
        </div>

        <input
          name="username"
          type="text"
          placeholder="Enter your username"
          className="w-full p-3 border rounded-lg mb-3"
          value={formValues.username}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Enter your email address"
          className="w-full p-3 border rounded-lg mb-3"
          value={formValues.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 border rounded-lg mb-3"
          value={formValues.password}
          onChange={handleChange}
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          className="w-full p-3 border rounded-lg mb-3"
          value={formValues.confirmPassword}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full h-10 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <div className="flex items-center my-6 gap-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button className="w-full h-10 flex items-center justify-center border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition">
          <i className="pi pi-google"></i> Sign up with Google
        </button>

        <div className="text-center mt-4">
          <span className="text-sm">Already have an account?</span>
          <button
            onClick={handleLoginClick}
            className="ml-2 text-blue-500 font-semibold hover:underline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
