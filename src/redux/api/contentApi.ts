import { tagTypes } from "@/shared/tagTypes";
import { baseApi } from "./baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postfaq: build.mutation({
      query: (data) => ({
        url: `/content/faq`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    getallfaqs: build.query({
      query: (arg) => ({
        url: "/content/faq",
        method: "GET",
        params: arg,
      }),

      providesTags: [tagTypes.faq],
    }),
    getsinglefaq: build.query({
      query: (id) => ({
        url: `/content/faq/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.faq],
    }),
    updatefaq: build.mutation({
      query: (data) => ({
        url: `/content/faq/${data?.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    deletefaq: build.mutation({
      query: (id) => ({
        url: `/content/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    postblog: build.mutation({
      query: (data) => ({
        url: `/content/blog`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    getallblogs: build.query({
      query: (arg) => ({
        url: "/content/blog",
        method: "GET",
        params: arg,
      }),

      providesTags: [tagTypes.blog],
    }),
    getsingleblog: build.query({
      query: (id) => ({
        url: `/content/blog/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.blog],
    }),
    updateblog: build.mutation({
      query: (data) => ({
        url: `/content/blog/${data?.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    deleteBlog: build.mutation({
      query: (id) => ({
        url: `/content/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

//   blog

export const {
  usePostfaqMutation,
  useGetallfaqsQuery,
  useGetsinglefaqQuery,
  useUpdatefaqMutation,
  useDeletefaqMutation,

  //
  usePostblogMutation,
  useGetallblogsQuery,
  useGetsingleblogQuery,
  useUpdateblogMutation,
  useDeleteBlogMutation,
} = contentApi;
