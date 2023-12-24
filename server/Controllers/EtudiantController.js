const EtudiantModel = require("../Models/EtudiantModel");





//Ajouter Etudiant
module.exports.AjouterEtudiant = (req, res) => {
        let user = {
            nom: req.body.Nom,
            prenom: req.body.Prénom,
            email: req.body.Email,
            filiere: req.body.Filière,
            niveau: req.body.Niveau
        }
        EtudiantModel.Insert_Etudiant(user, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.status(200).json(result);
            }
        });
    }
    //get etudiants
module.exports.getEtudiants = (req, res) => {
    EtudiantModel.getEtudiant((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json(result);
        }
    });
}
module.exports.deleteEtudiant = (req, res) => {
    EtudiantModel.deleteEtudiant(req.params.id, (result) => {
        console.log("hhhhhh", result)
        return res.status(200).json(result)

    })
}
module.exports.modifieEtudiant = (req, res) => {
    EtudiantModel.updateEtudiant(req.params.idEtudiant, req.body, function(err, result) {
        if (err) {
            console.log(err)
        } else
            res.status(200).send('Student Updated');
    })
}
module.exports.GetEtudiant = (req, res) => {
    EtudiantModel.GetEtudiant(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}