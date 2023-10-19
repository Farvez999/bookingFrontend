"use client";

import SubmitButton from "@/components/Buttons/SubmitButton";
import InputText from "@/components/InputBox/InputBox";
import { ChangeEventType, ImageType, OnSubmitType } from "@/types";
import { uploadCouldinary } from "@/utiles/uploadCouldinary";
import { useState } from "react";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useCreateHotelMutation } from "@/redux/api/serviceApi";
import ImageUpload from "@/components/imageUpload";
import InputSelection from "@/components/InputSelection/inputSelection";
import {
  LocationEnum,
  facilitesEnum,
  servicecategoryEnum,
} from "@/shared/enum";
const CreateUser = () => {
  const router = useRouter();
  const [createHotelData, { error, isLoading, isError }] =
    useCreateHotelMutation();
  const [formData, setFormData] = useState<any>({
    name: "",
    location: "",
    locationInDetails: "",
    images: [],
    facilities: [],
    description: "",
    maxPriceRange: 0,
    minPriceRange: 0,
    category: "",
    comments: "",
    progresStatus: "",
  });
  const [errors, setErrors] = useState<any>({
    name: "",
    description: "",
    maxPriceRange: 0,
    minPriceRange: 0,
    category: "",
    comments: "",
    location: "",
    locationInDetails: "",
    images: "",
    facilities: "",
    progresStatus: "",
  });
  const handleNumber = (e: any) => {
    const name = e.target.name;
    const value = parseFloat(e.target.value);
    if (!e.target.value) {
      setErrors({ ...errors, [name]: `Please provide ${name}` });
      setFormData({ ...formData, [name]: "" });
    } else if (!/^[+]?\d*\.?\d+$/.test(`${value}`)) {
      setErrors({ ...errors, [name]: `please provide a positive number` });
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
  const locationOptions = LocationEnum.map((location) => location);
  const categoryOptions = servicecategoryEnum.map((options) => options);
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
    const res: any = await createHotelData(formData);
    console.log("res", res);
    if (res?.data?._id) {
      Swal.fire("Good job!", "hotel created", "success");
      router.push("/dashboard/service-management");
    } else if (res?.error) {
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
          Create A Building
        </h2>

        <div className="flex flex-col gap-2 lg:col-span-2">
          <label htmlFor="profile" className="text-xs block mb-3">
            Upload images
          </label>
          <div className=" w-full p-1 rounded-md  border border-primary flex flex-col  justify-center">
            <ImageUpload
              id="images"
              image={formData?.images}
              error={errors?.images}
              onChange={handleImage}
              isMultiple={true}
            ></ImageUpload>
          </div>
        </div>
        <InputText
          type="text"
          name="name"
          label="building name"
          placeholder="building name here"
          //  initialValue={name}
          error={errors.name}
          onChange={handleName}
        ></InputText>

        <InputSelection
          label="category"
          labelStyles={"text-white"}
          data={formData}
          setData={setFormData}
          field="category"
          options={categoryOptions}
          selectOp="select category"
        ></InputSelection>
        <InputSelection
          label="location"
          labelStyles={"text-white"}
          data={formData}
          setData={setFormData}
          field="location"
          options={locationOptions}
          selectOp="select location"
        ></InputSelection>
        <InputSelection
          label="progresStatus"
          labelStyles={"text-white"}
          data={formData}
          setData={setFormData}
          field=""
          options={["in progress", "upcoming"]}
          selectOp="select progresStatus"
        ></InputSelection>

        <InputText
          type="text"
          name="locationInDetails"
          label="full location"
          placeholder="building full location here"
          //  initialValue={name}
          error={errors.name}
          onChange={handleName}
        ></InputText>
        <InputText
          type="text"
          name="description"
          label="description"
          placeholder="description here"
          //  initialValue={name}
          error={errors.name}
          onChange={handleName}
        ></InputText>
        <InputText
          type="number"
          name="minPriceRange"
          label="minPriceRange"
          placeholder="minPriceRange here"
          //  initialValue={name}
          error={errors.name}
          onChange={handleNumber}
        ></InputText>
        <InputText
          type="number"
          name="maxPriceRange"
          label="maxPriceRange"
          placeholder="maxPriceRange here"
          //  initialValue={name}          error={errors.name}
          onChange={handleNumber}
        ></InputText>
        <InputText
          type="text"
          name="comments"
          label="comments"
          placeholder="comments here"
          //  initialValue={name}
          error={errors.name}
          onChange={handleName}
        ></InputText>
        <div>
          <label className="font-bold">facilites</label>
          <div className="grid grid-cols-4 gap-1">
            {facilitesEnum.map((data, index) => (
              <div className=" text-sm pb-1" key={index}>
                <input
                  key={index}
                  type="checkbox"
                  id={data}
                  name="facilites"
                  value={data}
                  checked={formData.facilities?.includes(data)}
                  onClick={(e) => {
                    const isExit = formData?.facilities?.find(
                      (item: string) => item === data
                    );
                    if (!isExit) {
                      setFormData({
                        ...formData,
                        facilities: [...formData.facilities, data],
                      });
                    } else {
                      const rest = formData?.facilities.filter(
                        (item: string) => item !== data
                      );
                      setFormData({ ...formData, facilities: [...rest] });
                    }
                  }}
                />
                <label className="ms-1" htmlFor={data}>
                  {data}
                </label>{" "}
                <br />
              </div>
            ))}
          </div>
        </div>

        <SubmitButton
          text="create a building"
          containerStyles="w-[1/2]   ml-auto lg:col-span-2"
        ></SubmitButton>
      </form>
    </div>
  );
};

export default CreateUser;
