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
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
const UserManagement = () => {
  const [email, setSearchTerm] = useState();
  const query: any = {};
  if (email) {
    query["email"] = email;
  }
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useGetUserQuery({ ...query });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>({});
  console.log(data, isLoading, isError, error);
  const [deleteuser, { isError: delteError }] = useDeleteuserMutation();
  const router = useRouter();
  const handleDelete = async (id: string) => {
    const res: any = await deleteuser(id);
    console.log(res);
    if (res?.data?.email) {
      Swal.fire("Good job!", "profile created", "success");
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
            All users
          </h2>
          <input
            type="text"
            placeholder="search here"
            onChange={(e: any) => setSearchTerm(e.target.value)}
            className="input input-bordered mb-2 input-accent "
          />
        </div>
        <button
          onClick={() => router.push("/dashboard/user-management/create-user")}
          className="btn  btn-sm btn-primary font-bold"
        >
          create a user
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
            "Action",
          ]}
          containerStyles="table  bg-secondary text-center"
        >
          {data?.map((user: any, idx: number) => (
            <TableRow
              key={user?._id}
              styles={`text-xs ${idx % 2 === 1 && "bg-primary"}`}
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
              <TableCol styles="text-xs">
                <div className="flex items-center justify-center gap-1">
                  <button onClick={() => handleDelete(user?._id)}>
                    <RiDeleteBin5Fill size={20}></RiDeleteBin5Fill>
                  </button>
                  <Link href={`/dashboard/user-management/${user?._id}`}>
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
      {showModal && (
        <CommonModal
          selected={selected}
          setShow={setShowModal}
          containerStyles=""
        >
          <h1 className="py-10">{selected.name}</h1>
        </CommonModal>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(UserManagement), {
  ssr: false,
});
