import { TaskController } from "@/controllers/task.controller";
import { Router } from "express";

export class TaskRoutes {
  public path = "/task";
  public router: Router = Router();

  private controller = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}/all`, this.controller.getAllTasks);
    this.router.post(`${this.path}/add`, this.controller.addTask);
    this.router.delete(`${this.path}/remove`, this.controller.removeTaskById);
    this.router.put(`${this.path}/update`, this.controller.updateTaskById);
  }
}
