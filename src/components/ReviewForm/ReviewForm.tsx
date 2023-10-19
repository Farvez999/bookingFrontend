"use client";
import { ChangeEventType, OnSubmitType } from "@/types";
import { ChangeEvent, useState } from "react";
import InputTextBox from "../InputBox/InputTextMessage";
import SubmitButton from "../Buttons/SubmitButton";
import { usePostreveiwandratingMutation } from "@/redux/api/authApi";
import Swal from "sweetalert2";

export interface ReviewDataType {
  rating: number;
  message: string;
}
const ReviewForm = (props: any) => {
  console.log(props);
  const [postareveiw, { isError, error }] = usePostreveiwandratingMutation();
  const [reviewData, setReviewData] = useState<ReviewDataType>({
    rating: 0,
    message: "",
  });
  const [errors, setErrors] = useState<any>({
    ratings: "",
    message: "",
  });

  const stars: number[] = [...Array(5).keys()];

  const handleName = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (!value?.length) {
      setErrors({ ...errors, [name]: `${name} shouldn't be empty` });
      setReviewData({ ...reviewData, [name]: "" });
    } else {
      setErrors({ ...errors, [name]: `` });
      setReviewData({ ...reviewData, [name]: value });
    }
  };
  console.log(reviewData);

  const handleSubmit: OnSubmitType = async (e) => {
    e.preventDefault();
    const finalReviewData = {
      id: props?.roomId,
      body: {
        ...reviewData,
        user: props?.user,
      },
    };
    const res: any = await postareveiw(finalReviewData);
    if (!isError) {
      Swal.fire(
        "Good job!",
        "successfully submitted reveiw and rating",
        "success"
      );
      setReviewData({
        rating: 0,
        message: " ",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${res?.error?.data?.message}`,
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 ">
          <h3 className="text-2xl font-semibold capitalize  rounded-lg">
            Gives your review
          </h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="ratings" className="font-semibold text-sm">
              What s your review for this room
            </label>
            <div className="flex items-center justify-start gap-4">
              {stars.map((i: number) => (
                <div
                  className={`w-7 h-7 text-white bg-black border-2 border-black flex items-center justify-center rounded-full ${
                    reviewData?.rating === i + 1 &&
                    "bg-orange-600 border-orange-500 text-white"
                  }`}
                  onClick={() =>
                    setReviewData({ ...reviewData, rating: i + 1 })
                  }
                  key={i + 1}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          <InputTextBox
            label="Write your message"
            rows={7}
            cols={10}
            name="message"
            placeholder="Enter your message"
            onChange={handleName}
            error={errors.message}
          ></InputTextBox>
        </div>
        {props?.roomId && (
          <div className="md:cols-span-2 justify-end flex items-center my-3">
            <SubmitButton
              color="text-white font-bold"
              text="give review "
              disabled={!reviewData?.message || !reviewData?.rating}
            ></SubmitButton>
          </div>
        )}
      </form>
    </div>
  );
};

export default ReviewForm;
