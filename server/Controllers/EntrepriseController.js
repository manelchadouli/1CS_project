const EntrepriseModel = require("../Models/EntrepirseModel");


//AjouterEntreprise 
module.exports.AjouterEntreprise = (req, res) => {

        console.log(req.body);
        EntrepriseModel.AjouterEntreprise(req.body, (results) => {
            console.log(results)
            res.status(200).json(results);
        })





    }
    //GetEntreprise....
module.exports.GetEntreprise = (req, res) => {
        EntrepriseModel.GetEntreprise(results => {
            console.log(results);
            res.status(200).json(results);
        })
    }
    //update Entreprise ...
module.exports.UpdateEntreprise = (req, res) => {
        console.log(req.params.IdEntreprise);
        EntrepriseModel.UpdateEntreprise(req.params.IdEntreprise, req.body, (results) => {
            console.log(results);
            res.status(200).json(results);
        })
    }
    // delete Entreprise
module.exports.deleteEntreprise = (req, res) => {
    EntrepriseModel.deleteEntreprise(req.params.IdEntreprise, results => {
        if (results !== null)
            return res.status(200).json("Deleted");
        else
            return res.status(401).json("not Deleted");
    })
}