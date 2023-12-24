mysql = require("mysql");
//get role by idCompte
module.exports.getRole = (idCompte, Role) => {
    let sql = `SELECT Role.Role As role FROM UserRole JOIN Role ON UserRole.idCompte=? AND UserRole.IdRole=Role.IdRole`;
    Db.query(sql, [idCompte], (err, results) => {
        if (err)
            throw err;
        else {
            Role(results);
        }
    })
}