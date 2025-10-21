export type AppStatus = "Clocked In" | "Clocked Out" | "Idle";

export interface StatsClock {
  active_time: string;
  logged_time: string;
  app_status: AppStatus;
}
