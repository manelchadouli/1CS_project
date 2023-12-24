const express = require("express");
const mysql = require("mysql");
var Db = require("../configuration/config");
const Envoyer_Password = require("../configuration/Envoyer_Password");
const password = require("../configuration/Hash_Password");
const app = express();
//app.use("/",Db);
Data_base = Db.Database();
class Compte {

    constructor(email) {
        this.email = email;

    }
    create_Compte(Role, callback) {

        let pass = password.generatePassword(8);
        var sql = `INSERT  INTO Compte (Email,MotDePass) VALUES (?,?)`
        let email = this.email;
        //  let Role = this.Role;
        this.recherche_Compte(email, Role, function(existe) {
            let res = null;
            let err = null;
            if (!existe)
                Data_base.query(sql, [email, password.hash_Password(pass)], (err, result) => {

                    if (err) {
                        callback({ res, err });
                    } else {
                        // Envoyer_Password.sendMail(this.email, pass);
                        let id = result.insertId;
                        res = { id, pass }
                        callback({ res, err });
                    }

                });
            else {
                err = "user existe";

                callback({ res, err });
            }
        })




    }
    recherche_Compte(email, role, existe) {

        var sql = `SELECT Role.Role  FROM  Compte JOIN UserRole JOIN Role ON  Compte.Email=? AND Compte.IdCompte=UserRole.IdCompte AND UserRole.IdRole=Role.IdRole `
        Data_base.query(sql, [email], (err, result) => {
            if (err) {
                throw err;
            } else {


                existe(result.Role == role)

            }

        });
    }

}

module.exports = Compte;