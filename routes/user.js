const express = require('express')
const router = express.Router()

router.post('/login', async (req, res, next) => {
    let result = await loginCheck(req.body)
    if(result.code === 200) {
        req.session.username = result.data.username
        req.session.password = result.data.password
        req.session.gender = result.data.gender
    }
    return res.json(result)
})

router.post('/register', async (req, res, next) => {
    let result = await registerUser(req.body)
    return res.json(result)
})

router.get('/test', async (req, res, next) => {
    return res.json(req.session)
})


const {registerUser,loginCheck} =  require('../controller/userController')


module.exports = router