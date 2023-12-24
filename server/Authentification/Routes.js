const express = require("express");
const parser = require("body-parser");
const route = express.Router();
route.use(parser.urlencoded({ extended: false }));
route.use(express.json());
const Auth_Controller = require("../Authentification/Controller")
    //route.get("/Inscrire", Auth_Controller.getLogin);
route.post("/Inscrire", Auth_Controller.postLogin);
//route.get("/mot_de_pass_oublie", Auth_Controller.getChangePassword);
//route.post("/mot_de_pass_oublie", Auth_Controller.postChangePassword);

module.exports = route;