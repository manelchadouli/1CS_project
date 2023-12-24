const conf = require('./config')
let Db = conf.Database();
const Etudiant = require("../Models/EtudiantModel");
const Enseignant = require("../Models/EnseignantModel");
const config_Password = require("./Hash_Password");
const sendMail = require("./Envoyer_Password");
var xlsx = require("xlsx");

module.exports.ReadExcel = (imported, file, result) => {
    var length = 0;
    var go = false;
    var workbook = xlsx.readFile(file);
    let Sheets = workbook.SheetNames;
    for (let index = 0; index < Sheets.length; index++) {
        const temp = xlsx.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[index]]
        )
        length = length + temp.length;

        temp.forEach((res) => {
            if (imported == "Etudiant") {
                let user = {
                    nom: res.Nom,
                    prenom: res.Prénom,
                    email: res.Email,
                    filiere: res.Filière,
                    niveau: res.Niveau
                }
                Etudiant.Insert_Etudiant(user, function(result) {})
            } else if (imported == "Enseignant") {
                let user = {
                    nom: res.Nom,
                    prenom: res.Prénom,
                    email: res.Email,
                    specialite: res.Filière,
                    grad: res.Grad
                }
                Enseignant.Insert_Enseignant(user, function(result) {})
            }



        });

    }
    result(length)

}