export type TaskStatusType = "Todo" | "In Progress" | "Completed";

export interface TaskInterface {
  _id?: string;
  title: string;
  dueTo: string;
  status: TaskStatusType;
  tags: string[];
  assignedList: string[];
  aboutTask: string;
}
