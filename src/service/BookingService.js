import db from "../models"; 111111111111111

let CreateNewBooking = () => {

}

let getAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let booking = await db.Booking.findAll({
                raw: true,

            })
            resolve(booking);
        } catch (e) {
            reject(e);
        }
    })
}

let initUpdateBooking = () => {

}


let getBookingById = () => {

}

let deleteBookingById = () => {

}

module.exports = {
    CreateNewBooking,
    getAll,
    initUpdateBooking,
    getBookingById,
    deleteBookingById
};
