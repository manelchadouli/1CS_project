const ProjetController = require("../Models/ProjetModel");
var fs = require('fs');
const path = require("path");
module.exports.AddProjet = (req, res) => {
    ProjetController.AddProjet(req.params.ideq, req.params.idtm, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
module.exports.DeleteProjet = (req, res) => {
    ProjetController.DeleteProjet(req.params.ideq, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
module.exports.Reinitialiser = (req, res) => {
    ProjetController.Reinitialiser(req.params.idtm, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
module.exports.EquipePourEncadrant = (req, res) => {
    ProjetController.EquipePourEncadrant((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
module.exports.MembresEquipe = (req, res) => {
    ProjetController.MembresEquipe(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
module.exports.Encadreurs = (req, res) => {
    ProjetController.Encadreurs((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
module.exports.AddEncadrantProjet = (req, res) => {
    ProjetController.AddEncadrantProjet(req.params.ide, req.params.ideq, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
module.exports.EnseignantEquipes = (req, res) => {
        ProjetController.EnseignantEquipes(req.params.id, (err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        });
    }
    //ajouter livrable
module.exports.AjouterLivrables = (req, res) => {
    ProjetController.AjouterLivrable(req.body.IdEtudiant, req.body.titre, req.body.IdEquipe, req.file.filename, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            console.log(results)
            res.send(results);

        }
    });
}
module.exports.GetLivrables = (req, res) => {
        ProjetController.GetLivrablesByIdEquipe(req.params.idEquipe, (results) => {

            res.json(results);

        });
    }
    //download livrable 
module.exports.DownloadLivrable = async(req, res) => {

        ProjetController.getPathLivrable(req.params.idLivrable, async(results) => {
            try {

                const fileName = results;
                const fileURL = '../Livrables/' + fileName;
                fs.exists(fileURL, (existe) => {
                    if (existe) {
                        const stream = fs.createReadStream(fileURL);
                        console.log("__________", stream);
                        res.contentType(path.basename(fileURL))
                        res.set({
                            'Content-Disposition': `attachment; filename='${fileName}'`,
                        });
                        stream.pipe(res);
                    } else {
                        return res.status(404).send("File doesn't exist ...");
                    }
                })

            } catch (e) {
                console.error(e)
                res.status(500).end();
            }

        })

    }
    //ajouter une commentaire ...
module.exports.AjouterCommentaire = (req, res) => {

    ProjetController.AjouterCommentaire(req.params.id, req.body.comment, req.body.IdEnseignant, (result) => {
        if (result === "Error")
            return res.status(403).json(result);
        else
            return res.status(200).json(result);
    })
}