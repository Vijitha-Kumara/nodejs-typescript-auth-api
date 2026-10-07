import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
class App {
  public app: express.Application;
  public mongoUrl: string = process.env.MONGO_URL ?? "";
  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
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
