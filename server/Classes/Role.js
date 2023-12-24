var Db = require("../configuration/config");
Data_base = Db.Database();

function getRoleId(role, roleCall) {

    var sql = `SELECT IdRole FROM  Role WHERE Role=? `
    Data_base.query(sql, [role], (err, result) => {
        if (err) {
            throw err;
        } else

            roleCall(result[0].IdRole);

    });
}


module.exports = getRoleId;