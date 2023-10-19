"use client";

import Image from "next/image";
import Link from "next/link";
import { features } from "process";
import ActionButton from "../Buttons/ActionButton";
import { useRouter } from "next/navigation";

const HotelCard = ({ serviceData }: any) => {
  const {
    rooms,
    comments,
    maxPriceRange,
    minPriceRange,
    description,
    facilities,
    images,
    location,
    category,
    locationInDetails,
    name,
    status,
  } = serviceData;
  const router = useRouter();
  const featues = [
    "4 beds ( 1 twin, 3 full )",
    "free cancellation",
    "no prepayment need",
  ];

  return (
    <div className="w-full flex  md:flex-row flex-col gap-3 rounded-lg shadow-[5px_5px_2px_2px_#ddd] p-3  items-start relative border border-primary ">
      <div className="w-full md:w-1/3">
        <Image
          src={images[0]?.url}
          width={400}
          height={300}
          alt="booking"
          className="w-full h-full object-cover rounded-md "
        ></Image>
      </div>
      <div className="w-full md:w-2/3">
        <div>
          <h3 className="text-lg font-semibold text-capitalize">{name}</h3>
          <p className="text-orange-600 text-sm capitalize underline">
            {location}
          </p>
        </div>
        <div className="mt-3  flex flex-row gap-1 md:gap-2 justify-between items-end  ">
          <div className="flex justify-end items-start absolute top-5 right-5 md:top-3 md:right-3 gap-1 ">
            <div className="flex flex-col items-end "></div>
            <div
              className={`p-1 py-1 inline-block ${status === "upcoming" ? "bg-red-500" : "bg-blue-500"
                } text-lg rounded-md text-white`}
            >
              {status}
            </div>
          </div>
          <div>
            <h5 className="mb-2">
              category:
              <span className="font-bold text-red-500">{category}</span>
            </h5>
            <h3 className="text-sm capitalize font-semibold ">Facilites</h3>
            <ul className="text-xs flex flex-col gap-[2px] text-black">
              {facilities.map((i: any, idx: any) => (
                <li key={idx}>
                  <span> - </span>
                  {i}
                </li>
              ))}
            </ul>
            <h5 className="mt-4 font-bold text-orange-600">
              {locationInDetails}
            </h5>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <h5 className="text-2xl font-bold uppercase text-[#3B82F6] ">
              Start From BDT{" "}
              <span className="text-red-500"> {minPriceRange}</span>
            </h5>
            <ActionButton
              disabled={status === "upcoming"}
              handleAction={() => router.push(serviceData?._id)}
              containerStyles="bg-black hover:bg-orange-500 duration-300    text-xs rounded-md text-white py-2"
            >
              {status === "upcoming" ? "upcoming" : " See Availability"}
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
