import db from "../models/index";
import bcrypt from 'bcryptjs';

let handleAccountLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK";

                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Mật khẩu bạn đã nhập không chính xác";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "User not found";
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Tài khoản này không tồn tại trong hệ thống!`;
            }

            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}
let checkEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllUser = (uId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = '';
            if (uId === 'ALL') {
                user = await db.User.findAll({
                    raw: true,
                    attributes: {
                        exclude: ['password'] //ẩn password
                    }
                })
            } if (uId && uId !== 'ALL') {
                user = await db.User.findOne({
                    where: { id: uId },
                    raw: true,
                    attributes: {
                        exclude: ['password'] //ẩn password
                    }
                })
            }
            resolve(user);
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleAccountLogin,
    getAllUser,
}