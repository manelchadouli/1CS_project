var config = require("../configuration/config");
Db = config.Database();

module.exports.Theme = (id, result) => {
    Db.query(" SELECT IdPromo FROM Etudiant WHERE IdEtudiant = ? ", [id], (err, resl) => {
        if (err)
            console.log(err)
        
    Db.query("SELECT IdTheme,TitreComplet FROM Theme WHERE Status='Valider' AND IdPromo = ?   ", [resl[0].IdPromo] ,(err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
    });   
}
module.exports.NbMaxTheme = (id, result) => {
    Db.query(" SELECT IdPromo FROM Etudiant WHERE IdEtudiant = ? ", [id], (err, resl) => {
        if (err)
            console.log(err)
        
    Db.query("SELECT NbMaxTheme FROM Promo WHERE IdPromo = ? ", [resl[0].IdPromo] ,(err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
    });   
}
module.exports.EnvoyerFicheDeVoeux = (id,data, result) => {
    Db.query(" SELECT IdEquipe FROM Equipe WHERE IdChefEquipe = ? ", [id], (err, resl) => {
        if (err)
            console.log(err)
        
    Db.query("INSERT INTO Choix SET IdEquipe = ?, IdTheme = ? ,Priorite = ?,DateEnvoi = NOW() ", [resl[0].IdEquipe,data.IdTheme,data.Priorite] ,(err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
    });  
}

      // Niveau , filière pour le filtrage
        module.exports.ThemeEquipeChoix = (result) => {    
            Db.query("SELECT t.IdTheme,t.TitreComplet,p.Niveau,p.Filiere,p.Annee,GROUP_CONCAT(c.IdEquipe) AS IdEquipe From Theme t JOIN Choix c ON t.IdTheme = c.IdTheme JOIN Equipe eq ON c.IdEquipe = eq.IdEquipe JOIN Etudiant e ON eq.IdChefEquipe = e.IdEtudiant JOIN Promo p ON e.IdPromo = p.IdPromo WHERE p.Annee = year(now()) GROUP BY t.IdTheme ",(err, results) => {             
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                }
            })
            }

    
            module.exports.EquipePriorite = (ideq,idtm, result) => {    
                Db.query("SELECT e.Nom,e.Prenom ,c.Priorite FROM Equipe eq JOIN Choix c ON c.IdEquipe=eq.IdEquipe JOIN Etudiant e ON e.IdEtudiant = eq.IdChefEquipe WHERE c.IdEquipe = ? AND c.IdTheme = ?", [ideq,idtm] ,(err, results) => {             
                    if(err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        result(null, results);
                    }
                })
                }
                module.exports.IsSelected = (id,result) => {    
                    Db.query("SELECT IdEquipe From Projet WHERE IdEquipe = ?", [id] ,(err, results) => {             
                        if(err) {
                            console.log(err);
                            result(err, null);
                        } else {
                            result(null, results);
                        }
                    })
                    }
