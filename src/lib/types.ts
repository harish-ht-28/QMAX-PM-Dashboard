export interface TimesheetRow {
  date: string;
  hours: number;
  description: string;
  status: "approved" | "pending" | "draft";
}
export interface Project {
  id: number;
  name: string;
  assignedTo: string[];
  status: "Active" | "Completed";
  hours: number;
  timesheet?: TimesheetRow[];
}
