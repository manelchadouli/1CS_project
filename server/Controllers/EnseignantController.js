const EnseignantModel = require("../Models/EnseignantModel");





//Ajouter Etudiant
module.exports.AjouterEnseignant = (req, res) => {
    let user = {
        nom: req.body.Nom,
        prenom: req.body.Prenom,
        email: req.body.Email,
        specialite: req.body.Specialite,
        grade: req.body.Grade,
    }
    EnseignantModel.Insert_Enseignant(user, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

module.exports.ConsulterEnseignants = (req, res) => {
    EnseignantModel.getEnseignant((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json(results);
        }
    });
}

//modifier Enseignant
module.exports.modifieEnseignant = (req, res) => {
    EnseignantModel.updateEnseignant(req.params.idEnseignant, req.body, function(err, result) {
        if (err) {
            console.log(err)
        } else
            res.status(200).send('Enseignant Updated');
    })
}
module.exports.deleteEnseignant = (req, res) => {
    EnseignantModel.deleteEnseignant(req.params.id, (result) => {
        res.status(200).json({ result })

    })
}