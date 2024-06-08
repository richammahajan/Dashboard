import { ReactNode } from "react";

// src/types/Activity.ts
export interface Activity {
  dayWiseActivity(dayWiseActivity: any): import("react").ReactNode;
  totalActivity: ReactNode;
  name: ReactNode;
  id: number;
  type: string;
  timestamp: string;
  description: string;
}
