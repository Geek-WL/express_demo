const User = require('../db/model/user')
async function getUser(username,password) {
    if(password) {
        let results = await User.findAll({
            where: {
                username,
                password
            }
        })
        return results
    } else {
        let results = await User.findAll({
            where: {
                username: username
            }
        })
        return results
    }
}

async function createUser({username, password, gender}) {
    let results = await User.create({
        username,
        password,
        gender
    })
    return results['dataValues']
}

module.exports = {
    getUser,
    createUser
}