"use client";
import TableCol from "@/components/Table/TableCol";
import TableHeader from "@/components/Table/TableHeader";
import TableRow from "@/components/Table/TableRow";
import { useDeleteuserMutation, useGetUserQuery } from "@/redux/api/authApi";
import { format } from "date-fns";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { LiaEdit } from "react-icons/lia";
import { useState } from "react";
import CommonModal from "@/components/CommonModal/CommonModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  useDeletefaqMutation,
  useGetallfaqsQuery,
} from "@/redux/api/contentApi";
const UserManagement = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useGetallfaqsQuery(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>({});
  console.log(data, isLoading, isError, error);
  const [deletefaq, { isError: delteError }] = useDeletefaqMutation();

  const router = useRouter();
  const handleDelete = async (id: string) => {
    const res: any = await deletefaq(id);
    console.log(res);
    if (res?.data?._id) {
      Swal.fire("Good job!", "faq deleted", "success");
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
        <h2 className="text-xl font-semibold text-secondary">All faqs</h2>
        <button
          onClick={() =>
            router.push("/dashboard/content-management/faq/create")
          }
          className="btn  btn-sm btn-primary font-bold"
        >
          create a faq
        </button>
      </div>
      <div>
        <TableHeader
          fields={["S.I", "question", "description", "createdAt", "Action"]}
          containerStyles="table  bg-secondary text-center"
        >
          {data?.map((faq: any, idx: number) => (
            <TableRow
              key={faq?._id}
              styles={`text-xs ${idx % 2 === 1 && "bg-orange-500"}`}
            >
              <TableCol styles="text-xs">{idx + 1}</TableCol>
              <TableCol styles="text-xs">{faq.title}</TableCol>

              <TableCol styles="text-xs">{faq?.description}</TableCol>
              <TableCol styles="text-xs">
                {format(new Date(faq?.updatedAt), "yyyy MMM dd")}
              </TableCol>

              <TableCol styles="text-xs">
                <div className="flex items-center justify-center gap-1">
                  <button onClick={() => handleDelete(faq._id)}>
                    <RiDeleteBin5Fill size={20}></RiDeleteBin5Fill>
                  </button>
                  <Link href={`/dashboard/content-management/faq/${faq?._id}`}>
                    <LiaEdit
                      size={20}
                    // onClick={() => {
                    //   setSelected(user);
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

export default UserManagement;
