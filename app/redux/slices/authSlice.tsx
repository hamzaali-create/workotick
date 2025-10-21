"use client";
import { createSlice } from "@reduxjs/toolkit";
import { AuthApi } from "../services/auth";
import { ActiveOrganization } from "@/type/activeOrganization";
import { User } from "@/type/user";

interface Organization {
  id: string;
  name: string;
}

interface AuthState {
  isAuthenticated: any;
  user: User | undefined;
  token: string | undefined;
  activeOrganization: ActiveOrganization | null;
  loading: boolean;
  error: string;
}

let user: any = null;
let activeOrg: any = null;
let token: any = null;

if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem("user");
  console.log(storedUser, "localStorage")
  if (storedUser) user = storedUser;
}

if (typeof window !== "undefined") {
  const storedactiveOrgString = localStorage.getItem("activeOrg");
   console.log(storedactiveOrgString, "storedactiveOrgString")
  if (storedactiveOrgString) {
    const storedactiveOrg = JSON.parse(storedactiveOrgString);
    if (storedactiveOrg) {
      activeOrg = storedactiveOrg;
    }
  }
}

if (typeof window !== "undefined") {
  const storedToken = localStorage.getItem("token");
  if (storedToken) token = storedToken;
}

const initialState: AuthState = {
  isAuthenticated: !!user,
  user: user || {},
  token: token,
  activeOrganization: activeOrg,
  loading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    destroySession: (state, action) => {
      state.isAuthenticated = false;
      state.activeOrganization = null;
      state.user = undefined;
      state.token = undefined;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("activeOrg");
    },
    setAuthenticated: (state, { payload }) => {
      state.isAuthenticated = true;
      state.user = payload.user;
      state.token = payload.token;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user ?? {}));
    },
    updateUser: (state, { payload }: any) => {
      const activeOrg = payload.organizations.find(
        (organization: any) => organization.id === state?.activeOrganization?.id
      );
      if (activeOrg) {
        state.activeOrganization = activeOrg;
        localStorage.setItem("activeOrg", JSON.stringify(activeOrg));
      }
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },

    setActiveOrganization: (state, { payload }) => {
      state.activeOrganization = payload;
      localStorage.setItem("activeOrg", JSON.stringify(payload));
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      AuthApi.endpoints.logout.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = false;
        state.activeOrganization = null;
        state.user = undefined;
        state.token = undefined;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("activeOrg");
        state.loading = true;
      }
    );

    builder.addMatcher(
      AuthApi.endpoints.logout.matchRejected,
      (state, { error }) => {
        state.loading = false;
        console.error("Logout failed:", error);
      }
    );

    builder.addMatcher(
      AuthApi.endpoints.getUserDetails.matchFulfilled,
      (state, action) => {
        authSlice.caseReducers.updateUser(state, {
          payload: action.payload.data,
        });
      }
    );

    builder.addMatcher(
      AuthApi.endpoints.getUserDetails.matchRejected,
      (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      }
    );
  },
});

export const {
  setAuthenticated,
  destroySession,
  updateUser,
  setActiveOrganization,
} = authSlice.actions;
export default authSlice.reducer;
