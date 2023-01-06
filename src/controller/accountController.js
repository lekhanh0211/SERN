import accountService from "../service/AccountServices";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Bạn phải nhập vào tài khoản và mật khẩu!",
    });
  }
  let userData = await accountService.handleAccountLogin(email, password);
  console.log(userData);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
let handleGetAllUser = async (req, res) => {
  let id = req.query.id; // có thể truyền vào all để getall or id
  //check id nếu k có id truyền vào return lun
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Thiếu tham số đầu vào",
      user: [],
    });
  }
  let users = await accountService.getAllUser(id);
  console.log(users);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

let handlePostUser = async (req, res) => {
  let message = await accountService.postUser(req.body);
  //console.log(message)
  return res.status(200).json(message)
};


let handlePutUser = async (req, res) => {
    let data = req.body;
    let message = await accountService.putUser(data);
    return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
    if(!req.body.id){
      return res.status(200).json({
        errCode:1,
        errMessage: "Bạn chưa truyền vào id cần xóa"
      })
    }else{
      let message = await accountService.deleteUser(req.body.id);
      return res.status(200).json(message);
    }
  };

module.exports = {
  handleLogin,
  handleGetAllUser,
  handlePostUser,
  handlePutUser,
  handleDeleteUser,
};
