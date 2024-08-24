import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as authLogin, authReducer } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Logo, Button, Input } from "../components/index.js";
import { useDispatch } from "react-redux";

function Signup() {
  // local state
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    setError(""); // Always clean the errors first
    try {
      const session = await authService.createAccount({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have any account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
        {
          // Errors
          error && <p className="text-red-600 mt-8 text-center">{error}</p>
        }
        {/* Form */}
        {/* 
            NOTE: handleSubmit() is a method provided by react-hook-form. It takes our own custom submit-handler-function as a callback fn.
        */}
        <form onSubmit={handleSubmit(signup)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name:"
              type="text"
              placeholder="Enter your full name"
              // React-hook-form registers this input field to its hook
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email:"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
