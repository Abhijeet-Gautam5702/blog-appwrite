import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice.js";
import { Logo, Button, Input } from "./index.js";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.js";
import { useForm } from "react-hook-form";

function Login() {
  // local state
  const [error, setError] = useState("");

  const navigate = useNavigate(); // from react-router-dom
  const dispatch = useDispatch(); // from react-redux
  const { register, handleSubmit } = useForm(); // from react-hook-form

  const login = async (data) => {
    // Always clean the errors
    setError("");
    try {
      // Appwrite gives us a user-session when user logs in
      const session = await authService.login({
        email: data.email,
        password: data.password,
      });
      // if session exists => get the user data and update the user-login-status in store
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/"); // navigate programmatically to home route
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
          Login in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
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
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email:"
              type="email"
              placeholder="Enter your email"
              // React-hook-form registers this input field to its hook
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
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
