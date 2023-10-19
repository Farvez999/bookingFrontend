import { tagTypes } from "@/shared/tagTypes";
import { baseApi } from "./baseApi";

const serviceapi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createHotel: build.mutation({
      query: (data) => ({
        url: `/service/`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.createservice],
    }),
    updateservice: build.mutation({
      query: (data) => ({
        url: `/service/${data?.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.updateservice],
    }),
    getservices: build.query({
      query: (arg) => ({
        url: "/service/",
        method: "GET",
        params: arg,
        data: arg,
      }),

      providesTags: [
        tagTypes.createservice,
        tagTypes.updateservice,
        tagTypes.deleteservice,
      ],
    }),
    getsingleService: build.query({
      query: (id) => ({
        url: `/service/${id}`,
        method: "GET",
      }),

      providesTags: [
        tagTypes.createservice,
        tagTypes.updateservice,
        tagTypes.deleteservice,
      ],
    }),
    getallservicesforcheck: build.query({
      query: () => ({
        url: "/service/",
        method: "GET",
      }),

      providesTags: [
        tagTypes.createservice,
        tagTypes.updateservice,
        tagTypes.deleteservice,
      ],
    }),

    deleteService: build.mutation({
      query: (id) => ({
        url: `/service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.deleteservice],
    }),
  }),
});

export const {
  useGetservicesQuery,
  useGetsingleServiceQuery,
  useCreateHotelMutation,
  useUpdateserviceMutation,
  useDeleteServiceMutation,
  useGetallservicesforcheckQuery,
} = serviceapi;
