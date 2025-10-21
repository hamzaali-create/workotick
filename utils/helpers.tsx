import momentTz from "moment-timezone";
import moment from "moment";
import dayjs from "dayjs";

import { setActiveOrganization } from "@/app/redux/slices/authSlice";
import Api from "./Axios";

export let outsideStore: any;

export function getFormattedTimestamp({timestamp, timezone = "Asia/Karachi",format = "YYYY-MM-DD"}:any) {
  if (!moment(timestamp).isValid()) {
    return "--";
  }
  return momentTz(timestamp).tz(timezone).format(format);
}

export function secondsToHHMM(seconds: any) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}

export async function updateOrganization(organizationId: any) {
  try {
    const { data } = await Api.Get(`/organization/${organizationId}`);
    const storedUser = localStorage.getItem("user");
    const userData = storedUser ? JSON.parse(storedUser) : null;

    const organizations = userData.organizations;
    const newOrganization = organizations.map((organization: any) => {
      if (organization.id === data.id) {
        return data;
      }
      return organization;
    });
    outsideStore.dispatch(setActiveOrganization(data));
    localStorage.setItem(
      "user",
      JSON.stringify({ ...userData, organizations: newOrganization })
    );
  } catch (error) {
    throw error;
  }
}

export function injectStore(_store: any) {
  outsideStore = _store;
}
