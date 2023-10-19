"use client";

import Link from "next/link";
import Image from "next/image";
import ProfileCard from "@/components/profileCard/ProfileCard";
import ProfileRow from "@/components/ProfileRow/ProfileRow";
import ActionButton from "@/components/Buttons/ActionButton";
import { useEffect, useState } from "react";
import CommonModal from "@/components/CommonModal/CommonModal";
import ProfileEdit from "@/components/ProfileEdit";
import { useGetuserprofileQuery } from "@/redux/api/authApi";
import { Cookie } from "next/font/google";
import Cookies from "universal-cookie";
// import { useState, } from "react";
const DashboardPage = () => {
  const cookie = new Cookies();
  const id = cookie.get("userId");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [user, setuser] = useState<any>({});
  const { data } = useGetuserprofileQuery(undefined);

  useEffect(() => {
    if (data) {
      setuser(data);
    }
  }, [data]);
  //   const {
  //     name,
  //     email,
  //     phoneNumber,
  //     profileImg: { url },
  //     preferences: { address, language, nationality },
  //   } = data;
  return (
    <div className="flex items-start justify-center w-full relative">
      <div className=" w-[90%] md:w-[80%] bg-secondary  py-3 rounded-lg">
        <div className="border-b border-black pb-4 px-3 flex items-center  justify-between">
          <h1>Profile Information</h1>
          <ActionButton
            containerStyles="bg-black text-white rounded-md  hover:scale-75 cursor-pointer "
            handleAction={() => setShowModal(true)}
          >
            Edit
          </ActionButton>
        </div>

        <h1 className="flex justify-end me-4 mt-2 text-[#10B981]  font-bold">
          Personal Information
        </h1>

        <div className=" text-xs md:text-base flex flex-col md:flex-row mt-5 items-center justify-start px-3 w-full">
          <div className="w-full mb-3 flex items-center justify-center  md:w-[240px]">
            <ProfileCard
              name={user?.name}
              email={user?.email}
              location={user?.address ? user?.address : "not set yet"}
              image={
                user?.profileImg?.url
                  ? user?.profileImg?.url
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
              }
            />
          </div>
          <div className="w-full ">
            <ProfileRow
              propertyName="name"
              propertyValue={user?.name}
              containerStyles="bg-gray-200"
            />
            <ProfileRow propertyName="email" propertyValue={user?.email} />
            <ProfileRow
              propertyName="isEmailVerified"
              propertyValue="pending"
              containerStyles="bg-gray-200"
            />
            <ProfileRow
              propertyName="Contact"
              propertyValue={user?.phoneNumber}
            />
            <ProfileRow
              propertyName="Gender"
              propertyValue={user?.gender ? user?.gender : "not set yet"}
              containerStyles="bg-gray-200"
            />
            <h1 className="flex justify-end me-4 mt-2 text-[#10B981]  font-bold">
              preferences
            </h1>
            <ProfileRow
              propertyName="nationality"
              propertyValue={
                user?.nationality ? user?.nationality : "not set yet"
              }
            />
            <ProfileRow
              propertyName="language"
              propertyValue={user?.language ? user?.language : "not set yet"}
              containerStyles="bg-gray-200"
            />
            <ProfileRow
              propertyName="Address"
              propertyValue={user?.address ? user?.address : "not set yet"}
            />
          </div>
        </div>
      </div>
      {showModal && (
        <CommonModal containerStyles="" setShow={setShowModal}>
          <ProfileEdit setShow={setShowModal} datas={data}></ProfileEdit>
        </CommonModal>
      )}
    </div>
  );
};

export default DashboardPage;

//  961528
