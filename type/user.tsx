export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  departments: string[];
  organizations: {
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
    plan: {
      id: number;
      price: number;
      features: {
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
      };
    };
  }[];
}

export interface RegisterValues {
  name: string;
  email: string;
  password: string;
  terms: boolean;
}

export interface PostProps {
  url: string;
  postData: RegisterValues;
  config?: any;
 
}


export interface GetProps {
  url: string;
  params?: Record<string, any>; // example: ?page=1&limit=10
  config?: Record<string, any>;
}
