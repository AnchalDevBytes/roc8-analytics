"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { LabelledInput } from "@/components";
import Link from "next/link";
import { toast } from "react-toastify";
import axiosClient from "@/lib/axiosClient";
import { AxiosResponse } from "axios";
import { SignupResponseDataInterface } from "@/interfaces/SignupResponseDataInterface";
import { useRouter } from "next/navigation";
import { SigninResponseDataInterface } from "@/interfaces/SigninResponseDataInterface";

interface UserData {
  name?: string;
  email: string;
  password: string;
}

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [signupInput, setSignupInput] = useState<UserData>({
    name: "",
    email: "",
    password: "",
  });
  const [signinInput, setSigninInput] = useState<UserData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState({ signup: false, signin: false });

  const router = useRouter();

  const signUpChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    });
  };

  const signInChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSigninInput({
      ...signinInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupSubmission = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading((prev) => ({ ...prev, signup: true }));
      const { data }: AxiosResponse<SignupResponseDataInterface> =
        await axiosClient.post("/api/signup", signupInput);
      if (data.success !== true) {
        toast.error(data.message);
      } else {
        toast.success(data.message || "User signed up successfully!");
        router.replace("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unknown error while signing up...");
      }
    } finally {
      setIsLoading((prev) => ({ ...prev, signup: false }));
    }
  };

  const handleSigninSubmission = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading((prev) => ({ ...prev, signin: true }));
      const { data }: AxiosResponse<SigninResponseDataInterface> =
        await axiosClient.post("/api/signin", signinInput);
      if (data.success !== true) {
        toast.error(data.message);
      } else {
        toast.success(data.message || "User signed in successfully!");
        router.replace("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unknown error while signing in...");
      }
    } finally {
      setIsLoading((prev) => ({ ...prev, signin: false }));
    }
  };

  // Ensure this runs only on the client
  useEffect(() => {
    if (typeof window === "undefined") {
      // Handle any logic that should not run on the server here
    }
  }, []);

  return (
    <div className="min-h-screen  pt-[65px] relative bg-teal-50 flex flex-col justify-center items-center p-4 sm:p-8">
      <div className="p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center text-teal-800">
          <h1 className="text-3xl font-bold">
            {type === "signup" ? "Sign Up" : "Sign In"}
          </h1>
          <p className="text-muted-foreground">
            {type === "signup"
              ? "Create your account"
              : "Sign In to your account"}
          </p>
        </div>
        <form
          onSubmit={
            type === "signup" ? handleSignupSubmission : handleSigninSubmission
          }
          className="space-y-4"
        >
          {type === "signup" && (
            <LabelledInput
              label="name"
              id="name"
              placeholder="Enter your name"
              type="text"
              changeHandler={signUpChangeHandler}
            />
          )}
          <LabelledInput
            label="email"
            id="email"
            placeholder="Enter your email"
            type="email"
            changeHandler={
              type === "signup" ? signUpChangeHandler : signInChangeHandler
            }
          />
          <LabelledInput
            label="password"
            id="password"
            placeholder="Enter your password"
            type="password"
            changeHandler={
              type === "signup" ? signUpChangeHandler : signInChangeHandler
            }
          />
          <button
            type="submit"
            className="border-2 bg-teal-500 text-white w-full py-2 px-5 rounded-lg"
          >
            {type === "signup" && (isLoading.signup ? "...loading" : "Signup")}
            {type === "signin" && (isLoading.signin ? "...loading" : "Signin")}
          </button>
        </form>
        <div className="text-center text-slate-400 text-muted-foreground mt-5">
          {type === "signup"
            ? "Already have an account ?"
            : "Don't have an account ?"}{" "}
          <Link
            href={type === "signup" ? "/signin" : "/signup"}
            className="text-slate-600 font-medium hover:underline"
          >
            {type === "signup" ? "Sign In" : "Sign Up"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
