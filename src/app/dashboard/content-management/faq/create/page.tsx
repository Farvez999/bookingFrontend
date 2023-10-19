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
import { useGetallfaqsQuery, usePostfaqMutation } from "@/redux/api/contentApi";
const CreateUser = () => {
  const router = useRouter();
  const [postanewfaq] = usePostfaqMutation();
  const { data } = useGetallfaqsQuery(undefined);
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState<any>({
    title: "",
    description: "",
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

  const handleSubmit: OnSubmitType = async (e) => {
    e.preventDefault();
    const res: any = await postanewfaq(formData);
    console.log("res", res);
    if (res?.data._id) {
      Swal.fire("Good job!", "faq created", "success");
      router.push("/dashboard/content-management/faq");
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
          Create new faq
        </h2>

        <div className="flex flex-col gap-2 lg:col-span-2">
          <InputText
            type="text"
            name="title"
            label="faq title"
            placeholder="faq title"
            //  initialValue={name}
            error={errors.name}
            onChange={handleName}
          ></InputText>
          <InputText
            type="text"
            name="description"
            label="faq answer"
            placeholder="faq answer"
            //  initialValue={name}
            error={errors.name}
            onChange={handleName}
          ></InputText>
        </div>

        <SubmitButton
          text="save"
          containerStyles="w-[1/2]   ml-auto lg:col-span-2"
          // disabled={
          //   !formData.name ||
          //   !formData.email ||
          //   !formData.phoneNumber ||
          //   !formData.password ||
          //   !formData?.profileImg?.url
          // }
        ></SubmitButton>
      </form>
    </div>
  );
};

export default CreateUser;
