import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,

  tagTypes: ["User"], // caching ke liye
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),

    loginUser: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),

    getUserDetails: builder.query<any, void>({
      query: () => {
        let url = "/me";
        if (typeof window !== "undefined") {
          const activeOrg = JSON.parse(
            localStorage.getItem("activeOrg") || "null"
          );
          const params = new URLSearchParams();
          if (activeOrg?.id != null) {
            params.append("organization_id", activeOrg.id);
            url += `?${params.toString()}`;
          }
        }
        return url;
      },
    }),

    logout: builder.mutation<any, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
       
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLoginUserMutation,
  useCreateUserMutation,
  useLogoutMutation,
  useGetUserDetailsQuery
} = AuthApi;
