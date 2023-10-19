import Cookies from "universal-cookie";
import { baseApi } from "./baseApi";
import { tagTypes } from "@/shared/tagTypes";
const cookie = new Cookies();
const userId = cookie.get("userId");
const authAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `/auth/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    postuser: build.mutation({
      query: (signupData) => ({
        url: `/user/signup`,
        method: "POST",
        data: signupData,
      }),
      invalidatesTags: [tagTypes.signup],
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `/user/my-profile/${data?.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.updateuser],
    }),
    getUser: build.query({
      query: (args) => ({
        url: "/user/",
        method: "GET",
        params: args,
      }),

      providesTags: [tagTypes.updateuser, tagTypes.signup, tagTypes.delete],
    }),
    getSingleUser: build.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.updateuser, tagTypes.signup, tagTypes.delete],
    }),
    getuserprofile: build.query({
      query: (id) => ({
        url: `/user/my-profile/${userId}`,
        method: "GET",
      }),

      providesTags: [tagTypes.updateuser, tagTypes.signup, tagTypes.delete],
    }),
    deleteuser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.delete],
    }),
    postreveiwandrating: build.mutation({
      query: (data) => ({
        url: `/room/review/${data?.id}`,
        method: "PATCH",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.review],
    }),
    getreviews: build.mutation({
      query: (id) => ({
        url: `/room/review/${id}`,
        method: "GET",
      }),
      invalidatesTags: [tagTypes.review],
    }),
    makeAdmin: build.mutation({
      query: (data) => ({
        url: `/user/manage-role/${data?.id}`,
        method: "PATCH",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.delete],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useGetUserQuery,
  useDeleteuserMutation,
  usePostuserMutation,
  useUpdateUserMutation,
  useGetuserprofileQuery,
  useGetSingleUserQuery,
  useMakeAdminMutation,

  usePostreveiwandratingMutation,
  useGetreviewsMutation,
} = authAPI;
