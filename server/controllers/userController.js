const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
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
        cl("USER LOGGEDIN")

        //^ Create JWT Token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({err: err.message})
    }

}

//^ Sign up
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {

        //^ if user's account does not have the substring "@gmail.com" it will respond with a HTTP 403
        if(email.toLowerCase().includes("@gmail.com")){
            console.log("@GMAIL")
            const user = await User.signup(email, password)
            //^ Create JWT Token
            const token = createToken(user._id)
            res.status(200).json({email, token})
            cl("LOGGED IN")
        }
        else {
            res.status(403).json("Not a @gmail.com account")
        }
    }
    catch (err) {
        res.status(400).json({err: err.message})
        cl("FAILED LOGGED IN")

    }

}

module.exports = { signupUser, loginUser }