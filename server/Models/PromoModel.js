const config = require("../configuration/config");
db = config.Database();
module.exports.getIdPormo = (f, niv, result) => {
    sql = `SELECT IdPromo FROM Promo  WHERE Filiere=? AND Niveau=? AND Annee = year(now()) `;
    var idPromo = null;
    db.query(sql, [f, niv], (err, results) => {
        if (err) {
            result({ err, idPromo });
        } else {
            if (results.length != 0)
                idPromo = results[0].IdPromo;

            result({ err, idPromo });
        }
    })
}