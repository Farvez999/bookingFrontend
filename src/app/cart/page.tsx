"use client";
import ActionButton from "@/components/Buttons/ActionButton";
import { useGetSingleUserQuery } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "universal-cookie";
import { AiFillDelete } from "react-icons/ai";
import { useRemovefromcartMutation } from "@/redux/api/roomsApi";
import Swal from "sweetalert2";

export default function MyCart() {
  const [removeFromCart, { isError }] = useRemovefromcartMutation();
  const router = useRouter();
  const cookie = new Cookies();
  const userId = cookie.get("userId");

  const { data, refetch } = useGetSingleUserQuery(userId);
  const handleRemoveFromCart = async (id: string) => {
    const res: any = await removeFromCart({ id: id, body: { userId: userId } });
    if (!isError) {
      Swal.fire("Good job!", "rooms deleted from cart", "success");
      refetch();
    } else if (res?.error?.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${res?.error?.data?.message}`,
      });
    }
  };

  return (
    <div className="w-[90%] h-screen mx-auto">
      <h1 className="text-3xl my-6  capitalize font-bold text-red-500 text-center  ">
        my cart list
      </h1>
      {data?.cart?.map((b: any, index: number) => (
        <div
          key={index}
          className="card card-side mb-4 bg-gray-200 flex lg:flex-row flex-col  shadow-xl"
        >
          <figure className="p-3">
            <img src={b?.images?.[0]?.url} alt="rooms" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-blue-950">{b?.title}</h2>
            <p> catgory: {b?.category}</p>

            <p> pricing: {b?.pricing}</p>
            <p>
              status:{" "}
              {b.isBooked ? (
                <span className="text-red-500 font-bold">
                  {" "}
                  not avilable right now
                </span>
              ) : (
                <span className="text-primary font-bold">free for book</span>
              )}
            </p>

            <div className="card-actions justify-end items-center">
              <div
                onClick={() => handleRemoveFromCart(b?._id)}
                className="text-2xl text-red-500 cursor-pointer"
              >
                <AiFillDelete />
              </div>
              <ActionButton
                handleAction={() => router.push(`/${b?.building}/${b?._id}`)}
                containerStyles="bg-blue-500 hover:bg-primary duration-300   text-xs rounded-md text-white py-2"
              >
                show details
              </ActionButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
