"use client";
import SubmitButton from "@/components/Buttons/SubmitButton";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import InputText from "@/components/InputBox/InputBox";
import { ChangeEventType, OnSubmitType, loginError, loginType } from "@/types";
import Image from "next/image";
import loginImage from "../../assest/login.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { GetUserInfo, storeUserInfo } from "@/shared/auth.service";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/userSlice/userSlice";
import Cookies from "universal-cookie";
// import { baseURL } from "../../Configs/libs";
// import { AuthContext } from "../../Context/AuthProvider/AuthProvider";

const Login = () => {
  const dispatch: any = useAppDispatch();
  const cookie = new Cookies();
  const router = useRouter();
  const [userLogin, { isLoading, isError, error }] = useUserLoginMutation();
  const [formData, setFormData] = useState<loginType>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<loginError>({
    email: "",
    password: "",
    general: "",
  });

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
      setErrors({ ...errors, [name]: "" });
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleLogin: OnSubmitType = async (e) => {
    e.preventDefault();

    setErrors({ ...errors, general: "" });
    const form = e.target;

    const res: any = await userLogin(formData);
    const { email, name, _id, role, phoneNumber } = res?.data?.data || {};

    if (res?.data?.data) {
      cookie.set("email", email);
      cookie.set("name", name);
      cookie.set("phone", phoneNumber);
      cookie.set("role", role);
      cookie.set("userId", _id);
    }
    if (res?.data?.accessToken) {
      storeUserInfo("accessToken", res?.data?.accessToken);
      console.log(res.data);
      dispatch(setUser(res?.data?.data));
      router.push("/");
    }

    if (res?.error?.data?.success === false) {
      setErrors({ ...errors, general: res.error.data.message });
    }
  };
  return (
    <div className="flex min-h-screen py-10 flex-col w-full md:flex-row gap-5 items-center justify-center">
      <div className="  hidden md:flex items-center justify-center    w-full md:w-1/2">
        <Image
          src={loginImage}
          alt="login"
          className="object-contain w-[80%]"
        ></Image>
      </div>
      <div className=" w-full  md:w-1/2 flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className=" w-[80%] md:w-[400px] px-7  rounded-lg py-10 bg-secondary gap-3 flex flex-col  
             shadow-[5px_3px_3px_3px_#ddd] hover:shadow-[-5px_-3px_3px_3px_#ddd] duration-500 transition-all "
        >
          <h2 className="text-xl font-medium text-black capitalize text-center">
            login in
          </h2>
          <InputText
            type="email"
            placeholder="enter your email"
            name="email"
            styles="text-lg"
            error={errors.email}
            onChange={handleEmail}
          />
          <InputText
            type="password"
            placeholder="enter your password"
            name="password"
            error={errors.password}
            styles="text-lg"
            onChange={handlePassword}
          />
          <Link
            href="/forget-password"
            className="text-blue-500 underline  text-end block text-xs "
          >
            forget password
          </Link>

          <SubmitButton
            text="login"
            disabled={!formData.email || !formData.password}
            containerStyles=" bg-primary mx-auto   text-black inline-block  w-full  "
          />
          <p className="text-xs flex items-center gap-2">
            If you have no account, please{" "}
            <Link
              className="text-blue-500 underline text-xs text-end block"
              href="/signup"
            >
              signup
            </Link>
          </p>
          {errors.general && <ErrorMessage message={errors.general} />}
        </form>
      </div>
    </div>
  );
};

export default Login;
