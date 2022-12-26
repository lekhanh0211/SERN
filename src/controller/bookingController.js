import { json } from "express";
import db from "../models/index";
import bookingService from "../service/BookingService";

let getAllBooking = async (req,res) => {
    let data = await bookingService.getAll();
    //console.log(data);
    return res.render("booking.ejs", { dataBooking: data });
}

let createBooking = async (req,res) => {
    let message = await bookingService.CreateNewBooking(req.body);
    console.log(message);
    return res.redirect("/booking");
}

let updateBooking = async (req,res) => {
    let uId = req.query.id;
    if (uId) {
        let uData = await bookingService.getBookingById(uId);
        //console.log(uData);
        // return res.send('Found is a user')
        return res.render("updateBooking.ejs", { uData: uData })
    } else {
        return res.send("User not found")
    }
}

let initUpdateBooking = async (req,res) => {
    let data = req.body;
    let allBooking = await bookingService.initUpdateBooking(data);
    return res.render('booking.ejs', { dataBooking: allBooking });
}

let deleteBooking = async (req,res) => {
    let uId = req.query.id;
    if (uId) {
        await bookingService.deleteBookingById(uId);

        return res.redirect("/booking");

    } else {
        return res.send("Delete failed");
    }
}


module.exports = {
    getAllBooking,
    createBooking,
    updateBooking,
    initUpdateBooking,
    deleteBooking,
}
