import User from "../model/User";
import BaseCtrl from "./base";
import { Request, Response } from "express";

export default class UserCtrl extends BaseCtrl {
  model = User;

}