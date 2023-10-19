"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import InputSelection from "@/components/InputSelection/inputSelection";
import { servicecategoryEnum } from "@/shared/enum";
import InputText from "@/components/InputBox/InputBox";
import { ChangeEventType } from "@/types";
import { useGetservicesQuery } from "@/redux/api/serviceApi";
import HotelCard from "@/components/HotelCard/HotelCard";
const Services = () => {
  const query: any = {};

  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  if (category) {
    query["category"] = category;
  }

  const { data, isLoading, isError, error }: any = useGetservicesQuery({
    ...query,
  });

  console.log("query", query);

  console.log(query);
  return (
    <div className="flex min-h-screen flex-col items-center  pb-10">
      <h1 className="text-2xl my-6 font-bold text-blue-600">
        Our Categories Services
      </h1>

      <div className="w-full grid  grid-cols-1 md:grid-cols-2 px-10 py-10 gap-5">
        {data?.map((data: any) => (
          <HotelCard serviceData={data} key={data._id} />
        ))}
      </div>
    </div>
  );
};

export default Services;
