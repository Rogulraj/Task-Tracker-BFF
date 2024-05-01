import express, { json } from "express";
import { logger, stream } from "./utils/logger";
import morgan from "morgan";
import { Routes } from "./interfaces/route.interface";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import cors from "cors";
import { connectToDb } from "./database";

export class App {
  public app = express();
  public path = "/api/v1";

  constructor(routes: Routes[]) {
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeDb();
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      logger.info("============================");
      logger.info(`========PORT:${port}========`);
      logger.info("============================");
    });
  }

  private async initializeDb() {
    await connectToDb();
  }

  private initializeMiddlewares() {
    this.app.use(json());
    this.app.use(cors());
    this.app.use(morgan("dev", { stream: stream }));
    this.app.use(ErrorHandler);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use(this.path, route.router);
    });
  }
}
