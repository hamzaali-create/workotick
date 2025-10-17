export interface PlanFeatures {
  "time-tracking": string | null;
  timesheet: string | null;
  "activity-level": string | null;
  "blur-screenshots": string | null;
  "clear-screenshots": string | null;
  projects: string;
  departments: string;
  "screenshot-retention": string;
  "idle-timeout": string | null;
  "email-support": string | null;
  "screenshot-intervals": string;
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
  "user-limit": string;
}

export interface Plan {
  id: number;
  price: number;
  features: PlanFeatures;
}

export interface ActiveOrganization {
  id: number;
  name: string;
  logo: string;
  timezone: string;
  screenshot_interval: number;
  allow_screenshot_view: number;
  screenshot_mode: string;
  idle_duration: number;
  disabled: boolean;
  role: string;
  plan: Plan;
}
