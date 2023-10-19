"use client";
import CommonModal from "@/components/CommonModal/CommonModal";
import TableCol from "@/components/Table/TableCol";
import TableHeader from "@/components/Table/TableHeader";
import TableRow from "@/components/Table/TableRow";
import {
  useDeleteroomsMutation,
  useGetallroomsQuery,
} from "@/redux/api/roomsApi";
// import { useGetroomQuery } from "@/redux/api/authApi";
// import { useDeleteroomMutation, useGetroomsQuery } from "@/redux/api/roomApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { useGetsingleServiceQuery } from "@/redux/api/serviceApi";

const Createroom = () => {
  const [searchTerm, setSearchTerm] = useState();
  const query: any = {};
  if (searchTerm) {
    query["searchTerm"] = searchTerm;
  }
  const router = useRouter();
  const { data, error, isError, isLoading } = useGetallroomsQuery({ ...query });

  const [deleteAroom, { isError: deleterrortrue, error: deleteerror }] =
    useDeleteroomsMutation();
  const handleDelete = async (id: string) => {
    const res: any = await deleteAroom(id);
    if (res?.data?._id) {
      Swal.fire("Good job!", "room deleted", "success");
    } else if (res?.error?.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${res?.error?.data?.message}`,
      });
    }
  };
  return (
    <div>
      <div className="flex  justify-between py-2 ">
        <div>
          <h2 className="text-xl my-2 font-semibold text-secondary">
            All Rooms Here
          </h2>
          <input
            type="text"
            placeholder="search here"
            onChange={(e: any) => setSearchTerm(e.target.value)}
            className="input input-bordered mb-2 input-accent "
          />
        </div>
        <button
          onClick={() => router.push("/dashboard/room-management/create")}
          className="btn  btn-sm btn-primary font-bold"
        >
          create a room
        </button>
      </div>
      <div>
        <TableHeader
          fields={[
            "S.I",
            "room name",
            "building Name",
            "building Code",
            "category",

            "roomSize",
            "bedSize",
            "pricing",
            "discount",
            "Booking status",
            "Action",
          ]}
          containerStyles="table  bg-secondary text-center"
        >
          {data?.map((room: any, idx: number) => (
            <TableRow
              key={room?._id}
              styles={`text-xs ${idx % 2 === 1 && "bg-primary"}`}
            >
              <TableCol styles="text-xs">{idx + 1}</TableCol>
              <TableCol styles="text-xs">{room.title}</TableCol>
              <TableCol styles="text-xs">{room.building?.name}</TableCol>
              <TableCol styles="text-xs">{room.building?.code}</TableCol>
              <TableCol styles="text-xs">{room.category}</TableCol>

              <TableCol styles="text-xs">{room?.roomSize} Sq Ft</TableCol>
              <TableCol styles="text-xs">{room.bedSize} m.</TableCol>
              <TableCol styles="text-xs">{room.pricing} bdt</TableCol>
              <TableCol styles="text-xs">
                {room.discount ? `${room.discount}` : "no discount"}
              </TableCol>
              <TableCol styles="text-xs">
                {room.isBooked === true ? "under booking" : "rooms free"}
              </TableCol>

              <TableCol styles="text-xs">
                <div className="flex items-center justify-center gap-1">
                  <button onClick={() => handleDelete(room?._id)}>
                    <RiDeleteBin5Fill size={20}></RiDeleteBin5Fill>
                  </button>
                  <Link href={`/dashboard/room-management/${room?._id}`}>
                    <LiaEdit
                      size={20}
                      // onClick={() => {
                      //   setSelected(room);
                      //   setShowModal(true);
                      // }}
                    ></LiaEdit>
                  </Link>
                </div>
              </TableCol>
            </TableRow>
          ))}
        </TableHeader>
      </div>
    </div>
  );
};

export default Createroom;
