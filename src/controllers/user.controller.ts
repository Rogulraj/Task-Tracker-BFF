import { CommonResponse, ResponseWithId } from "@/interfaces";
import { UserInterface } from "@/interfaces/user.interface";
import { UserService } from "@/services/user.service";
import { NextFunction, Request, Response } from "express";

export class UserController {
  private service = new UserService();

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserInterface = req.body.userData;

      const createStatus: CommonResponse<ResponseWithId> =
        await this.service.createUser(userData);
      res.status(createStatus.statusCode).json(createStatus);
    } catch (error) {
      next(error);
    }
  };

  userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserInterface = req.body.userData;

      const loginStatus = await this.service.userLogin(userData);
      res.status(loginStatus.statusCode).json(loginStatus);
    } catch (error) {
      next(error);
    }
  };
}
