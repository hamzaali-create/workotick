import { User } from "./user";

export interface Activities {
  clock_in: string;        // e.g. "2025-10-21T05:50:50.000000Z"
  clock_out: string;       // e.g. "--" or "2025-10-21T10:51:50.000000Z"
  active_time: string;     // e.g. "05:01" (HH:mm format)
  log_time: string;        // e.g. "00:00" (HH:mm)
  remaining_time: string;  // e.g. "02:59" (HH:mm)
}




export interface ActivityLog {
  id: number;
  title: string;                  // e.g. "Google Chrome"
  memo: string | null;            // may be null
  activity: string;               // e.g. "0%"
  score: string;                  // e.g. "Idle"
  screenshot: string;             // URL of the screenshot
  interval_start_at: string;      // ISO date string
  interval_end_at: string;        // ISO date string
  created_at: string;             // ISO date string
  project: string;                // e.g. "N/A"
  department: string;             // e.g. "Marketing"
            
  user: User;                     // nested user object
}




