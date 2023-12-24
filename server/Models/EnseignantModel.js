var Db = require("../configuration/config");
const compte = require("../Models/CompteModel");
const userRole = require("../Models/UserRolesModel");
const IdRole = require("../Classes/Role");
Data_base = Db.Database();


module.exports.Insert_Enseignant = (user, result) => {

        compte.create_Compte(user.email, function(compt) {
            var results = null;
            var sql = `INSERT  INTO Enseignant (Nom,Prenom,Email,Specialite,Grade,CanBeJury,CanBeEncadrant,IdCompte,banned) VALUES (?,?,?,?,"PROF",true,true,?,0)`;
            //compte existe
            var results = null;
            compte.recherche_Compte(user.email, function(IdCompte) {
                compte.getUser("Enseignant", IdCompte, function(User) {
                    if (!User)
                        Data_base.query(sql, [user.nom, user.prenom, user.email, user.specialite, IdCompte], (err, resultss) => {

                            if (err) {
                                result(null, err);
                                console.log(err);
                            } else {
                                results = resultss
                                    //   Envoyer_Password.sendMail(user.email, compt.pass);
                                IdRole('Enseignant', function(role) {
                                    userRole.affecterRole(IdCompte, role);
                                })
                                result(results, null)
                            }
                        });
                    else {
                        console.log("Enseignant déja existe ...");
                        result(null, "Enseignant existe")
                    }
                })
            })


        })

    }
    //Recherche etudiant by Email
module.exports.findEnseignantByEmail = (email, result) => {
    let sql = `SELECT * FROM Enseignant WHERE Email=? AND banned=?`;
    Data_base.query(sql, [email, 0], (err, res) => {
        if (err) {
            result(err, null)
            console.log(err);
        } else {
            result(null, res);
        }
    })
}
module.exports.getEnseignant = (result) => {
    let sql = `SELECT * FROM Enseignant WHERE banned=?`;
    Data_base.query(sql, [0], (err, res) => {
        if (err) {
            result(err, null)
            console.log(err);
        } else {
            result(null, res);
        }
    })
}

module.exports.deleteEnseignant = (id, result) => {
        Data_base.query(" SELECT IdCompte FROM Enseignant  WHERE IdEnseignant=? ", [id], (err, resl) => {
            if (err)
                console.log(err)
            if (resl.length != 0)
                Data_base.query(" DELETE FROM UserRole  WHERE IdCompte=?", [resl[0].IdCompte], (err, results) => {
                    if (err)
                        console.log(err)

                    Data_base.query("  UPDATE  Enseignant SET banned=?  WHERE IdCompte=? ", [1, resl[0].IdCompte], (err, results) => {
                        if (err)
                            console.log(err)
                        else
                        if (results.length !== 0)

                            Data_base.query(" UPDATE Compte SET banned=?  WHERE IdCompte=?", [1, resl[0].IdCompte], (err, results) => {
                            if (err)
                                result(err);
                            else
                                result(results)

                        })

                    })
                })
        })
    }
    /// pour modifier un Enseignant
module.exports.updateEnseignant = (id, user, result) => {

    let sql = `UPDATE Compte,Enseignant
             SET Compte.Email=? , Enseignant.Email=? , Enseignant.Nom=?,
             Enseignant.Prenom=?,Enseignant.Grade=?,Enseignant.Specialite=?
            WHERE Compte.IdCompte=Enseignant.IdCompte
            AND IdEnseignant=? AND Enseignant.banned=?`;

    Data_base.query(sql, [user.Email, user.Email, user.Nom, user.Prenom, user.Grade, user.Specialite, id, 0], (err, results) => {
        if (err) {
            console.log(err)
        } else {
            result(results);
        }
    })

}