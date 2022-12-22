const { Sequelize } = require("sequelize");

// //Option1 lưu trên memory

// const sequelize = new Sequelize('sqlite:memory:')
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')

// //Option 2

// const sequelize = new Sequelize({
//     dialect:'sqlite',
//     storage:'path/to/datasbase.sqlite'
// });

const sequelize = new Sequelize("sern", "root", null, {
  host: "127.0.0.1", //địa chỉ server
  dialect: "mysql",
  logging:false //k in câu lệnh query ra màn hình console
});

let connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối db thành công!");
  } catch (error) {
    console.log("Không thể kết nối tới db : ", error);
  }
};

export default connectDb;