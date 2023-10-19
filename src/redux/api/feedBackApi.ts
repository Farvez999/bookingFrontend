// import { Feedback } from '@/components/feedback/feedback';
// import { Feedback } from '@/components/feedback/feedback';
import { tagTypes } from "@/shared/tagTypes";
import { baseApi } from "./baseApi";

const feedbackapi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postafeedback: build.mutation({
      query: (data) => ({
        url: `/feedback`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.Feedback],
    }),

    getallfeedback: build.query({
      query: (arg) => ({
        url: "/feedback",
        method: "GET",
        params: arg,
      }),

      providesTags: [tagTypes.Feedback],
    }),
  }),
});

//   blog
export const { usePostafeedbackMutation, useGetallfeedbackQuery } = feedbackapi;
