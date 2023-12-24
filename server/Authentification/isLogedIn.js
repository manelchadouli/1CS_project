const jwt = require("jsonwebtoken");
const path = require("path");

// here a function "authorization" to verify the exsitence and the validity of the user's token ...
// if he doesn't have the token (expire or not valide) we will redirect him to Login again ...
// we wil give this function as a middleware  in any route we like ..,to give him an authorization or not
const authorization = (req, res) => {

    var token = req.headers.authorization;

    if (token !== 'null') {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            } else {

                return res.status(200).json(decodedToken)
                    //return next()

            }
        })
    } else {
        return res.status(403).send("A token is required for authentication");
    }
}
module.exports = authorization;