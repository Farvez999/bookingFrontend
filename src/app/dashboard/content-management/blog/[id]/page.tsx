"use client";

import SubmitButton from "@/components/Buttons/SubmitButton";
import InputText from "@/components/InputBox/InputBox";
import { ChangeEventType, ImageType, OnSubmitType } from "@/types";
import { uploadCouldinary } from "@/utiles/uploadCouldinary";
import Image from "next/image";
import { useState } from "react";
import profileImage from "../../../../../assest/default_profile.png";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { usePostuserMutation } from "@/redux/api/authApi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import {
  useGetsingleblogQuery,
  usePostblogMutation,
  useUpdateblogMutation,
} from "@/redux/api/contentApi";
import ImageUpload from "@/components/imageUpload";
const CreateUser = ({ params }: any) => {
  const router = useRouter();
  const [updateblog] = useUpdateblogMutation();
  const { data } = useGetsingleblogQuery(params?.id);
  const [formData, setFormData] = useState<any>({
    title: data?.title,
    description: data?.description,
    images: data?.images,
  });
  const [errors, setErrors] = useState<any>({
    title: "",

    description: "",
    images: "",
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

  const handleImage: ChangeEventType = async (e) => {
    const images: any = e.target.files;
    let arr: any[] = [];
    if (images.length === 1) {
      const link = await uploadCouldinary(images[0]);
      console.log(link);
      arr.push(link);
      setFormData({ ...formData, images: arr });
    } else if (images?.length > 0) {
      for (const i of images) {
        const link: ImageType = await uploadCouldinary(i);
        arr.push(link);
      }
      setFormData({ ...formData, images: arr });
    }

    setErrors(arr);
  };
  const handleSubmit: OnSubmitType = async (e) => {
    e.preventDefault();
    const res: any = await updateblog({ id: data?._id, body: formData });
    console.log("res", res);
    if (res?.data?._id) {
      Swal.fire("Good job!", "blog updated", "success");
      router.push("/dashboard/content-management/blog");
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
          update blog
        </h2>

        <div className="flex flex-col gap-2 lg:col-span-2">
          <div className="flex flex-col gap-2 lg:col-span-2">
            <label htmlFor="profile" className="text-xs block mb-3">
              Upload images
            </label>
            <div className=" w-full p-1 rounded-md  border border-primary flex flex-col  justify-center">
              <ImageUpload
                id="image"
                image={formData?.images}
                error={errors?.images}
                onChange={handleImage}
                isMultiple={true}
              ></ImageUpload>
            </div>
          </div>
          {errors.images && (
            <ErrorMessage message={errors.images}></ErrorMessage>
          )}
        </div>
        <InputText
          type="text"
          name="title"
          label="blog title"
          placeholder="title here"
          initialValue={data?.title}
          error={errors.name}
          onChange={handleName}
        ></InputText>
        <div className="flex flex-col">
          <label>description</label>
          <textarea
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            defaultValue={data?.description}
            className="textarea textarea-bordered border-black"
            placeholder="give answer here"
          ></textarea>
        </div>
        <SubmitButton
          text="update blog"
          containerStyles="w-[1/2]   ml-auto lg:col-span-2"
          disabled={!formData.title || !formData.description}
        ></SubmitButton>
      </form>
    </div>
  );
};

export default CreateUser;
