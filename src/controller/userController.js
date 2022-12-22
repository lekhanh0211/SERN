import { json } from "express";
import db from "../models/index";
import CRUDService from "../service/UserService";

let getUserPage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("user.ejs", { dataUser: data});
  } catch (error) {}

  //return res.render("index.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.CRUDService(req.body);
  console.log(message);
  return res.redirect("/user");
};
module.exports = {
  getUserPage,
  postCRUD,
};
