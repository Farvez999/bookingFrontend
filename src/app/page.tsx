"use client";
import Banner from "@/components/Banner/Banner";
import HotelCard from "@/components/HotelCard/HotelCard";
import InputText from "@/components/InputBox/InputBox";
import InputSelection from "@/components/InputSelection/inputSelection";
import CategoryCard from "@/components/categorycard/CategoryCard";
import Feedback from "@/components/feedback/feedback";

import { useGetservicesQuery } from "@/redux/api/serviceApi";
import { servicecategoryEnum } from "@/shared/enum";
import { ChangeEventType } from "@/types";
import Image from "next/image";
import { useState } from "react";
import ReactPaginate from "react-paginate";

export default function Home() {
  const query: any = {};

  const [page, setPage] = useState(1); // Current page
  const limit = 2; // Set the number of items per page
  query["page"] = page;
  query["limit"] = limit;
  const { data, isLoading, isError, error }: any = useGetservicesQuery({
    ...query,
  });

  console.log(data);
  console.log(query);
  const handlePageClick = (selectedPage: any) => {
    setPage(selectedPage.selected);
    console.log("Obuj Bolok", selectedPage.selected);
  };

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
  query["minPriceRange"] = searchQuery.minPriceRange;
  query["maxPriceRange"] = searchQuery.maxPriceRange;
  query["searchTerm"] = searchQuery.searchTerm;

  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-10 ">
      <Banner></Banner>
      <div className="grid grid-cols-1 md:grid-cols-3 items-center w-[90%] gap-3 bg-secondary px-10 rounded-md  md:rounded-full py-5 z-[99] -mt-[150px] md:-mt-[80px] shadow-[2px_2px_2px_2px_#ddd]">
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
      <h1 className="text-3xl font-bold mt-4 text-[#10B981]">
        avilable Hotels For Booking
      </h1>
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
      <div className="">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={data?.length + 1} // You can pass 0 here if you don't want to display page count
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
      <h1 className="text-3xl font-bold my-4 text-blue-500">
        Search By Apartment Category
      </h1>
      <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1">
        <CategoryCard />
      </div>

      {/* upcoming */}

      <h1 className="text-3xl font-bold mt-6 text-center text-[#10B981]">
        Upcoming Services For Booking
      </h1>
      <div className="w-full grid  grid-cols-1 md:grid-cols-2 px-10 py-10 gap-5">
        {data
          ?.filter((servicedata: any) => servicedata?.status === "upcoming")
          .map((filteredServiceData: any) => (
            <HotelCard
              serviceData={filteredServiceData}
              key={filteredServiceData._id}
            />
          ))}
      </div>

      <h1 className="text-3xl mb-6 font-bold mt-6 text-center text-blue-500">
        Submit Your Valuable Feedback here
      </h1>
      <Feedback></Feedback>
    </main>
  );
}
