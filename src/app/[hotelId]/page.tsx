"use client";
import RoomCard from "@/components/RoomCard/RoomCard";
import { useGetsingleServiceQuery } from "@/redux/api/serviceApi";
import Image from "next/image";
import { AiFillCaretRight } from "react-icons/ai";
const SingleHotelDetails = (props: any) => {
  console.log(props.params.hotelId);
  console.log("Data");
  const { data, isLoading, error } = useGetsingleServiceQuery(
    props?.params?.hotelId
  );
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
  } = data || {};

  return (
    <div className="flex items-center justify-center flex-col gap-5">
      <div className="w-[95%] my-10 mx-auto bg-secondary md:p-10 p-5 shadow-[5px_5px_5px_5px_#ddd] rounded-lg">
        <h2 className="text-xl font-bold uppercase">{name}</h2>
        <h5 className="py-4 text-emerald-700">{locationInDetails}</h5>
        <div className="grid  grid-cols-1 md:grid-cols-3 gap-4 my-3">
          {images?.map((image: any, idx: number) => (
            <Image
              src={image.url}
              key={idx}
              alt="hotel image"
              className={`w-full rounded-xl h-auto ${idx === 0 && "md:col-span-2 row-span-2  "
                }`}
              width={100}
              height={100}
            ></Image>
          ))}
        </div>
        <h3 className="font-bold bg-orange-500">Facilites:</h3>
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
        <h3 className="font-bold bg-orange-500">Description:</h3>
        <p className="text-black text-bold py-4 ">{description}</p>
        <div></div>
      </div>
      <div className="w-[95%] ">
        <h3 className="text-2xl font-medium  capitalize text-red-500">
          Available Rooms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-10">
          {rooms?.map((room: any) => (
            <RoomCard key={room?._id} room={room}></RoomCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleHotelDetails;
