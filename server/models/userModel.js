require('dotenv').config()
const {cl} = require("goosefuncs")
const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unigue: true
    },
    password: {
        type: String,
        required: true
    }
})

//^ Stattic method to login users
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error("All fields must be valid")
    }
   
    //^ Checks if the user is registered
    const user = await this.findOne({ email })
    if(!user){
        throw Error("Email is not registered")
    }

    //^ Matches the user inputed password to the password in the DB
    const match = await bcrypt.compare(password, user.password) 
    if(!match){
        throw Error("Inncorect Password")
    }

    return user
}

//^ Static method to sign up users
userSchema.statics.signup = async function(email, password){
    if(!email || !password){
        throw Error("All fields must be valid")
    }
    if(!validator.isEmail(email)){
        throw Error("Not valid email")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Not sotrongh enough password")
    }

    const exists = await this.findOne({ email })
    if(exists){
        throw Error("Email already in use")
    }

    //^ genterates salt to hash the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    cl("At hash")

    //^ Store the user in the DB
    const user = await this.create( {email: email, password: hash}) //^ Storing hashed password in the DB
    cl(user)

    return user
}

module.exports = mongoose.model("user", userSchema)