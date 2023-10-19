"use client";

import SubmitButton from "@/components/Buttons/SubmitButton";
import InputText from "@/components/InputBox/InputBox";
import { ChangeEventType, ImageType, OnSubmitType } from "@/types";
import { uploadCouldinary } from "@/utiles/uploadCouldinary";
import Image from "next/image";
import { useState } from "react";
import profileImage from "../../../../assest/profile.jpg";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { usePostuserMutation } from "@/redux/api/authApi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const CreateUser = () => {
  const router = useRouter();
  const [postUserData, { error, isLoading, isError }] = usePostuserMutation();
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    profileImg: {
      publicLink: "",
      url: "",
    },
    phoneNumber: "",
    password: "",
    role: "admin",
  });
  const [errors, setErrors] = useState<any>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    profileImg: "",
  });

  const handleName: ChangeEventType = (e) => {
    const name = e.target.name;
    const value = e.target.value;
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

  const handlePhone: ChangeEventType = (e) => {
    const phone: string = e.target.value;
    if (!phone) {
      setErrors({
        ...errors,
        phoneNumber: "phone number should't be empty",
      });
      setFormData({ ...formData, phoneNumber: "" });
    } else if (!/^(((\+|00)?880)|0)(\d){10}$/.test(phone)) {
      setErrors({ ...errors, phoneNumber: "number should be valid" });
      setFormData({ ...formData, phoneNumber: "" });
    } else {
      setErrors({ ...errors, phoneNumber: "" });
      setFormData({ ...formData, phoneNumber: phone });
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

  const handleImageUpload: ChangeEventType = async (e: any) => {
    const image = e.target.files[0];
    console.log(image);
    if (!image) {
      setFormData({
        ...formData,
        profileImg: { url: "", public_id: "" },
      });
      setErrors({ ...errors, profileImg: "please select an image" });
      return;
    }
    if (!!image) {
      const link: ImageType = await uploadCouldinary(image);
      if (link.publicLink && link.url) {
        console.log(link);
        setFormData({
          ...formData,
          profileImg: {
            url: link.url,
            public_id: link.publicLink,
          },
        });
        setErrors({
          ...errors,
          profileImg: "",
        });
      } else {
        setFormData({
          ...formData,
          profileImg: { url: "", public_id: "" },
        });
        setErrors({
          ...errors,
          profileImg: "please upload  image again",
        });
      }
    }
  };
  const handleSubmit: OnSubmitType = async (e) => {
    e.preventDefault();
    const res: any = await postUserData(formData);
    console.log("res", res);
    if (res?.data?.email) {
      Swal.fire("Good job!", " admin profile created", "success");
      router.push("/dashboard/admin-management");
    } else if (res?.error?.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${res?.error?.data?.message}`,
      });
    }
  };

  console.log(formData);
  console.log("errors", errors);
  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="grid lg:grid-cols-2 bg-secondary grid-cols-1 gap-2 mt-5 py-7 px-5 rounded-lg w-[80%]"
      >
        <h2 className="text-lg font-semibold  capitalize lg:col-span-2 ">
          Create new admin
        </h2>

        <div className="flex flex-col gap-2 lg:col-span-2">
          <label htmlFor="profile" className="text-xs block mb-3">
            Upload profile
          </label>
          <div className="w-[150px] h-[150px] p-1 rounded-md  border border-primary flex flex-col  justify-center">
            <div className="flex items-center justify-center">
              <Image
                src={
                  formData?.profileImg?.url
                    ? formData?.profileImg?.url
                    : profileImage
                }
                alt="image"
                width={150}
                height={150}
                className="w-[100px] h-[100px] rounded-full"
              ></Image>
            </div>
            <InputText
              type="file"
              name="profileImg"
              // label="upload profile"
              placeholder=""
              styles="w-full border-0 text-xs border-0  flex flex-col"
              error={errors.profileImage}
              onChange={handleImageUpload}
            ></InputText>
          </div>
          {errors.profileImg && (
            <ErrorMessage message={errors.profileImg}></ErrorMessage>
          )}
        </div>
        <InputText
          type="text"
          name="name"
          label="name"
          placeholder="admin name here"
          //  initialValue={name}
          error={errors.name}
          onChange={handleName}
        ></InputText>
        <InputText
          type="email"
          name="email"
          label="admin email"
          placeholder="admin email here"
          //  initialValue={email}
          error={errors.email}
          onChange={handleEmail}
        ></InputText>
        <InputText
          type="text"
          name="phoneNumber"
          label="admin phone"
          placeholder="admin phone here"
          //  initialValue={phoneNumber}
          error={errors.phoneNumber}
          onChange={handlePhone}
        ></InputText>
        <InputText
          type="password"
          name="password"
          label="admin password"
          placeholder="admin password"
          //  initialValue={phoneNumber}
          error={errors.password}
          onChange={handlePassword}
        ></InputText>

        <SubmitButton
          text="create a admin"
          containerStyles="w-[1/2]   ml-auto lg:col-span-2"
          disabled={
            !formData.name ||
            !formData.email ||
            !formData.phoneNumber ||
            !formData.password ||
            !formData?.profileImg?.url
          }
        ></SubmitButton>
      </form>
    </div>
  );
};

export default CreateUser;
