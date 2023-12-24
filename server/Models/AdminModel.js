var Db = require("../configuration/config");
const compte = require("../Models/CompteModel");
const userRole = require("../Models/UserRolesModel");
const IdRole = require("../Classes/Role");
Data_base = Db.Database();


module.exports.Insert_Admin = (user, result) => {

    compte.create_Compte(user.email, function(compt) {
        var results = null;
        var sql = `INSERT  INTO Administrateur (Email,Nom,Prenom,IdCompte) VALUES (?,?,?,?)`;
        //compte existe
        var results = null;
        compte.recherche_Compte(user.email, function(IdCompte) {
            compte.getUser("Admin", IdCompte, function(User) {
                if (!User)
                    Data_base.query(sql, [user.email, user.nom, user.prenom, IdCompte], (err, resultss) => {
                        if (err) {
                            result(null, err);
                            console.log(err);
                        } else {
                            results = resultss
                            console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
                                //   Envoyer_Password.sendMail(user.email, compt.pass);
                            IdRole('Admin', function(role) {
                                userRole.affecterRole(IdCompte, role);
                            })
                            result(results, null)
                        }
                    });

                else {
                    result(null, "Admin existe")
                }
            })

        })







    })

}
var user = {
    nom: "beloufa",
    prenom: "soufiane",
    email: "s.beloufa@esi-sba.dz"

}
this.Insert_Admin(user, function(admin) {
    console.log(admin);
})