//& Middle ware function that will check wheather the user is authenticated on every request
const jwt = require('jsonwebtoken')
const User = require('../models/userModel') //^ Importing the user model

const requireAuth = async (req, res, next) => {

    //^ verifing that the user is authenticated
    const { authorization } = req.headers

}
