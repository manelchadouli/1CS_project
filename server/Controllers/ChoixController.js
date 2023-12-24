const ChoixController = require("../Models/ChoixModel")

module.exports.Theme = (req, res) => {
    ChoixController.Theme(req.params.id,(err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
module.exports.NbMaxTheme = (req, res) => {
    ChoixController.NbMaxTheme(req.params.id,(err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
module.exports.EnvoyerFicheDeVoeux = (req, res) => {
    const data = req.body;
    ChoixController.EnvoyerFicheDeVoeux(req.params.id,data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}
module.exports.ThemePourAffecter = (req, res) => {
    ChoixController.ThemePourAffecter((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
module.exports.ThemeEquipePriorite = (req, res) => {
    ChoixController.ThemeEquipePriorite(req.params.id,(err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
module.exports.ThemeEquipeChoix = (req, res) => {
    ChoixController.ThemeEquipeChoix((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
module.exports.EquipePriorite = (req, res) => {
    ChoixController.EquipePriorite(req.params.ideq,req.params.idtm,(err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
module.exports.IsSelected = (req, res) => {
    ChoixController.IsSelected(req.params.id,(err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}