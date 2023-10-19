import { tagTypes } from "@/shared/tagTypes";
import { baseApi } from "./baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postAbooking: build.mutation({
      query: (data) => ({
        url: `/booking/${data?.id}`,
        method: "POST",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    getallbookings: build.query({
      query: (arg) => ({
        url: "/booking/",
        method: "GET",
        params: arg,
      }),

      providesTags: [tagTypes.booking],
    }),
    getsinglebooking: build.query({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.booking],
    }),
    updatebooking: build.mutation({
      query: (data) => ({
        url: `/booking/${data?.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    deletebooking: build.mutation({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    cancelbooking: build.mutation({
      query: (id) => ({
        url: `/booking/cancel-booking/${id}`,
        method: "PATCH",
      }),

      invalidatesTags: [tagTypes.booking],
    }),
    resetBookingStauts: build.mutation({
      query: (id) => ({
        url: `/booking/reset-status/${id}`,
        method: "PATCH",
      }),

      invalidatesTags: [tagTypes.booking],
    }),
    updateBookingStatusByadmin: build.mutation({
      query: (data) => ({
        url: `/booking/update-status/${data?.id}`,
        method: "PATCH",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),

  // blog post
});

export const {
  useGetallbookingsQuery,
  usePostAbookingMutation,
  useUpdatebookingMutation,
  useUpdateBookingStatusByadminMutation,
  useResetBookingStautsMutation,
  useGetsinglebookingQuery,
  useDeletebookingMutation,
  useCancelbookingMutation,
} = bookingApi;
