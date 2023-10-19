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
import { } from "@/redux/api/contentApi";
import { useGetallfeedbackQuery } from "@/redux/api/feedBackApi";
const UserManagement = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useGetallfeedbackQuery(undefined);

  console.log(data);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>({});

  const router = useRouter();

  return (
    <div>
      <div className="flex  justify-between py-2 ">
        <h2 className="text-xl font-semibold text-secondary">All Feedbacks</h2>
      </div>
      <div>
        <TableHeader
          fields={["S.I", "user email", "Feedback", "postedAt"]}
          containerStyles="table  bg-secondary text-center"
        >
          {data?.map((feedback: any, idx: number) => (
            <TableRow
              key={feedback?._id}
              styles={`text-xs ${idx % 2 === 1 && "bg-orange-500"}`}
            >
              <TableCol styles="text-xs">{idx + 1}</TableCol>
              <TableCol styles="text-xs">{feedback.email}</TableCol>

              <TableCol styles="text-xs">{feedback?.feedback}</TableCol>
              <TableCol styles="text-xs">
                {format(new Date(feedback?.createdAt), "yyyy MMM dd")}
              </TableCol>
            </TableRow>
          ))}
        </TableHeader>
      </div>
    </div>
  );
};

export default UserManagement;
