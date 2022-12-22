import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";

let router = express.Router();

let initWebRouter = (app) => {
  //Rest api

  router.get("/", homeController.getHomePage);

  router.get("/user", userController.getUserPage);
  router.post("/createUser", userController.postCRUD);

  return app.use("/", router);
};

export default initWebRouter;
