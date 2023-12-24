var Db = require("../configuration/config");
const compte = require("../Models/CompteModel");
const userRole = require("../Models/UserRolesModel");
const IdRole = require("../Classes/Role");
Data_base = Db.Database();

//Ajouter Entreprise ....
module.exports.AjouterEntreprise = (Entreprise, result) => {
    var sql = "INSERT INTO Entreprise(Nom,Domaine,Adresse,Tel,Email,IdCompte)VALUES(?,?,?,?,?,?)";
    compte.create_Compte(Entreprise.Email, (call) => {
            //compte existe
            var results = null;
            compte.recherche_Compte(Entreprise.Email, function(IdCompte) {
                compte.getUser("Entreprise", IdCompte, function(User) {
                    if (!User)
                        Data_base.query(sql, [Entreprise.Nom, Entreprise.Domaine, Entreprise.Adresse, Entreprise.Tel, Entreprise.Email, IdCompte], (err, resultss) => {
                            if (err) {
                                result(null, err);
                                console.log(err);
                            } else {
                                results = resultss
                                    //   Envoyer_Password.sendMail(user.email, compt.pass);
                                IdRole('Entreprise', function(role) {
                                    userRole.affecterRole(IdCompte, role);
                                })
                                result(results, null)
                            }
                        });

                    else {
                        result(null, "Entreprise existe")
                    }
                })

            })







        })
        // Db.query(sql,[])





}

//Get Entrepises ...
module.exports.GetEntreprise = (result) => {
        var sql = "SELECT * FROM Entreprise"

        Data_base.query(sql, (err, results) => {
            if (err) {
                return result(results);
            } else {
                return result(results);
            }
        })



    }
    //update Entreprise ...
module.exports.UpdateEntreprise = (id, data, result) => {

        console.log(id, "_______________", data);
        let sql = `UPDATE Compte,Entreprise
SET Compte.Email=? , Entreprise.Email=? , Entreprise.Nom=?,
Entreprise.Domaine=?,Entreprise.Adresse=?,Entreprise.Tel=?
WHERE Compte.IdCompte=Entreprise.IdCompte
AND IdEntreprise=?`;

        Data_base.query(sql, [data.Email, data.Email, data.Nom, data.Domaine, data.Adresse, data.Tel, id], (err, results) => {
            if (err) {
                console.log(err)
            } else {
                result(results);
            }
        })



    }
    //delete Entreprise ...
module.exports.deleteEntreprise = (id, result) => {
    Data_base.query(" SELECT IdCompte FROM Entreprise  WHERE IdEntreprise=? ", [id], (err, resl) => {
        if (err)
            console.log(err)
        if (resl.length != 0)
            Data_base.query(" DELETE FROM UserRole  WHERE IdCompte=? ", [resl[0].IdCompte], (err, results) => {
                if (err)
                    console.log(err)

                Data_base.query(" DELETE FROM Entreprise  WHERE IdCompte=? ", [resl[0].IdCompte], (err, results) => {
                    if (err)
                        console.log(err)
                    else
                        result(results);

                })
            })
    })
}