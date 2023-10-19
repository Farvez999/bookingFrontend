"use client";

import Image from "next/image";
import Link from "next/link";
import { features } from "process";
import ActionButton from "../Buttons/ActionButton";
import { useRouter } from "next/navigation";

const RoomCard = ({ room }: any) => {
  const {
    title,
    category,
    pricing,
    discount,
    building,
    bedsize,
    roomsize,
    roomId,
    description,
    images,
    facilities,
  } = room;
  const router = useRouter();
  const featues = [
    "4 beds ( 1 twin, 3 full )",
    "free cancellation",
    "no prepayment need",
  ];

  return (
    <div className="w-full flex  flex-col gap-3 rounded-lg shadow-[5px_5px_2px_2px_#ddd] p-3  items-start relative border border-primary ">
      <div className="w-full ">
        <Image
          src={images[0]?.url}
          width={300}
          height={200}
          alt="booking"
          className="w-full h-full object-cover rounded-md "
        ></Image>
      </div>
      <div className="w-full ">
        <div>
          <h3 className="text-lg font-semibold text-capitalize">{title}</h3>
          <p className="text-blue-600 text-sm capitalize underline">
            {category}
          </p>
        </div>
        <div className="mt-3  flex flex-row gap-1 md:gap-2 justify-between items-end  ">
          <div className="flex justify-end items-start absolute top-5 right-5 md:top-3 md:right-3 gap-1 ">
            <div className="flex flex-col items-end ">
              <h5 className="text-sm font-medium">Review Score</h5>
              <p className="text-xs font-medium">2 reviews</p>
            </div>
            <div className="p-1 py-1 inline-block bg-blue-500 text-lg rounded-md text-white">
              6.5
            </div>
          </div>
          <div>
            <h3 className="text-sm capitalize font-semibold ">Facilites</h3>
            <ul className="text-xs flex flex-col gap-[2px] text-black">
              {facilities.map((i: any, idx: any) => (
                <li key={idx}>
                  <span> - </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <h5 className="text-2xl font-bold uppercase ">BDT {pricing}</h5>
            <ActionButton
              handleAction={() => router.push(`/${building}/${room?._id}`)}
              containerStyles="bg-black hover:bg-primary duration-300   text-xs rounded-md text-white py-2"
            >
              show details
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
