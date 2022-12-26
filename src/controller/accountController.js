import accountService from "../service/AccountServices";


let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Bạn phải nhập vào tài khoản và mật khẩu!",
        })
    }
    let userData = await accountService.handleAccountLogin(email, password)
    console.log(userData);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUser = async (req, res) => {
    let id = req.body.id; // có thể truyền vào all để getall or id
    //check id nếu k có id truyền vào return lun
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Thiếu tham số đầu vào',
            user: [],
        })
    }

    let user = await accountService.getAllUser(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        user
    })
}
module.exports = {
    handleLogin,
    handleGetAllUser
}