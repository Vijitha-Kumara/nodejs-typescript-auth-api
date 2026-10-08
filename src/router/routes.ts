import { Application, Request, Response } from "express";
import UserCtrl from "../controller/user";

export class Routes {
  private user_controller: UserCtrl = new UserCtrl();

  public route(app: Application) {
    app.post("/api/user", (req: Request, res: Response) => {
      this.user_controller.insert(req, res);
    });

    app.post("/api/userSinUp", (req: Request, res: Response) => {
      this.user_controller.createUser(req, res);
    });

     app.post("/api/login", (req: Request, res: Response) => {
      this.user_controller.login(req, res);
    });


    app.get("/api/user", (req: Request, res: Response) => {
      this.user_controller.getAll(req, res);
    });

    app.put("/api/user/:id", (req: Request, res: Response) => {
      this.user_controller.updatefromParam(req, res);
    });

    app.delete("/api/user/:id", (req: Request, res: Response) => {
      this.user_controller.delete(req, res);
    });
  }
}
