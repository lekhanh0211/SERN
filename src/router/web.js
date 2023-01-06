import express from "express";
import homeController from "../controller/backend/homeController";
import userController from "../controller/backend/userController";
import bookingController from "../controller/bookingController";
import accountController from "../controller/accountController";

let router = express.Router();

let initWebRouter = (app) => {
  //Rest api

  router.get("/", homeController.getHomePage);

  router.get("/user", userController.getAllUser);
  router.post("/createUser", userController.postCRUD);
  router.get("/updateUser", userController.updateUser);
  router.post("/updatedUser", userController.initUpdateUser);
  router.get("/deleteUser", userController.deleteUser);


  router.get("/booking", bookingController.getAllBooking);
  router.post("/createBooking", bookingController.createBooking);
  router.get("/updateBooking", bookingController.updateBooking);
  router.post("/updatedBooking", bookingController.initUpdateBooking);
  router.get("/deleteBooking", bookingController.deleteBooking);


  router.post("/api/login", accountController.handleLogin);
  router.get("/api/getAllUser", accountController.handleGetAllUser);
  router.post("/api/postUser", accountController.handlePostUser);
  router.put("/api/putUser", accountController.handlePutUser);
  router.delete("/api/deleteUser", accountController.handleDeleteUser);

  return app.use("/", router);
};

export default initWebRouter;
