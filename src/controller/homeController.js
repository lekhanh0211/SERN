import { json } from "express";
import db from "../models/index";

let getHomePage = async (req, res) => {
  // try {
  //   let data = await db.User.findAll();
  //   return res.render("index.ejs", { dataUser: JSON.stringify(data) });
  // } catch (error) {}

  return res.render("index.ejs");
};

module.exports = {
  getHomePage,
};
