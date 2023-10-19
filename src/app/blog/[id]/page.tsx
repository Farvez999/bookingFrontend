"use client";
import { useGetsingleblogQuery } from "@/redux/api/contentApi";
import Image from "next/image";
import React from "react";

const DetailsBlog = ({ params }: any) => {
  const { data } = useGetsingleblogQuery(params?.id);
  return (
    <div className="container mx-auto h-screen ">
      <div className="flex lg:flex-row flex-col lg:mt-24 justify-between items-center">
        <div>
          <Image src={data?.image} alt="blogimage"></Image>
        </div>
        <div className="text-end ">
          <h5 className="text-2xl text-blue-500 font-bold mb-2">
            {data?.title}
          </h5>
          <p className="text-red-500 my-4 font-bold">{data?.category}</p>
          <p>{data?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsBlog;
