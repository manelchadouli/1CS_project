const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let EXPIR_TIME = 60 * 60 * 60 * 1000;
//../../../.env
//import custom modules  
var config = require("../configuration/config");
const Email = require("../configuration/Email_Validator");
const Role = require("../Models/RoleModel");
const user = require("../Models/CompteModel");
// connect to  MYSQL Database
Db = config.Database();

//****************************************************************************** */
module.exports.postLogin = (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(401).json({
            message: "Email not present",
        })
    } else if (!password) {
        return res.status(401).json({
            message: "Password not present",
        })
    } else
    if (!Email.Validator(email) || password.length < 7) {
        return res.status(401).json({
            message: "Email ou mot de passe incorrect",
            jj: email,
            pass: password
        })
    } else
        try {


            const sql = ('SELECT * FROM Compte WHERE Email=? AND banned=?');
            Db.query(sql, [email, 0], (error, result) => {
                if (error) throw error;
                if (result.length > 0) {
                    compare(password, result, function(call) {
                        let compte = call.result;
                        //if there is an compte with that email and the appropriate password ...
                        if (call.exist) {
                            var token = "";
                            Role.getRole(compte.IdCompte, function(Roles) {
                                var role = "";
                                if (Roles.length > 1 && !req.body.role) {
                                    return res.status(200).json({
                                        Roles
                                    })
                                } else if (req.body.role) {
                                    role = req.body.role;
                                } else {
                                    console.log("role", Roles)
                                    role = Roles[0].role;
                                }

                                user.getUser(role, compte.IdCompte, function(User) {
                                        var UserId = null;
                                        switch (role) {
                                            case 'Etudiant':
                                                UserId = User.IdEtudiant;
                                                break;
                                            case 'Enseignant':
                                                UserId = User.IdEnseignant;
                                                break;
                                            case 'Admin':
                                                UserId = User.IdAmin;
                                                break;
                                            case 'Entreprise':
                                                UserId = User.IdEntreprise;
                                                break;
                                        }
                                        token = JWT.sign({
                                            idCompte: compte.IdCompte,
                                            IdUser: UserId,
                                            role: role
                                        }, process.env.SECRET, {
                                            expiresIn: EXPIR_TIME

                                        });
                                        //****************** */

                                        return res.status(200).json({
                                            message: "Login successful",
                                            User,
                                            token,
                                            role
                                        });
                                    })
                                    //-a-_P)"o
                                    //{s24yne;
                            })


                        } else if (!call.exist) return res.status(401).json({ message: "Email ou mot de passe incorrect " })




                    });

                } else {
                    res.status(401).json({
                        message: "Email ou mot de passe incorrect ",
                        error: "User not found",
                    })
                }
            });

        } catch (e) {
            res.status(401).json({
                message: "An error occured",
                error: error.message,
            });

        }


    async function compare(password, result, callback) {
        var resultt = await bcrypt.compare(password, result[0].MotDePass);
        if (resultt) {
            callback({ exist: resultt, result: result[0] });
        } else if (!resultt) {
            callback({ exist: resultt, result: null });
        }


    }



}