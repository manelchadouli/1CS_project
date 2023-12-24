var config = require("../configuration/config");
var Db = config.Database();

// affecter theme manuellement
module.exports.AddProjet = (ideq, idtm, result) => {
    Db.query("INSERT INTO Projet SET IdEquipe = ?, IdTheme= ? ", [ideq, idtm], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

module.exports.DeleteProjet = (ideq, result) => {
    Db.query("DELETE FROM Projet WHERE IdEquipe = ?", [ideq], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
module.exports.Reinitialiser = (idtm, result) => {
    Db.query("DELETE FROM Projet WHERE IdTheme = ?", [idtm], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

module.exports.EquipePourEncadrant = (result) => {
    Db.query("SELECT pr.IdEquipe,pr.IdEncadrant,t.TitreComplet, e1.Nom ,e1.Prenom ,e1.Email,p.Niveau,p.Filiere,p.Annee,GROUP_CONCAT(e2.IdEtudiant) AS IdEtudiant From Projet pr JOIN Theme t ON pr.IdTheme = t.IdTheme JOIN Equipe eq ON pr.IdEquipe = eq.IdEquipe JOIN Etudiant e1 ON eq.IdChefEquipe = e1.IdEtudiant JOIN Promo p ON e1.IdPromo = p.IdPromo JOIN Etudiant e2 ON pr.IdEquipe = e2.IdEquipe WHERE e1.IdEtudiant != e2.IdEtudiant AND p.Annee = year(now()) GROUP BY pr.IdEquipe", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

module.exports.MembresEquipe = (id, result) => {
    Db.query("SELECT Nom , Prenom From Etudiant WHERE IdEtudiant = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
module.exports.Encadreurs = (result) => {
    Db.query("SELECT IdEnseignant , Nom, Prenom,Email FROM Enseignant WHERE CanBeEncadrant = true", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
module.exports.AddEncadrantProjet = (ide, ideq, result) => {
    Db.query("UPDATE Projet SET IdEncadrant = ? WHERE IdEquipe = ? ", [ide, ideq], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}


module.exports.EnseignantEquipes = (id, result) => {
    Db.query("SELECT pr.IdEquipe,e.Nom,e.Prenom,e.Email,t.TitreComplet FROM Projet pr JOIN Equipe eq ON pr.IdEquipe = eq.IdEquipe JOIN Theme t ON pr.IdTheme = t.IdTheme JOIN Etudiant e ON eq.IdChefEquipe= e.IdEtudiant WHERE pr.IdEncadrant = ?  ", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

module.exports.GetLivrablesByIdEquipe = (idEquipe, result) => {
    var Livrables = [];
    const getProjet = "SELECT IdProjet FROM Projet WHERE IdEquipe=?";
    const GetLivrables = "SELECT l.IdLivrable,l.Titre,l.Date,e.IdEtudiant,l.IdProjet,e.Nom,e.Prenom FROM Livrable l JOIN Etudiant e  WHERE IdProjet=? AND l.IdEtudiant=e.IdEtudiant";
    const GetComment = "SELECT * FROM Commentaires WHERE IdLivrable=?";

    if (idEquipe !== null)
        Db.query(getProjet, [idEquipe], (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                if (results.length > 0)
                    Db.query(GetLivrables, [results[0].IdProjet], (err, r) => {
                        if (err) {
                            console.log(err);
                            result(err, null);
                        } else {
                            let cpt = 1;
                            r.forEach(liv => {
                                Db.query(GetComment, [liv.IdLivrable], (er, res) => {
                                    if (er) {
                                        console.log(er)
                                    } else {

                                        Livrables.push({ liv, res });
                                        if (cpt == r.length)
                                            result(Livrables);
                                        cpt++;
                                    }

                                })
                            });

                        }
                    })
                else result(Livrables);

            }
        })
    else {
        result(Livrables);
    }
}
module.exports.AjouterLivrable = (idEtudiant, title, idEquipe, fileName, result) => {
        const sql = "INSERT INTO Livrable(Titre,Name,Date,IdEtudiant,IdProjet)VALUES(?,?,now(),?,?)";
        const projet = "SELECT IdProjet FROM Projet WHERE IdEquipe=?";
        if (idEquipe !== null)
            Db.query(projet, [idEquipe], (error, res) => {
                if (error) {
                    console.log(error);
                } else {
                    if (res.length !== 0) {
                        Db.query(sql, [title, fileName, idEtudiant, res[0].IdProjet, Date.now()], (err, results) => {
                            if (err) {
                                console.log(err);
                            } else {
                                result(results);
                            }

                        })

                    } else {
                        result("You don't have an Projet ...");
                    }
                }
            })
        else {
            result("You don't have an Equipe ...");
        }


    }
    //get path of livrable 
module.exports.getPathLivrable = (idLivrable, result) => {
        var sql = "SELECT Name FROM Livrable WHERE IdLivrable=?"
        Db.query(sql, [idLivrable], (err, res) => {
            if (err) {
                console.log(err);

            } else {
                console.log("NAME >>>>>", res[0].Name);
                result(res[0].Name)
            }
        })
    }
    //ajouter une commentaire ....
module.exports.AjouterCommentaire = (idLivrable, comment, idEnseignant, result) => {
    var sql = "INSERT INTO Commentaires(Comment,IdLivrable,IdEnseignant) VALUES (?,?,?)";
    if (idLivrable && comment && idEnseignant)
        Db.query(sql, [comment, idLivrable, idEnseignant], (err, results) => {
            if (err) {
                result(err);
            } else {

                if (results) {
                    var IdCommentaire = results.insertId;
                    result(IdCommentaire);
                }

            }
        })
    else result("Error");
}


/*
module.exports.AddProjetEncadrant = (idp,ide, result) => {
    Db.query("INSERT INTO Encadrant SET IdProjet = ?, IdEnseignant = ? ", [idp],[ide], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

module.exports.AddProjetNoteEncadrant = (data,idp,ide, result) => {
    Db.query("INSERT INTO Encadrant SET Note = ? WHERE IdProjet= ? and IdEnseignant = ? ", [data],[idp],[ide], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}*/