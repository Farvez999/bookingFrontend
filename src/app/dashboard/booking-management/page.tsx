"use client";
import CommonModal from "@/components/CommonModal/CommonModal";
import TableCol from "@/components/Table/TableCol";
import TableHeader from "@/components/Table/TableHeader";
import TableRow from "@/components/Table/TableRow";
import {
  useGetallbookingsQuery,
  useResetBookingStautsMutation,
  useUpdateBookingStatusByadminMutation,
  useUpdatebookingMutation,
} from "@/redux/api/bookingApi";
import {
  useDeleteroomsMutation,
  useGetallroomsQuery,
} from "@/redux/api/roomsApi";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const BookingManagement = () => {
  const [searchTerm, setSearchTerm] = useState();
  const query: any = {};
  if (searchTerm) {
    query["searchTerm"] = searchTerm;
  }
  const { data } = useGetallbookingsQuery({ ...query });
  const router = useRouter();
  const [updatebookingstatus, { error: statusError }] =
    useUpdateBookingStatusByadminMutation();
  const [resetbooking, { isError: reseterror }] =
    useResetBookingStautsMutation();

  //   const handleDelete = async (id: string) => {
  //     const res: any = await deleteAroom(id);
  //     if (res?.data?._id) {
  //       Swal.fire("Good job!", "room deleted", "success");
  //     } else if (res?.error?.status === 400) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: `${res?.error?.data?.message}`,
  //       });
  //     }
  //   };

  //   update statuses
  const cancelBooking = async (id: string) => {
    const res: any = await updatebookingstatus({
      id: id,
      body: { status: "cancelled" },
    });

    if (!statusError) {
      Swal.fire("Good job!", "booking status cancelled", "success");
    } else if (statusError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${res?.error?.data?.message}`,
      });
    }
  };
  const approoveBooking = async (id: string) => {
    const res: any = await updatebookingstatus({
      id: id,
      body: { status: "confirmed" },
    });

    console.log(res);
    if (!statusError) {
      Swal.fire("Good job!", "booking status updated", "success");
    } else if (statusError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${res?.error?.data?.message}`,
      });
    }
  };
  const resetBookingToCloseAndRootStatusChanged = async (id: string) => {
    const res: any = await resetbooking(id);
    console.log(id);
    console.log(res);
    if (res?.data?.bookingNo) {
      Swal.fire("Good job!", "booking status reset successfully", "success");
    } else if (statusError) {
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
            All Bookings Here
          </h2>
          <input
            type="text"
            placeholder="search here"
            onChange={(e: any) => setSearchTerm(e.target.value)}
            className="input input-bordered mb-2 input-accent "
          />
        </div>
      </div>
      <div>
        <TableHeader
          fields={[
            "S.I",
            "booking Number",
            "user name",
            "user email",
            "user phone",
            "roomId",
            "total fee",
            "discount",
            "checkInDate",
            "checkOutDate",
            "booking status",
            "pay status",
            "Action",
          ]}
          containerStyles="table  bg-secondary text-center"
        >
          {data?.map((booking: any, idx: number) => (
            <TableRow
              key={booking?._id}
              styles={`text-xs ${idx % 2 === 1 && "bg-primary"}`}
            >
              <TableCol styles="text-xs">{idx + 1}</TableCol>
              <TableCol styles="text-xs">{booking?.bookingNo}</TableCol>
              <TableCol styles="text-xs">{booking?.user.name}</TableCol>
              <TableCol styles="text-xs">{booking?.user?.email}</TableCol>
              <TableCol styles="text-xs">{booking?.user?.phone}</TableCol>
              <TableCol styles="text-xs">{booking?.room?.roomId}</TableCol>

              <TableCol styles="text-xs">{booking?.totalFee}</TableCol>
              <TableCol styles="text-xs">{booking?.discount}</TableCol>
              <TableCol styles="text-xs">{booking?.checkInDate}</TableCol>
              <TableCol styles="text-xs">{booking?.checkOutDate}</TableCol>

              <TableCol styles="text-xs">{booking?.status}</TableCol>
              <TableCol styles="text-xs">{booking?.payStatus}</TableCol>

              <TableCol styles="text-xs">
                {(booking.status === "closed" && "closed") ||
                  (booking?.status === "cancelled" && (
                    <button
                      className="btn btn-xs text-white border-0 bg-red-500"
                      onClick={() =>
                        resetBookingToCloseAndRootStatusChanged(booking?._id)
                      }
                    >
                      close
                    </button>
                  )) ||
                  (booking?.status === "confirmed" && (
                    <button
                      className="btn btn-xs text-white border-0 bg-red-500"
                      onClick={() =>
                        resetBookingToCloseAndRootStatusChanged(booking?._id)
                      }
                    >
                      close
                    </button>
                  )) ||
                  (booking.status === "pending" && (
                    <div className="flex items-center justify-center gap-1">
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={() => cancelBooking(booking?._id)}
                      >
                        reject
                      </button>
                      <button
                        className="btn btn-xs bg-yellow-600 border-0 text-white"
                        onClick={() => approoveBooking(booking?._id)}
                      >
                        approve
                      </button>
                      <button
                        className="btn btn-xs text-white border-0 bg-red-500"
                        onClick={() =>
                          resetBookingToCloseAndRootStatusChanged(booking?._id)
                        }
                      >
                        close
                      </button>
                    </div>
                  ))}
              </TableCol>
            </TableRow>
          ))}
        </TableHeader>
      </div>
    </div>
  );
};

export default BookingManagement;
