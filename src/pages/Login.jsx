import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

function Login({ openSignUp, closeLoginModal }) {
  const handleSignUpClick = () => {
    closeLoginModal(false);
    openSignUp(true);
  };

  const initialValues = { email: "", password: "" };
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
      // Handle successful login (e.g., API call)
    }
  }, [formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
    return errors;
  };

  return (
    <div className="flex flex-col gap-12 p-6 rounded-lg w-full">
      {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Login successful</div>
      ) : (
        <pre>{JSON.stringify(formValues, null, 2)}</pre>
      )} */}

      <form onSubmit={handleSubmit} className=" flex flex-col gap-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Sign In</h2>
          <hr className="mt-2 border-gray-300" />
        </div>

        {Object.values(formErrors).map((error, index) => (
          <p key={index} className="text-red-500 text-sm">
            {error}
          </p>
        ))}

        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-500 rounded-lg mb-3"
          value={formValues.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 border border-gray-500 rounded-lg mb-3"
          // style={{ width: "100%", padding: "8px", borderRadius: "8px" }}
          value={formValues.password}
          onChange={handleChange}
        />

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
