import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://reqres.in/" }),
  endpoints: builder => ({
    signup: builder.mutation({
      query: body => ({
        url: "/signup",
        method: "POST",
        body,
      }),
    }),
    signin: builder.mutation({
      query: body => ({
        url: "/api/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignupMutation, useSigninMutation } = authApi;
