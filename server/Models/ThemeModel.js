var config = require("../configuration/config");
Db = config.Database();
//Get all themes ( pour consulter themes)
module.exports.GetThemes = (result) => {
    Db.query("SELECT t.IdTheme,t.Titre,t.TitreComplet,t.Description,t.TechnoBack,t.TechnoFront,t.MotsCles,t.Status,t.PlanDeTravail,e.Nom,e.Prenom,p.Niveau,p.Filiere,p.Annee FROM Theme t JOIN Enseignant e ON t.IdEnseignant = E.IdEnseignant  JOIN Promo p ON t.IdPromo = p.IdPromo", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            console.log(results);
            result(null, results);
        }
    });
}

//Get single theme (for theme details)
module.exports.GetThemeById = (id, result) => {
    Db.query("SELECT t.IdTheme,t.Titre,t.TitreComplet,t.Description,t.TechnoBack,t.TechnoFront,t.MotsCles,t.Status,t.PlanDeTravail,e.Nom,e.Prenom,p.Niveau,p.Filiere,p.Annee FROM Theme t JOIN Enseignant e ON t.IdEnseignant = E.IdEnseignant  JOIN Promo p ON t.IdPromo = p.IdPromo WHERE IdTheme = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

module.exports.GetThemeByEnseignant = (id, result) => {
    Db.query("select * from Theme JOIN Promo ON Theme.IdPromo = Promo.IdPromo where IdEnseignant = ? ", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            console.log(results);
            result(null, results);

        }
    });
}
module.exports.InsertTheme = (data, result) => {
    Db.query(" SELECT IdPromo FROM Promo  WHERE Annee = year(now()) AND Niveau= ? AND Filiere = ?  ", [data.Niveau,data.Filiere], (err, resl) => {
        if (err)
            console.log(err)
        
    Db.query("INSERT INTO Theme SET Titre = ? ,TitreComplet = ?, MotsCles = ?,Description = ?,TechnoBack = ? ,TechnoFront = ?,Status =?,PlanDeTravail = ? , IdEnseignant = ?, IdPromo = ? ", [data.Titre, data.TitreComplet, data.MotsCles, data.Description, data.TechnoBack, data.TechnoFront, Status = 'PasEncore', data.PlanDeTravail, data.IdEnseignant,resl[0].IdPromo] ,(err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
    });   
}

// Insert theme in database
/*module.exports.InsertTheme = (data, result) => {
    Db.query("INSERT INTO Theme SET Titre = ? ,TitreComplet = ?, Promo = ? ,Annee = ?, MotsCles = ?,Description = ?,TechnoBack = ? ,TechnoFront = ?,Status =?,PlanDeTravail = ? , IdEnseignant = ? ", [data.Titre, data.TitreComplet, data.Promo, Annee = year(now()), data.MotsCles, data.Description, data.TechnoBack, data.TechnoFront, Status = 'PasEncore', data.PlanDeTravail, data.IdEnseignant], (err, results) => {
        if (err) {
            console.log(err);

            result(err, null);
        } else {
            console.log("thème ajouté");
            result(null, results);
        }
    });
}*/

//Update theme 
module.exports.UpdateThemeById = (IdTheme,data,result) => {
        Db.query("UPDATE Theme SET Titre = ?,TitreComplet = ?,MotsCles = ?,Description = ?,TechnoBack = ?,TechnoFront = ?,Status = 'PasEncore',PlanDeTravail = ? WHERE IdTheme = ?", [data.Titre, data.TitreComplet, data.MotsCles, data.Description, data.TechnoBack, data.TechnoFront, data.PlanDeTravail, IdTheme], (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
    }
    // Refuser theme
module.exports.RefuserThemeById = (id, result) => {
    Db.query("UPDATE Theme SET Status = 'Refuser' WHERE IdTheme = ? ", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Valider theme
module.exports.ValiderThemeById = (id, result) => {
        Db.query("UPDATE Theme SET Status = 'Valider' WHERE IdTheme = ?", [id], (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
    }
    //Delete theme
module.exports.DeleteThemeById = (id, result) => {
    Db.query("DELETE FROM Theme WHERE IdTheme = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}