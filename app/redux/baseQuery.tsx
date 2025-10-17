import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BACKEND_URL,
  prepareHeaders: (headers) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const activeOrg =
      typeof window !== "undefined" ? localStorage.getItem("activeOrg") : null;

    if (token) headers.set("Authorization", `Bearer ${JSON.parse(token)}`);
    if (activeOrg) {
      const org = JSON.parse(activeOrg);
      if (org?.id) headers.set("organization_id", org.id);
    }
    return headers;
  },
});

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log("Token expired — handle refresh or logout");
    
  }

  return result;
};
