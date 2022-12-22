import express from "express";
import bodyParser from "body-parser";
import initWebRouter from "./router/web";
import viewEngine from "./config/viewEngine";
import connectDb from "./config/connectDb"

require('dotenv').config();

let app = express();
let port = process.env.PORT;

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRouter(app);

connectDb();

app.listen(port,()=>{
    console.log("Backend NodeJs is running on the port : " + port)
});