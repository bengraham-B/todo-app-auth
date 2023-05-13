//& Middle ware function that will check wheather the user is authenticated on every request
const jwt = require('jsonwebtoken')
const User = require('../models/userModel') //^ Importing the user model

const requireAuth = async (req, res, next) => {
    // console.log(req.body)
    //^ verifing that the user is authenticated
    const { authorization } = req.headers
    // console.log("AUTH from middileware ---",authorization)
    if(!authorization){
        return res.status(401).json({error:"Auth token required"})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id}).select('_id')
        // console.log('req.user ->> ', req.user._id)
        next()
    }
    catch(err) {
        console.log(err)
        res.status(401).json({error:'Request is not authorsied'})
    }
}
module.exports = requireAuth