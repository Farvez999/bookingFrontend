"use client";
import TableCol from "@/components/Table/TableCol";
import TableHeader from "@/components/Table/TableHeader";
import TableRow from "@/components/Table/TableRow";
import {
  useDeleteuserMutation,
  useGetUserQuery,
  useMakeAdminMutation,
} from "@/redux/api/authApi";
import { format } from "date-fns";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { LiaEdit } from "react-icons/lia";
import { useState } from "react";
import CommonModal from "@/components/CommonModal/CommonModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
const UserManagement = () => {
  const { data = [], isLoading, isError, error } = useGetUserQuery(undefined);

  const [mangeadminrole, { isError: roleError }] = useMakeAdminMutation();
  const router = useRouter();

  const makeadmin = async (id: string) => {
    const res: any = await mangeadminrole({ id: id, body: { role: "admin" } });
    if (!roleError) {
      Swal.fire("Good job!", "user role updated", "success");
    } else if (res?.error?.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${res?.error?.data?.message}`,
      });
    }
  };
  const removeadmin = async (id: string) => {
    const res: any = await mangeadminrole({ id: id, body: { role: "user" } });
    console.log(res);
    if (!roleError) {
      Swal.fire("Good job!", "user role updated", "success");
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
        <h2 className="text-xl font-semibold text-secondary">
          Admin Management
        </h2>
        <button
          onClick={() => router.push("/dashboard/admin-management/create")}
          className="btn  btn-sm btn-primary font-bold"
        >
          create a admin
        </button>
      </div>
      <div>
        <TableHeader
          fields={[
            "S.I",
            "name",
            "email",
            "phone",
            "createdAt",
            "updatedAt",
            "role",
            "Action",
          ]}
          containerStyles="table  bg-secondary text-center"
        >
          {data?.map((user: any, idx: number) => (
            <TableRow
              key={user?._id}
              styles={`text-xs ${idx % 2 === 1 && "bg-orange-500"}`}
            >
              <TableCol styles="text-xs">{idx + 1}</TableCol>
              <TableCol styles="text-xs">{user.name}</TableCol>
              <TableCol styles="text-xs">{user.email}</TableCol>
              <TableCol styles="text-xs">{user.phoneNumber}</TableCol>
              <TableCol styles="text-xs">
                {format(new Date(user?.updatedAt), "yyyy MMM dd")}
              </TableCol>
              <TableCol styles="text-xs">
                {format(new Date(user?.updatedAt), "yyyy MMM dd")}
              </TableCol>
              <TableCol styles="text-xs">{user.role}</TableCol>
              <TableCol styles="text-xs">
                {user?.role === "user" ? (
                  <button
                    className="btn btn-primary btn-xs"
                    onClick={() => makeadmin(user?._id)}
                  >
                    make admin
                  </button>
                ) : (
                  <button
                    className="btn  btn-error text-white bg-red-500 border-0 btn-xs"
                    onClick={() => removeadmin(user?._id)}
                  >
                    remove admin
                  </button>
                )}
              </TableCol>
            </TableRow>
          ))}
        </TableHeader>
      </div>
    </div>
  );
};

export default UserManagement;
