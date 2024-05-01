import { CommonResponse, ResponseWithId } from "@/interfaces/index";
import { TaskInterface } from "@/interfaces/task.interface";
import { TaskService } from "@/services/task.service";
import { NextFunction, Request, Response } from "express";

export class TaskController {
  private service = new TaskService();

  getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskList: CommonResponse<TaskInterface[]> =
        await this.service.getAllTasks();

      res.status(taskList.statusCode).json(taskList);
    } catch (error) {
      next(error);
    }
  };

  addTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task: TaskInterface = req.body.task;
      const addStatus: CommonResponse<ResponseWithId> =
        await this.service.addTask(task);
      res.status(addStatus.statusCode).json(addStatus);
    } catch (error) {
      next(error);
    }
  };

  removeTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId: string = req.body.taskId;

      const removeStatus: CommonResponse<ResponseWithId> =
        await this.service.removeTaskById(taskId);
      res.status(removeStatus.statusCode).json(removeStatus);
    } catch (error) {
      next(error);
    }
  };

  updateTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId: string = req.body.taskId;
      const updatedTask: TaskInterface = req.body.task;

      const removeStatus: CommonResponse<ResponseWithId> =
        await this.service.updateTaskById(taskId, updatedTask);
      res.status(removeStatus.statusCode).json(removeStatus);
    } catch (error) {
      next(error);
    }
  };
}
