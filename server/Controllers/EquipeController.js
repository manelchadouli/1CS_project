const EquipeModel = require("../Models/EquipeModel")

module.exports.AjouterEquipe = (req, res) => {
    EquipeModel.AddEquipe(req.params.id, (results) => {
        res.status(200).json(results);

    });
}
module.exports.AffichierEtudiant = (req, res) => {
    EquipeModel.ShowEtudinat(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });

}
module.exports.AjouterInvitation = (req, res) => {
    const data = req.body;
    EquipeModel.AddInvitation(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
module.exports.AfficherInvitation = (req, res) => {
    EquipeModel.ShowInvitation(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

module.exports.AfficherMembreEquipe = (req, res) => {
    EquipeModel.ShowMembreEquipe(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
module.exports.ChefEquipe = (req, res) => {
    EquipeModel.ChefEquipe(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
module.exports.MembreEquipe = (req, res) => {
    EquipeModel.MembreEquipe(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
module.exports.SupprimerInvitation = (req, res) => {
    EquipeModel.DeleteInvitation(req.params.ideq, req.params.ide, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

module.exports.AnnulerInvitation = (req, res) => {
    EquipeModel.AnnulerInvitation(req.params.id, req.params.ide, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

module.exports.AccepterInvitation = (req, res) => {
    EquipeModel.AcceptInvitation(req.params.ideq, req.params.ide, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

module.exports.AjouterChoix = (req, res) => {
    const priorite = req.body;
    EquipeModel.AddChoix(priorite, req.params.ideq, req.params.idtm, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// annuler + réinitialiser fiche de voeux  
module.exports.AnnulerLaFicheDeVoeux = (req, res) => {
    EquipeModel.AnnulerFicheDeVoeux(req.params.ideq, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
module.exports.NotChefCondition = (req, res) => {
    EquipeModel.NotChefCondition(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}