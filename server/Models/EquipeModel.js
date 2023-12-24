var config = require("../configuration/config");
Db = config.Database();

module.exports.AddEquipe = (id, result) => {
        Db.query(" SELECT IdEquipe FROM Equipe  WHERE IdChefEquipe=? ", [id], (err, resl) => {
            if (err) result(err)
            else
            if (resl.length === 0)
                Db.query("INSERT INTO Equipe SET IdChefEquipe = ?", [id], (err, results) => {
                    if (err) {
                        result(err, null);
                    } else {
                        result(results.insertId);
                        console.log("Equipe has been created")
                    }
                })
            else result("Equipe exists ..")
        })
    },
    // les étudiant de meme promo 

    module.exports.ShowEtudinat = (id, result) => {
        //SELECT * FROM Etudiant WHERE IdEquipe = ? and IdEtudiant NOT IN (SELECT IdChefEquipe From Equipe)

        Db.query(" SELECT * FROM Etudiant e1 WHERE e1.IdEtudiant NOT IN (SELECT IdChefEquipe From Equipe) and e1.IdEtudiant != ? and e1.IdEtudiant NOT IN (SELECT IdEtudiant FROM Invitation WHERE Status='accepter') and e1.IdPromo IN (SELECT e.IdPromo FROM Etudiant e WHERE e.IdEtudiant = ? ) ", [id, id], (err, results) => {
            if (err) {
                console.log(err)
                result(results);
            } else {
                result(null, results);
            }
        })

    }

module.exports.AddInvitation = (data, result) => {
    Db.query(" SELECT IdEquipe FROM Equipe  WHERE IdChefEquipe=? ", [data.IdChefEquipe], (err, resl) => {
        if (err)
            console.log(err)

        Db.query("INSERT INTO Invitation SET Status = 'envoyer' ,IdEquipe = ?, IdEtudiant= ?  ", [resl[0].IdEquipe, data.IdEtudiant], (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
                console.log("invitation envoyée");
            }
        })
    });
}
module.exports.ShowInvitation = (id, result) => {
    Db.query("SELECT e.Nom ,e.Prenom, I.IdEquipe FROM Invitation I JOIN Equipe eq ON eq.IdEquipe = I.IdEquipe JOIN Etudiant e ON e.IdEtudiant = eq.IdChefEquipe WHERE I.Status='envoyer' AND I.IdEtudiant = ? AND I.IdEtudiant NOT IN (SELECT I2.IdEtudiant FROM Invitation I2 WHERE I2.Status = 'accepter') ", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}
module.exports.ShowMembreEquipe = (id, result) => {
    Db.query(" SELECT IdEquipe FROM Etudiant  WHERE IdEtudiant=? ", [id], (err, resl) => {
        if (err)
            console.log(err)

        Db.query("SELECT Nom,Prenom,Email FROM Etudiant WHERE IdEquipe = ? ORDER BY Nom", [resl[0].IdEquipe], (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        })
    });
}


module.exports.ChefEquipe = (id, result) => {
    Db.query(" SELECT IdEquipe FROM Equipe  WHERE IdChefEquipe=? ", [id], (err, resl) => {
        if (err)
            console.log(err)

        Db.query("UPDATE Etudiant SET IdEquipe = ? WHERE IdEtudiant = ?  ", [resl[0].IdEquipe, id], (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
                console.log("waaaaaach");
            } else {
                result(null, results);
                console.log('IDEQUIPE AFFECTée')
            }
        })
    });
}
module.exports.DeleteInvitation = (ideq, ide, result) => {
    Db.query("DELETE FROM Invitation WHERE IdEquipe = ? and IdEtudiant = ? ", [ideq, ide], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
            console.log("invitation supprimée");
        }
    });
}

module.exports.AcceptInvitation = (ideq, ide, result) => {
    Db.query("UPDATE Invitation SET Status='accepter' WHERE IdEquipe = ? and IdEtudiant = ?", [ideq, ide], (err, results) => {
        if (err) {
            console.log(err);
        } else {
            result(null, results);
            console.log("invitation acceptée");
        }
    });
}
module.exports.Equipe = (ideq, ide, result) => {
    Db.query("UPDATE Etudiant SET IdEquipe = ? WHERE IdEtudiant = ?", [ideq, ide], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
            console.log(" etudiant affecté a cette equipe");
        }
    })
}
module.exports.MembreEquipe = (id, result) => {
    Db.query(" SELECT IdEquipe FROM Invitation WHERE IdEtudiant=? AND Status='accepter' ", [id], (err, resl) => {
        if (err)
            console.log(err)

        Db.query("UPDATE Etudiant SET IdEquipe = ? WHERE IdEtudiant = ?  ", [resl[0].IdEquipe, id], (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
                console.log('idequipe affecté')
            }
        })
    });
}

module.exports.AnnulerInvitation = (id, ide, result) => {
    Db.query(" SELECT IdEquipe FROM Equipe  WHERE IdChefEquipe=? ", [id], (err, resl) => {
        if (err)
            console.log(err)

        Db.query("DELETE FROM Invitation WHERE IdEquipe = ? and IdEtudiant = ? ", [resl[0].IdEquipe, ide], (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
                console.log("inv annulée");
            }
        })
    });
}




module.exports.NotChefCondition = (id, result) => {
    Db.query("SELECT IdEtudiant FROM Invitation WHERE IdEtudiant = ? ", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}