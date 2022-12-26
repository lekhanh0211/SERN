import bcrypt from "bcryptjs";
import db from "../models";
const salt = bcrypt.genSaltSync(10);

let CRUDService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      })
      resolve('OK! Create new user success!');
    } catch (e) {
      reject(e);
    }
  })

  let hashPasswordBcrypt = await hashUserPassword(data.password);
  console.log(data),
    console.log(hashPasswordBcrypt)
};

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

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true, //config sequelize hiển thị dữ liệu log
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  })
}
let getUserById = (uId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: uId },
        raw: true,
      })
      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  })
}
let initUpdateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id }
      })
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.email = data.email;
        user.password = data.password;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        // user.image = data.image;
        user.gender = data.gender;
        user.roleId = data.roleId;
        //  user.positionId = data.positionId;

        await user.save();
        let lstUser = await db.User.findAll();
        resolve(lstUser);
        resolve();

      } else {
        resolve();
      }
    } catch (e) {
      console.log(e);
    }
  })
}

let deleteUserById = (uId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: uId }
      })
      if (user) {
        await user.destroy();
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  })
}
module.exports = {
  CRUDService,
  getAllUser,
  initUpdateUser,
  getUserById,
  deleteUserById
};
