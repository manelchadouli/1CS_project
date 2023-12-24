var Db = require("../configuration/config");
const Envoyer_Password = require("../configuration/Envoyer_Password");
const password = require("../configuration/Hash_Password");
Data_base = Db.Database();

module.exports.create_Compte = (email, callback) => {

    // let pass = password.generatePassword(8);
    let pass = "12345678";
    var res = null;
    var err = null;
    var sql = `INSERT  INTO Compte (Email,MotDePass,banned) VALUES (?,?,0)`
    this.recherche_Compte(email, function(existe) {

        if (existe == null)
            Data_base.query(sql, [email, password.hash_Password(pass)], (err, result) => {

                if (err) {
                    callback({ res, err });
                    console.log(err);
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
module.exports.recherche_Compte = (email, existe) => {
        //var sql = `SELECT Role.Role  FROM  Compte JOIN UserRole JOIN Role ON  Compte.Email=? AND Compte.IdCompte=UserRole.IdCompte AND UserRole.IdRole=Role.IdRole `
        var sql = `SELECT IdCompte  FROM  Compte WHERE Email=?`;

        Data_base.query(sql, [email], (err, results) => {
            if (err) {
                throw err;

            } else {

                if (results.length == 0)
                    existe(null);
                else
                    existe(results[0].IdCompte);



            }

        });
    }
    //get idUser by role and idCompte
module.exports.getUser = (Role, idCompte, User) => {
    var sql = ``;
    if (Role == 'Etudiant') {
        sql = `SELECT * FROM Etudiant WHERE IdCompte=?`;
    } else if (Role == 'Admin')
        sql = `SELECT * FROM Administrateur WHERE IdCompte=?`;
    else if (Role == 'Enseignant')
        sql = `SELECT * FROM Enseignant WHERE IdCompte=?`;
    else
        sql = `SELECT *  FROM Entreprise WHERE IdCompte=?`;

    Data_base.query(sql, [idCompte], (err, results) => {
        if (err)
            throw err;
        else {


            if (results.length == 0)
                User(null);
            else
                User(results);
        }
    })

}

//to update the password of a compte

module.exports.changePassword = (idCompte, Password, result) => {

    let sql = 'UPDATE Compte  SET MotDePass=? WHERE IdCompte=?';
    Data_base.query(sql, [password.hash_Password(Password), idCompte], (err, results) => {
        if (err) {
            throw err;
        } else {
            result(results);
        }
    })




}

module.exports.deleteCompte = (idCompte, result) => {

    Data_base.query(" DELETE FROM Compte  WHERE IdCompte=?", [idCompte], (err, results) => {
        if (err)
            console.log(err)
        else
            result(results);

    });

}