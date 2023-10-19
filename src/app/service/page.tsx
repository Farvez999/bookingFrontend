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
  const [searchQuery, setSearchQuery] = useState<any>({
    searchTerm: "",
    minPriceRange: 0,
    maxPriceRange: 10000,
    category: "",
  });

  const handleText: ChangeEventType = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearchQuery({ ...searchQuery, [name]: value });
  };

  const handleRange: ChangeEventType = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearchQuery({ ...searchQuery, [name]: parseInt(value) });
  };

  console.log(searchQuery);

  query["category"] = searchQuery?.category;
  //   query["minPriceRange"] = searchQuery.minPriceRange;
  //   query["maxPriceRange"] = searchQuery.maxPriceRange;
  query["searchTerm"] = searchQuery.searchTerm;

  const { data, isLoading, isError, error }: any = useGetservicesQuery({
    ...query,
  });

  console.log("query", query);

  console.log(query);
  return (
    <div className="flex min-h-screen flex-col items-center  pb-10">
      <h1 className="text-2xl my-6 font-bold text-blue-600">
        Our All AVilable Apartments for Booking
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3  items-center w-[90%] gap-3 bg-secondary px-10 rounded-sm  md:rounded-full  shadow-[2px_2px_2px_2px_#ddd]">
        <InputText
          label="Search Keyword"
          type="text"
          name="searchTerm"
          placeholder="search hotel"
          onChange={handleText}
          styles="rounded-xl "
        ></InputText>
        <div className="flex flex-col gap-[2px] md:px-5">
          <InputText
            label="min Price"
            type="range"
            name="minPriceRange"
            min={1000}
            max={10000}
            onChange={handleRange}
          ></InputText>
          <InputText
            label="max price"
            type="range"
            name="maxPriceRange"
            min={10001}
            max={20000}
            onChange={handleRange}
          ></InputText>
        </div>
        <InputSelection
          label="By category"
          data={searchQuery}
          setData={setSearchQuery}
          field="category"
          selectOp="select category"
          options={servicecategoryEnum}
        ></InputSelection>
      </div>

      <div className="w-full grid  grid-cols-1 md:grid-cols-2 px-10 py-10 gap-5">
        {data
          ?.filter((servicedata: any) => servicedata?.status === "in progress")
          .map((filteredServiceData: any) => (
            <HotelCard
              serviceData={filteredServiceData}
              key={filteredServiceData._id}
            />
          ))}
      </div>
    </div>
  );
};

export default Services;
