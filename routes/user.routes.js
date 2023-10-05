const express = require("express")
const userRouter = express.Router()

const {
    userLogin,
    userSignUp,
} = require('../controllers/user.controller')

//@description   SignUp
//@route         POST /user/signup
//@access        User
userRouter.post('/signup', userSignUp)  

//@description   Login
//@route         POST /user/login
//@access        User
userRouter.post("/login", userLogin)

module.exports = { userRouter }



