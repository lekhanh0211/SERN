import bcrypt from "bcryptjs";
import db from "../models";
const salt = bcrypt.genSaltSync(10);

let CRUDService = async (data) => {
  return new Promise(async(resolve,reject)=>{
    try {
      let hashPasswordBcrypt  = await hashUserPassword(data.password);
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

module.exports = {
  CRUDService,
  
};
