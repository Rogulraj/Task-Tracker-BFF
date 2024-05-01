import { UserController } from "@/controllers/user.controller";
import { Router } from "express";

export class UserRoutes {
  public path = `/user`;
  public router: Router = Router();
  private controller = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(`${this.path}/create`, this.controller.createUser);
    this.router.post(`${this.path}/login`, this.controller.userLogin);
  }
}
