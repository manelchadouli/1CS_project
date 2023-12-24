const express = require("express");
var Db = require("../configuration/config");
const Envoyer_Password = require("../configuration/Envoyer_Password");
const password = require("../configuration/Hash_Password");
const app = express();
//app.use("/",Db);
Data_base = Db.Database();


module.exports.affecterRole = (idCompte, idRole) => {
    let sql = `INSERT INTO UserRole (IdCompte, IdRole) VALUES (?,?)`;
    this.findRole(idCompte, idRole, function(results) {
        if (results.length == 0)
            Data_base.query(sql, [idCompte, idRole], (err, result) => {
                if (err)
                    throw err;
            });
    })

}
module.exports.findRole = (idCompte, idRole, res) => {
    let sql = `SELECT * FROM  UserRole  WHERE IdCompte=? AND IdRole=? `;
    Data_base.query(sql, [idCompte, idRole], (err, result) => {
        if (err)
            throw err;
        else {
            res(result);
        }

    });
}