"use client";

import React, { useState } from "react";
import loginImage from "../../assest/login.svg";
import Image from "next/image";
import Link from "next/link";
import InputText from "@/components/InputBox/InputBox";
import SubmitButton from "@/components/Buttons/SubmitButton";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import {
  ChangeEventType,
  OnSubmitType,
  registerErrorType,
  registerType,
} from "@/types";
import { usePostuserMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
const Signup = () => {
  const router = useRouter();
  const [singupUser, { error, isLoading, isError }] = usePostuserMutation();
  const [formData, setFormData] = useState<registerType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<registerErrorType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const handleName: ChangeEventType = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    if (!value?.length) {
      setErrors({ ...errors, [name]: `${name} shouldn't be empty` });
      setFormData({ ...formData, [name]: "" });
    } else {
      setErrors({ ...errors, [name]: `` });
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleEmail: ChangeEventType = (e) => {
    const name = e?.target?.name;
    const value = e.target.value.trim();
    if (!value.length) {
      setErrors({ ...errors, [name]: "email shouldn't be empty" });
      setFormData({ ...formData, [name]: "" });
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    ) {
      setErrors({ ...errors, [name]: "Please provide a email" });
      setFormData({ ...formData, [name]: "" });
    } else {
      setErrors({ ...errors, [name]: "" });
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePassword: ChangeEventType = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value.length <= 0) {
      setErrors({ ...errors, [name]: "password shouldn'b be empty  " });
      setFormData({ ...formData, [name]: "" });
    } else if (!/[A-Z]/.test(value)) {
      setErrors({ ...errors, [name]: "must have a  capital letter " });
      setFormData({ ...formData, [name]: "" });
    } else if (!/[a-z]/.test(value)) {
      setErrors({ ...errors, [name]: "must  have a small letter " });
      setFormData({ ...formData, [name]: "" });
    } else if (!/[0-9]/.test(value)) {
      setErrors({ ...errors, [name]: "must  have a digit" });
      setFormData({ ...formData, [name]: "" });
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(value)) {
      setErrors({ ...errors, [name]: "must  have a special character" });
      setFormData({ ...formData, [name]: "" });
    } else if (value.length <= 8) {
      setErrors({
        ...errors,
        [name]: "password must be 8 character or more",
      });
      setFormData({ ...formData, [name]: "" });
    } else {
      if (formData.confirm) {
        if (formData.password === formData.confirm) {
          setErrors({ ...errors, [name]: "Password not matched" });
          setFormData({ ...formData, [name]: "" });
        } else {
          setErrors({ ...errors, [name]: "" });
          setFormData({ ...formData, [name]: value });
        }
      } else {
        setErrors({ ...errors, [name]: "" });
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handlePhone: ChangeEventType = (e) => {
    const phone: string = e.target.value;
    if (phone === "") {
      setErrors({ ...errors, phone: "phone number should't be empty" });
      setFormData({ ...formData, phone: "" });
    } else if (!/^(((\+|00)?880)|0)(\d){10}$/.test(phone)) {
      setErrors({ ...errors, phone: "number should be valid" });
      setFormData({ ...formData, phone: "" });
    } else {
      setErrors({ ...errors, phone: "" });
      setFormData({ ...formData, phone: phone });
    }
  };
  const handleConfirm: ChangeEventType = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value.length <= 0) {
      setErrors({ ...errors, [name]: "password shouldn'b be empty  " });
      setFormData({ ...formData, [name]: "" });
    } else if (!/[A-Z]/.test(value)) {
      setErrors({ ...errors, [name]: "must have a  capital letter " });
      setFormData({ ...formData, [name]: "" });
    } else if (!/[a-z]/.test(value)) {
      setErrors({ ...errors, [name]: "must  have a small letter " });
      setFormData({ ...formData, [name]: "" });
    } else if (!/[0-9]/.test(value)) {
      setErrors({ ...errors, [name]: "must  have a digit" });
      setFormData({ ...formData, [name]: "" });
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(value)) {
      setErrors({ ...errors, [name]: "must  have a special character" });
      setFormData({ ...formData, [name]: "" });
    } else if (value.length <= 8) {
      setErrors({
        ...errors,
        [name]: "password must be 8 character or more",
      });
      setFormData({ ...formData, [name]: "" });
    } else {
      if (formData.password) {
        if (formData.password === formData.confirm) {
          setErrors({ ...errors, [name]: "Password not matched" });
          setFormData({ ...formData, [name]: "" });
        } else {
          setErrors({ ...errors, [name]: "" });
          setFormData({ ...formData, [name]: value });
        }
      } else {
        setErrors({ ...errors, [name]: "" });
        setFormData({ ...formData, [name]: value });
      }
    }
  };
  const handleSignUp: OnSubmitType = async (e) => {
    e.preventDefault();
    const { firstName, lastName, confirm, ...others } = formData;
    const name = firstName + " " + lastName;
    const newobj = { name, ...others, phoneNumber: others?.phone };
    const res: any = await singupUser(newobj);

    if (res?.data?.email) {
      router.push("/login");
    }

    const form = e.target;
    if (res?.error?.data?.success === false) {
      setErrors({ ...errors, general: res.error.data.message });
    }
    console.log(res);
  };
  return (
    <div className="flex min-h-screen px-10  py-5 flex-col w-full md:flex-row gap-5 items-center justify-center">
      <div className="hidden md:flex items-center justify-center w-full md:w-1/2">
        <Image
          src={loginImage}
          alt="login"
          className="object-contain w-full md:w-[80%]"
        ></Image>
      </div>
      <div className=" w-full md:w-1/2 flex items-center justify-center">
        <form
          onSubmit={handleSignUp}
          className="w-full  px-7  rounded-lg py-10 bg-secondary gap-3 flex flex-col  
        shadow-[5px_3px_3px_3px_#ddd] hover:shadow-[-5px_-3px_3px_3px_#ddd] duration-500 transition-all "
        >
          <h2 className="text-xl font-medium text-black capitalize text-center">
            registration form
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            <InputText
              type="firstName"
              placeholder="enter your firstName"
              name="firstName"
              label="firstName"
              styles="text-lg"
              error={errors.firstName}
              onChange={handleName}
            />
            <InputText
              type="lastName"
              placeholder="enter your lastName"
              name="lastName"
              label="lastName"
              styles="text-lg"
              error={errors.lastName}
              onChange={handleName}
            />
            <InputText
              type="email"
              placeholder="enter your email"
              name="email"
              label="email"
              styles="text-lg"
              error={errors.email}
              onChange={handleEmail}
            />
            <InputText
              type="text"
              placeholder="enter your phone"
              name="phone"
              label="phone"
              styles="text-lg"
              error={errors.phone}
              onChange={handlePhone}
            />
            <InputText
              type="password"
              placeholder="enter your password"
              name="password"
              label="password"
              error={errors.password}
              styles="text-lg"
              onChange={handlePassword}
            />
            <InputText
              type="confirm"
              placeholder="enter your confirm"
              name="confirm"
              label="confirm"
              error={errors.confirm}
              styles="text-lg"
              onChange={handleConfirm}
            />
          </div>
          {/* <Link
                  href="/forget-password"
                  className="text-blue-500 underline  text-end block text-xs "
               >
                  forget password
               </Link> */}

          <SubmitButton
            text="Register now"
            disabled={
              !formData.firstName ||
              !formData.lastName ||
              !formData.email ||
              !formData.password ||
              !formData?.confirm ||
              !formData?.phone
            }
            containerStyles=" bg-primary mx-auto   text-black inline-block  w-full md:w-1/2  "
          />
          <p className="text-xs flex items-center gap-2">
            Already have an account
            <Link
              className="text-blue-500 underline text-xs text-end block"
              href="/login"
            >
              login
            </Link>
          </p>
          {errors.general && <ErrorMessage message={errors.general} />}
        </form>
      </div>
    </div>
  );
};

export default Signup;
