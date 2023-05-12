
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { cl } = require("goosefuncs")

//^ Function to create a jwt token
const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: "3d"})
}

//^ Login
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        //^ Create JWT Token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }
    catch(err){
        res.status(400).json({err: err.message})
    }

}

//^ Sign up
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)
        //^ Create JWT Token
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }
    catch (err) {
        res.status(400).json({err: err.message})
    }

}

module.exports = { signupUser, loginUser }