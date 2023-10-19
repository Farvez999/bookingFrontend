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
import { useGetallbookingsQuery } from "@/redux/api/bookingApi";
import { format } from "date-fns";
import {
  useDeleteBlogMutation,
  useGetallblogsQuery,
} from "@/redux/api/contentApi";
import Image from "next/image";

const Createroom = () => {
  const router = useRouter();
  const { data } = useGetallblogsQuery(undefined);
  const [deleteblog] = useDeleteBlogMutation();
  const [deleteAroom, { isError: deleterrortrue, error: deleteerror }] =
    useDeleteroomsMutation();
  const handleDelete = async (id: string) => {
    const res: any = await deleteblog(id);
    if (res?.data?._id) {
      Swal.fire("Good job!", "blog deleted", "success");
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
        <h2 className="text-xl font-semibold text-secondary">All Blogs</h2>
        <button
          onClick={() =>
            router.push("/dashboard/content-management/blog/create")
          }
          className="btn  btn-sm btn-primary font-bold"
        >
          Post a blog
        </button>
      </div>
      <div>
        <TableHeader
          fields={["S.I", "blog title", "createdAt", "Action"]}
          containerStyles="table  bg-secondary text-center"
        >
          {data?.map((blog: any, idx: number) => (
            <TableRow
              key={blog?._id}
              styles={`text-xs ${idx % 2 === 1 && "bg-orange-500"}`}
            >
              <TableCol styles="text-xs">{idx + 1}</TableCol>

              <TableCol styles="text-xs">{blog.title}</TableCol>
              <TableCol styles="text-xs">
                {format(new Date(blog?.updatedAt), "yyyy MMM dd")}
              </TableCol>
              <TableCol styles="text-xs">
                <div className="flex items-center justify-center gap-1">
                  <button onClick={() => handleDelete(blog?._id)}>
                    <RiDeleteBin5Fill size={20}></RiDeleteBin5Fill>
                  </button>
                  <Link
                    href={`/dashboard/content-management/blog/${blog?._id}`}
                  >
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
