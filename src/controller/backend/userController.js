import CRUDService from "../../service/backend/UserService";

let getAllUser = async (req, res) => {

  let data = await CRUDService.getAll();
  //console.log(data);
  return res.render("user.ejs", { dataUser: data });

  // try {
  //   let data = await db.User.findAll();
  //   return res.render("user.ejs", { dataUser: data});
  // } catch (error) {}

  //return res.render("index.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.CRUDService(req.body);
  console.log(message);
  return res.redirect("/user");
};


let updateUser = async (req, res) => {
  // console.log(req.query.id);
  // return res.sender("dskahjdhjs");
  let uId = req.query.id;
  if (uId) {
    let uData = await CRUDService.getUserById(uId);
    //console.log(uData);
    // return res.send('Found is a user')
    return res.render("updateUser.ejs", { uData: uData })
  } else {
    return res.send("User not found")
  }

};

let initUpdateUser = async (req, res) => {
  let data = req.body;
  let allUser = await CRUDService.initUpdateUser(data);
  return res.render('user.ejs', { dataUser: allUser });
};

let deleteUser = async (req, res) => {
  let uId = req.query.id;
  if (uId) {
    await CRUDService.deleteUserById(uId);

    return res.redirect("/user");

  } else {
    return res.send("Delete failed");
  }
};

module.exports = {
  getAllUser,
  postCRUD,
  updateUser,
  initUpdateUser,
  deleteUser
};