const Ajv = require('ajv')
const ajv = new Ajv()
const userSchema = require('../validator/userValidator')
const {getUser, createUser} = require('../service/userService')
const {SuccessModel, ErrorModel} = require('../model/ResultModel')
const {userDataFail,userExistsFail,userRegisterFail,userLoginFail} = require('../config/errorConst')
const generatePwd = require('../utils/crypto')
function userValidate(data) {
    return ajv.validate(userSchema, data)
}

async function userExists(username) {
    let users = await getUser(username)
    return users.length !== 0
}

async function registerUser({username, password, gender}) {
    let valid = userValidate({username, password, gender})
    if(!valid) {
        return new ErrorModel(userDataFail)
    }
    let isExists = await userExists(username)
    if(valid && !isExists) {
        try {
        await createUser({username, password: generatePwd(password), gender})
        return new SuccessModel({msg:'注册成功'})
        } catch (e) {
            console.log(e);
            return new ErrorModel(userRegisterFail)
        }
    }else {
        return new ErrorModel(userExistsFail)
    }
}

async function loginCheck({username, password}) {
    let pwd = generatePwd(password)
    let usersArr = await getUser(username, pwd)
    if(usersArr.length !== 0) {
        return new SuccessModel({msg: '登录成功', data: usersArr[0]})
    } else {
        return new ErrorModel(userLoginFail)
    }
}

module.exports = {
    registerUser,
    loginCheck
}