const jwt = require("jsonwebtoken");
const path = require("path");
const express = require("express");
const app = express();
app.use(express.static("../frontend/pages/login/WebRoot"));
var options = {
        root: path.join("../frontend/pages/login/WebRoot")
    }
    // here a function "authorization" to verify the exsitence and the validity of the user's token ...
    // if he doesn't have the token (expire or not valide) we will redirect him to Login again ...
    // we wil give this function as a middleware  in any route we like ..,to give him an authorization or not
const authorization = (req, res) => {
    //const token = req.cookies.token;
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            } else {
                if (decodedToken.role !== "Enseignant") {
                    return res.status(401).json({ message: decodedToken.role + " Not authorized" })
                        //  next('route');
                } else {
                    return res.status(200).json(decodedToken)
                        //return next()
                }
            }
        })
    } else {
        return res.status(403).send("A token is required for authentication");
    }
}
module.exports = authorization;