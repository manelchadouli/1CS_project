const express = require("express");
const mysql = require("mysql");
var Db = require("../configuration/config");
const Envoyer_Password = require("../configuration/Envoyer_Password");
const password = require("../configuration/Hash_Password");
const compte = require("./Compte");
const app = express();
//app.use("/",Db);
Data_base = Db.Database();
class Admin {
    constructor(Id, email) {
        this.Id = Id;
        this.email = email;
    }
    toString() {
        return (`Id  :${this.Id}\n  email:${this.email}`);
    }
    add_Admin(user) {
        //  let pass = password.generatePassword(8);
        let Compt = new compte(user.email, 'Admin');
        Compt.create_Compte(function(compt) {
            var sql = `INSERT  INTO Administrateur (IdAdministrateur ,Email,IdCompte) VALUES (?,?,?)`;
            if (compt.result.insertId > 0) {
                Data_base.query(sql, [user.Id, user.email, compt.result.insertId], (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        Envoyer_Password.sendMail(user.email, compt.pass);
                    }
                });
            }

        });


    }
}
module.exports = Admin;