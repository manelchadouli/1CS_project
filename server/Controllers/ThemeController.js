const ThemeModel = require("../Models/ThemeModel")
    // Get All Themes

var config = require("../configuration/config");
Db = config.Database();


module.exports.ShowThemes = (req, res) => {
        ThemeModel.GetThemes((err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        });
    }
    // Get Single Theme
module.exports.ShowThemeById = (req, res) => {
    ThemeModel.GetThemeById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
module.exports.ShowThemeByEnseignant = (req, res) => {
        ThemeModel.GetThemeByEnseignant(req.params.id, (err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        });
    }
    // Create New Theme
module.exports.AddTheme = (req, res) => {
        const data = req.body;
        ThemeModel.InsertTheme(data, (err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        });
    }
    // Validate Theme
module.exports.ValiderTheme = (req, res) => {
        const id = req.params.id;
        ThemeModel.ValiderThemeById(id, (err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        });
    }
    // Reject Theme
module.exports.RefuserTheme = (req, res) => {
    const id = req.params.id;
    ThemeModel.RefuserThemeById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Theme
module.exports.UpdateTheme = (req, res) => {
    const data = req.body;
    console.log(data, " +++++ ", req.params.IdTheme);
    ThemeModel.UpdateThemeById(req.params.IdTheme, data, (results) => {
        res.status(200).json(results);
    });
}

// Delete Theme
module.exports.DeleteTheme = (req, res) => {
    const id = req.params.id;
    ThemeModel.DeleteThemeById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// ====================================================================================
getData = (query) => {
        return new Promise((resolve, reject) => {
            Db.query(query, [], (err, result) => {

                if (err) {
                    return reject(err);
                } else {
                    return resolve(result);
                }

            });
        })
    }
    // ====================================================================================



// Delete Theme
module.exports.AffecterAleatoire = async(req, res) => {

    // Get all promos
    var promos = await getData("select * from Promo");

    // For each promo
    for (var k = 0; k < promos.length; k++) {
        // Get current promo
        var promo = promos[k];

        // Get id promo
        var currentPromoId = promo.IdPromo;

        // Get all the themes that are for that promo ( select * from Theme where IdPromo = currentPromoId and Status = "valider")
        var themes = await getData("select * from Theme where IdPromo = " + currentPromoId + " and Status = 'valider' ");

        // Get all the teams in this promo that don't have a theme yet 
        // select eq.IdEquipe from Equipe eq, Etudiant et where eq.IdEquipe not in (select IdEquipe from Projet) and et.IdPromo = currentPromoId and et.IdEtudiant = eq.IdChefEquipe;
        var equipes = await getData("select eq.IdEquipe from Equipe eq, Etudiant et where eq.IdEquipe not in (select IdEquipe from Projet) and et.IdPromo =" + currentPromoId + " and et.IdEtudiant = eq.IdChefEquipe");

        // For each theme    
        for (var i = 0; i < themes.length; i++) {
            // Get the current theme
            var theme = themes[i];

            // Get the id of the current theme
            var currentThemeId = theme.IdTheme;

            // Get the number of teams that have been affected to the theme (select count(*) from Projet where IdTheme = currentThemeId)
            numberOfTeamsThatChoseThisTheme = getData("select count(*) from Projet where IdTheme =" + currentThemeId);

            // Get the maximum number of teams that can choose this theme
            maxNumberOfTeamsThatCanChooseThisTheme = promo.MaxEquipeParTheme;

            // While we still can add a team to the theme and there are still available teams
            while (numberOfTeamsThatChoseThisTheme < maxNumberOfTeamsThatCanChooseThisTheme && equipes.length > 0) {
                // Get the team to add a project to
                var equipe = equipes[0];

                // Set in the server the id of the new theme affected to this team
                // Aka create a new project with the id of the team, and id of the current theme
                // Insert in Projet(IdTheme, IdEquipe) values(currentThemeId,equipe.IdEquipe);
                var result = getData("Insert in Projet(IdTheme, IdEquipe) values(" + currentThemeId + "," + equipe.IdEquipe + ")")

                // Remove the team from the list(it is affected to a theme)
                equipes.shift();
            }

            // If the list of teams is empty
            if (equipes.length <= 0)
            // Job is done, go to the next promo
                break;
        }
    }



}

this.AffecterAleatoire();