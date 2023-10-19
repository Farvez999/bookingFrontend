"use client";

import {
  useCancelbookingMutation,
  useGetallbookingsQuery,
} from "@/redux/api/bookingApi";
import { useAppSelector } from "@/redux/hooks";
import React from "react";

const Mybooking = () => {
  const user: any = useAppSelector((state) => state.user.user);
  const query: any = {};
  query["userId"] = user?._id;
  const { data, isLoading, isError, error } = useGetallbookingsQuery({
    ...query,
  });
  const { bookingNo, user: bookingUser, status, totalFee, room } = data || {};
  const { email } = bookingUser || {};
  const [updatebookingStatus] = useCancelbookingMutation(undefined);

  const handleCancelBooking = async (id: string) => {
    const res: any = await updatebookingStatus(id);
    console.log(res);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl  capitalize font-bold text-green-500 text-center mb-4 ">
        my booking list
      </h1>
      {data
        ?.filter((b: any) => b?.status !== "cancelled")
        .map((b: any) => (
          <div
            key={b._id}
            className="card card-side bg-gray-300 mb-4 flex lg:flex-row flex-col  shadow-xl"
          >
            <figure>
              <img src={b?.room?.images?.[0]?.url} alt="Movie" />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-blue-900">{b?.room?.title}</h2>
              <p className=" font-bold">
                {" "}
                bookingNo: <span className="bg-orange-500">{b?.bookingNo}</span>
              </p>
              <p className="font-bold">
                status: <span className="text-red-500"> {b?.status}</span>
              </p>
              <p className="font-bold"> TotalFee: {b?.totalFee}</p>
              <p className="font-bold">checkInDate: {b.checkInDate}</p>
              <p className="font-bold">checkOutDate: {b.checkOutDate}</p>
              <div className="card-actions justify-end">
                {b?.status === "pending" ? (
                  <button
                    onClick={() => handleCancelBooking(b?._id)}
                    className="btn btn-primary bg-red-500 border-0 text-white"
                  >
                    cancel now
                  </button>
                ) : (
                  <button className="btn btn-primary bg-blue-500 border-0 text-white">
                    booking already confirmed
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Mybooking;
