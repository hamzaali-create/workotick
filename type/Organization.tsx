export interface OrganizationPlanFeatures {
  "time-tracking": string | null;
  timesheet: string | null;
  "activity-level": string | null;
  "blur-screenshots": string | null;
  "clear-screenshots": string | null;
  projects: string; // "-1"
  departments: string; // "-1"
  "screenshot-retention": string; // "1"
  "idle-timeout": string | null;
  "email-support": string | null;
  "screenshot-intervals": string; // "2|5|10|20"
  "team-management": string | null;
  "star-performer": string | null;
  "target-hour-tracker": string | null;
  "attendance-insight": string | null;
  "productivity-pulse": string | null;
  "in-out-logs": string | null;
  "active-hour-analysis": string | null;
  "project-report-by-member": string | null;
  "daily-timesheet": string | null;
  "overtime-analysis": string | null;
  "project-report-by-department": string | null;
  "user-limit": string; // "50"
}

export interface OrganizationPlan {
  id: number;
  price: number;
  features: OrganizationPlanFeatures;
}

export interface Organization {
  id: number;
  name: string;
  logo: string;
  timezone: string;
  screenshot_interval: number;
  allow_screenshot_view: number;
  screenshot_mode: "blur" | "clear" | string;
  idle_duration: number;
  disabled: boolean;
  role: "user" | "admin" | string;
  plan: OrganizationPlan;
}
