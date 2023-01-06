import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let handleAccountLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExist = await checkEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password", "firstName", "lastName"],
          where: { email: email },
          raw: true,
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
  });
};
let checkEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllUser = (uId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (uId === "ALL") {
        users = await db.User.findAll({
          raw: true,
          attributes: {
            exclude: ["password"], //ẩn password
          },
        });
      }
      if (uId && uId !== "ALL") {
        users = await db.User.findOne({
          where: { id: uId },
          raw: true,
          attributes: {
            exclude: ["password"], //ẩn password
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let postUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email is exist
      let check = await checkEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Địa chỉ email đã tồn tại",
        });
      } else {
        let hashPasswordBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: hashPasswordBcrypt,
          address: data.address,
          phoneNumber: data.phoneNumber,
          //image: .,
          gender: data.gender,
          roleId: data.roleId,
          // positionId: .,
        });
        resolve({
          errCode: 0,
          message: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let putUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 0,
          errMessage: "Bạn chưa truyền vào id cần sửa",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      let hashPasswordBcrypt = await hashUserPassword(data.password);
      if (user) {
        (user.firstName = data.firstName),
          (user.lastName = data.lastName),
          (user.email = data.email),
          (user.password = hashPasswordBcrypt),
          (user.address = data.address),
          (user.phoneNumber = data.phoneNumber),
          // user.image = data.image;
          (user.gender = data.gender),
          (user.roleId = data.roleId),
          await user.save();
        resolve({
          errCode: 0,
          errMessage: "Cập nhật người dùng thành công!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Không tìm thấy người dùng",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
      raw: false, //để set data giống với kiểu của sequelize khi thực hiện xóa
    });
    // console.log("check user >>",user)
    if (user) {
      await user.destroy();
      resolve({
        errCode: 0,
        errMessage: "Đã xóa người dùng thành công",
      });
    } else {
      resolve({
        errCode: 2,
        errMessage: "Người dùng không tồn tại",
      });
    }
    //hoặc có thể viết
    // await db.User.destroy({
    //   where: { id: userId },
    // });
  });
};
module.exports = {
  handleAccountLogin,
  getAllUser,
  postUser,
  putUser,
  deleteUser,
};
