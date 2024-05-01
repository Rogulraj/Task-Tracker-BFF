import { Document, Schema, model } from "mongoose";
import { TaskInterface } from "@/interfaces/task.interface";

const TaskSchema = new Schema<TaskInterface>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  dueTo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Todo", "In Progress", "Completed"], // Enforce valid status values
  },
  tags: {
    type: [String],
    default: [],
  },
  assignedList: {
    type: [String],
    default: [],
  },
  aboutTask: {
    type: String,
    trim: true,
  },
});

export const TasksModel = model<TaskInterface & Document>("Task", TaskSchema);
