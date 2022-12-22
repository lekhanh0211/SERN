import express from "express";

let configViewEngine = (app) => {

  //Config static file   
  app.use(express.static("./src/public"));

  //Config view  engine
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};

export default configViewEngine;
