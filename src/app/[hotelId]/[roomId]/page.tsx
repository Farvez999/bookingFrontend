"use client";

import ActionButton from "@/components/Buttons/ActionButton";
import SubmitButton from "@/components/Buttons/SubmitButton";
import CommonModal from "@/components/CommonModal/CommonModal";
import InputText from "@/components/InputBox/InputBox";
import InputSelection from "@/components/InputSelection/inputSelection";
import ReviewForm from "@/components/ReviewForm/ReviewForm";
import {
  useAddtocartMutation,
  useGetsingleroomsQuery,
} from "@/redux/api/roomsApi";
import { useGetsingleServiceQuery } from "@/redux/api/serviceApi";
import { ChangeEventType, OnSubmitType } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { AiFillCaretRight } from "react-icons/ai";
import { useAppSelector } from "@/redux/hooks";
import {
  useGetallbookingsQuery,
  usePostAbookingMutation,
} from "@/redux/api/bookingApi";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import Reveiws from "@/components/reveiws/Reveiws";
import { useRouter } from "next/navigation";

const RoomDetails = ({ params }: { params: any }) => {
  const router = useRouter();
  const coookie = new Cookies();
  const userId = coookie.get("userId");
  console.log(params.roomId);
  const user: any = useAppSelector((state: any) => state.user.user);
  const [showModal1, setShowModal1] = useState<boolean>(false);
  const { data, isLoading }: any = useGetsingleroomsQuery(params.roomId);
  const { data: bookingData } = useGetallbookingsQuery(undefined);
  const [findUserBooK, setfinduserBook] = useState({});
  useEffect(() => {
    const foundBooking = bookingData?.find((booking: any) => {
      console.log("booking", booking);
      return booking?.userId === user?._id && booking?.status === "confirmed";
    });
    setfinduserBook(foundBooking);
  }, [user?._id, bookingData]);

  console.log(findUserBooK);
  const [
    postabooking,
    { error: bookingerror, isLoading: bookingLoading, isError: errortruefalse },
  ] = usePostAbookingMutation();
  const {
    title,
    category,
    pricing,
    discount,
    building,
    bedSize,
    roomSize,
    roomId,
    description,
    images,
    facilities,
    isBooked,
    _id,
  } = data || {};

  const { name, email, phoneNumber }: any = user || {};
  const totalnewFee = pricing && pricing - discount;
  console.log(totalnewFee);
  const [formData, setFormData] = useState<any>({
    name: name,
    email: email,
    phone: phoneNumber,
    nidOrBirth: "",
    room: data?._id,
    totalFee: totalnewFee,
    discount: discount,
    checkInDate: "",
    checkOutDate: "",
    payType: "",
  });
  const [errors, setErrors] = useState<any>({
    name: "",
    email: "",
    phone: "",
    nidOrBirth: "",
    room: "",
    totalFee: "",
    discount: "",
    checkInDate: "",
    checkOutDate: "",
    payType: "",
  });
  console.log(formData, errors);

  // -----------------------------------
  const calculateNumberOfDays = () => {
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const timeDifference = checkOut.getTime() - checkIn.getTime();
      const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
      return numberOfDays;
    }
    return 0; // Return 0 if dates are not set
  };

  // Calculate the total fee
  const calculateTotalFee = () => {
    const numberOfDays = calculateNumberOfDays();
    console.log("number of days", numberOfDays);
    if (numberOfDays > 0) {
      const totalFee = (pricing - discount) * numberOfDays;
      return totalFee;
    }
    return 0; // Return 0 if check-in and check-out dates are not selected
  };

  // Use this calculated total fee in your component
  const totalFee = calculateTotalFee();
  console.log("checkInDate", formData.checkInDate);
  console.log("totalfee", totalFee);
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
    const name: string = e.target.name;
    if (!phone) {
      setErrors({
        ...errors,
        [name]: "phone number should't be empty",
      });
      setFormData({ ...formData, [name]: "" });
    } else if (!/^(((\+|00)?880)|0)(\d){10}$/.test(phone)) {
      setErrors({ ...errors, [name]: "number should be valid" });
      setFormData({ ...formData, [name]: "" });
    } else {
      setErrors({ ...errors, [name]: "" });
      setFormData({ ...formData, [name]: phone });
    }
  };

  const handleNumber: ChangeEventType = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (!value) {
      setErrors({ ...errors, [name]: `${name} shouldn't be empty ` });
      setFormData({ ...formData, [name]: "" });
    } else if (!/^-?\d*\.?\d+$/.test(value)) {
      setErrors({ ...errors, [name]: "Please give a valid number " });
      setFormData({ ...formData, [name]: "" });
    } else {
      setErrors({ ...errors, [name]: "" });
      setFormData({ ...formData, [name]: parseFloat(value) });
    }
  };

  const handleDiscount: ChangeEventType = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (!e.target.value) {
      setErrors({ ...errors, [name]: `Please provide ${name}` });
      setFormData({ ...formData, [name]: "" });
    } else if (!/^(100|\d{1,2}(\.\d+)?)$/.test(value)) {
      setErrors({ ...errors, [name]: `discount should be 0 to 100` });
      setFormData({ ...formData, [name]: "" });
    } else {
      setErrors({ ...errors, [name]: `` });
      setFormData({ ...formData, [name]: parseFloat(value) });
    }
  };
  const [totalFees, setTotalFee] = useState(0);
  const handleDate: ChangeEventType = (e) => {
    const name = e.target.name;
    const date = e.target.value;
    if (!date) {
      setErrors({ ...errors, [name]: "Please select a date " });
      setFormData({ ...formData, [name]: "" });
    } else if (/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/.test(date)) {
      setErrors({ ...errors, [name]: "please provide a valid date" });
      setFormData({ ...formData, [name]: "" });
    } else {
      setErrors({ ...errors, [name]: "" });
      setFormData({ ...formData, [name]: new Date(date).toISOString() });
    }
  };

  useEffect(() => {
    const totalFee = calculateTotalFee();
    setTotalFee(totalFee);
  }, [formData]);
  const handleSubmit: OnSubmitType = async (e) => {
    e.preventDefault();
    const newFormData = {
      ...formData,
      totalFee: totalFee ? totalFee : totalFees,

      discount: discount,
      userId: user?._id,
      user: {
        name: name,
        email: email,
        phone: phoneNumber,
        nidOrBirth: formData.nidOrBirth,
      },
    };
    const res: any = await postabooking({
      id: params?.roomId,
      body: newFormData,
    });
    if (!errortruefalse) {
      Swal.fire("Good job!", "successfully booked a room", "success");
      setShowModal1(false);
      router.push("/dashboard/my-dashboard");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${res?.error?.data?.message}`,
      });
    }
    console.log("response here", res);
    console.log("error here", bookingerror);
  };

  const [addTocarts, { isError: cartIsError, error: carterror }] =
    useAddtocartMutation();
  const addTocart = async (id: string) => {
    const res: any = await addTocarts({ id: id, body: { userId: userId } });
    if (res?.data?._id) {
      Swal.fire("Good job!", "rooms added in cart", "success");
    } else if (res?.error?.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${res?.error?.data?.message}`,
      });
    }
  };

  return (
    <div className="flex items-center justify-center flex-col gap-5">
      <div className="w-[95%] my-10 mx-auto bg-secondary md:p-10 p-5 shadow-[5px_5px_5px_5px_#ddd] rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold uppercase">Room Name: {title}</h2>
          <div className="flex gap-3 items-center">
            <ActionButton handleAction={() => addTocart(_id)}>
              <FaCartPlus size={30}></FaCartPlus>
            </ActionButton>
            <ActionButton
              disabled={isBooked ? true : false}
              handleAction={() => setShowModal1(true)}
              containerStyles="bg-black hover:bg-orange-500 duration-300   text-xs rounded-md text-white py-2"
            >
              {isBooked ? "in booking" : "book now"}
            </ActionButton>
          </div>
        </div>
        <h5 className="text-sm font-semibold"> category: {category}</h5>
        <div className="grid  grid-cols-1 md:grid-cols-3 gap-4 my-3">
          {images?.map((i: any, idx: number) => (
            <Image
              src={i.url}
              key={idx}
              alt="hotel image"
              className={`w-full rounded-xl h-auto ${idx === 0 && "md:col-span-2 row-span-2  "
                }`}
              width={100}
              height={100}
            ></Image>
          ))}
        </div>

        <h3 className="font-bold text-orange-600">code: {roomId}</h3>
        <h3>Facilites:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-between items-center ">
          {facilities?.map((item: any) => (
            <div
              key={item}
              className="flex items-centers m-2 bg-gray-200 text-  px-5 py-2 border-2  rounded-lg"
            >
              <AiFillCaretRight />
              <p className="text-sm capitalize  ">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <p>{description}</p>
        </div>
        <div>
          <h5 className="text-lg font-bold text-red-500">pricing: {pricing}</h5>
          <h5 className="text-lg font-bold bg-orange-500">
            discount: {discount ? discount : "no discount avilable"}
          </h5>
        </div>

        <div className="my-2">
          <p className="mb-1">bedSize: {bedSize} sqr ft.</p>
          <p>roomSize: {roomSize} sqr ft.</p>
        </div>
        <div>
          <p className="my-4">
            status:{" "}
            <span className="bg-orange-500 font-bold border-2 p-2 ">
              {isBooked ? "not avilable" : "open for book"}
            </span>
          </p>
        </div>
      </div>
      {findUserBooK && (
        <div className="w-[95%] py-3 p-5 rounded-md shadow-[5px_5px_5px_5px_#ddd] mb-10">
          <div className="flex justify-around lg:flex-row flex-col items-center">
            <div>
              <ReviewForm roomId={params?.roomId} user={user?._id}></ReviewForm>
            </div>
            <div>
              <Image
                alt="review"
                height={200}
                width={300}
                src="https://img.freepik.com/free-vector/flat-giving-feedback-concept-template_23-2148962150.jpg?size=626&ext=jpg&ga=GA1.1.137143835.1697663080&semt=sph"
              ></Image>
            </div>
          </div>
        </div>
      )}
      <div>
        <h1 className="text-2xl font-bold bg-orange-500 text-center ">
          Our Customer s review
        </h1>
        <Reveiws data={data} />
      </div>
      {showModal1 && (
        <CommonModal selected="data" setShow={setShowModal1}>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-3 md:grid-cols-2"
          >
            <InputText
              type="text"
              name="name"
              label="name"
              placeholder="your name"
              error={errors.name}
              initialValue={name}
              onChange={handleName}
            ></InputText>
            <InputText
              type="email"
              name="email"
              label="email"
              placeholder="your email"
              initialValue={email}
              error={errors.email}
              onChange={handleEmail}
            ></InputText>
            <InputText
              type="text"
              name="phone"
              label="phone"
              placeholder="your phone"
              initialValue={phoneNumber}
              error={errors.phone}
              onChange={handlePhone}
            ></InputText>
            <InputText
              type="text"
              name="nidOrBirth"
              label="nidOrBirth"
              placeholder="your nid or birth"
              error={errors.nidOrBirth}
              onChange={handleNumber}
            ></InputText>
            {/* <InputText
              type="text"
              name="room"
              label="room name"
              placeholder={title}
              initialValue={data?._id}
              error={errors.room}
              onChange={handleName}
            ></InputText> */}
            <InputText
              type="number"
              name="pricing"
              label="pricing for per day"
              placeholder="your total fee"
              initialValue={pricing}
              error={errors.totalFee}
              onChange={handleNumber}
            ></InputText>
            <InputText
              type="number"
              name="discount"
              label="discount"
              initialValue={discount}
              placeholder="your discount"
              error={errors.discount}
              onChange={handleNumber}
            ></InputText>
            <InputText
              type="date"
              name="checkInDate"
              label="checkInDate"
              placeholder="your checkInDate"
              error={errors.checkInDate}
              onChange={handleDate}
            ></InputText>
            <InputText
              type="date"
              name="checkOutDate"
              label="checkOutDate"
              placeholder="your checkOutDate"
              error={errors.checkOutDate}
              onChange={handleDate}
            ></InputText>

            <InputSelection
              label="payType"
              data={formData}
              setData={setFormData}
              field="payType"
              options={["bkash", "nagad", "card", "cash"]}
              selectOp="select payType"
            ></InputSelection>

            <div className="flex  items-center justify-between">
              <p className="">totalFee: {totalFee} bdt.</p>
              <div className="md:cols-span-2 justify-end flex items-center">
                <SubmitButton
                  text="book now"
                // disabled={
                //   !formData?.name ||
                //   !formData?.email ||
                //   !formData?.phone ||
                //   !formData.discount ||
                //   !formData?.checkInDate ||
                //   !formData?.checkOutData
                // }
                ></SubmitButton>
              </div>
            </div>
          </form>
        </CommonModal>
      )}
    </div>
  );
};

export default RoomDetails;
