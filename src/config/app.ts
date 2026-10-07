import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { Routes } from "../router/routes";
class App {
  public app: express.Application;
  public mongoUrl: string = process.env.MONGO_URL ?? "";
  private routes: Routes = new Routes();
  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.routes.route(this.app);
  }

  private config() {
    this.app.use(express.json());
    this.app.use(cors({ origin: "*" }));
  }

  private mongoSetup(): void {
    mongoose.set("strictQuery", true);
    mongoose.connect(this.mongoUrl).then((db) => {
      console.log("Mongo connected Sucessfully !!!");
    });
  }
}

export default new App().app;
