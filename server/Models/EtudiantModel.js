var Db = require("../configuration/config");
const compte = require("../Models/CompteModel");
const userRole = require("../Models/UserRolesModel");
const IdRole = require("../Classes/Role");
const Role = require("../Models/RoleModel");
const Promo = require("./PromoModel");
Data_base = Db.Database();


module.exports.Insert_Etudiant = (user, result) => {

        compte.create_Compte(user.email, function(compt) {
            var sql = `INSERT  INTO Etudiant (Nom,Prenom,Email,IdCompte,IdPromo,banned) VALUES (?,?,?,?,?,0)`;
            //compte existe
            var results = null;

            compte.recherche_Compte(user.email, function(IdCompte) {

                compte.getUser("Etudiant", IdCompte, function(User) {
                    if (!User)
                        Promo.getIdPormo(user.filiere, user.niveau, function(idPromo) {
                            if (idPromo.idPromo)
                                Data_base.query(sql, [user.nom, user.prenom, user.email, IdCompte, idPromo.idPromo], (err, resultss) => {

                                    if (err) {
                                        result(null, err);
                                        console.log(err);
                                    } else {
                                        results = resultss
                                            //   Envoyer_Password.sendMail(user.email, compt.pass);
                                        IdRole('Etudiant', function(role) {
                                            userRole.affecterRole(IdCompte, role);
                                        })
                                        result(results, null)
                                    }
                                });
                            else {
                                compte.deleteCompte(IdCompte, function(call) {});
                                result(null, "promo n'existe pas");

                            }
                        })
                    else {
                        result(null, "Etudiant existe")
                    }
                })
            })






        })

    }
    //Recherche etudiant by Email
module.exports.findStudent = (email, result) => {
    let sql = `SELECT * FROM Etudiant WHERE Email=? AND banned=?`;
    Data_base.query(sql, [email, 0], (err, res) => {
        if (err) {
            result(err, null)
            console.log(err);
        } else {
            result(null, res);
        }
    })
}
module.exports.getEtudiant = (result) => {
        let sql = `SELECT e.IdEtudiant AS id,e.Nom,e.Prenom AS Prénom,e.Email,p.Niveau,p.Filiere AS Filière FROM Etudiant e JOIN Promo p ON e.IdPromo=p.IdPromo AND e.banned=?`;
        Data_base.query(sql, [0], (err, results) => {
            if (err) {
                result(err, null)
                console.log(err);
            } else {
                result(null, results);
            }
        })
    }
    /// pour modifier un etudiant
module.exports.updateEtudiant = (id, user, result) => {

    let sql = `UPDATE Compte,Etudiant
             SET Compte.Email=? , Etudiant.Email=? , Etudiant.Nom=?,
             Etudiant.Prenom=?,Etudiant.IdPromo=?
            WHERE Compte.IdCompte=Etudiant.IdCompte
            AND IdEtudiant=? AND Etudiant.banned=?`;
    Promo.getIdPormo(user.Filière, user.Niveau, function(res) {

        if (res.idPromo)
            Data_base.query(sql, [user.Email, user.Email, user.Nom, user.Prénom, res.idPromo, id, 0], (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    result(results);
                }
            })
        else {
            result(null);
        }
    })


}

//pour delete etudiant  from data base 
module.exports.deleteEtudiant = (id, result) => {
        Data_base.query(" SELECT IdCompte FROM Etudiant  WHERE IdEtudiant=? ", [id], (err, resl) => {
            if (err)
                console.log(err)
            if (resl.length !== 0)
                Data_base.query(" DELETE FROM UserRole  WHERE IdCompte=?", [resl[0].IdCompte], (err, results) => {
                    if (err)
                        console.log(err)
                    if (results.length !== 0)
                        Data_base.query(" UPDATE Etudiant SET banned=? WHERE IdCompte=? ", [1, resl[0].IdCompte], (err, results) => {
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
    },
    module.exports.GetEtudiant = (id, result) => {
        Db.query("SELECT * From Etudiant WHERE IdEtudiant = ? And banned=? ", [id, 0], (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results[0]);
            }
        });
    }