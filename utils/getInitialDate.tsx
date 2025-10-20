import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// Example type for organization
interface Organization {
  timezone?: string;
}

// value can be string, Date, or Dayjs
type DateValue = string | Date | Dayjs | null | undefined;

export function GetInitialDate(
  value: DateValue,
  activeOrganization?: Organization
): Dayjs {
  const tz = activeOrganization?.timezone || dayjs.tz.guess(); // fallback timezone
  const now: Dayjs = dayjs().tz(tz);

  let initialDate: Dayjs = value ? dayjs(value).tz(tz) : now;

  if (initialDate.isAfter(now, "day")) {
    initialDate = now;
  }

  return initialDate;
}
