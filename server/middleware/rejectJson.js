//^ Rejects content types which are not JSON
const rejectJson = (req, res, next) => {

    //^ Get the content type from the header
    const content = req.headers['content-type']

    if(!content || content.indexOf('application/json') !== 0){
        return res.status(415).json("This is not JSON on format")
    }

    next()

}

module.exports = rejectJson


//? 
//? https://stackoverflow.com/questions/23271250/how-do-i-check-content-type-using-expressjs : Used to find info on getting the content tupes from header in the req body.
