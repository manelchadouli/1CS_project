const compte = require('../Models/CompteModel')

module.exports.findCompte = (req, res) => {
    const email = req.body.email;
    compte.recherche_Compte(email, function(existe) {
        return res.status(200).json(existe);
    })
}
module.exports.updatePassword = (req, res) => {
    let idCompte = req.params.idCompte;
    let password = req.body.pass;
    compte.changePassword(idCompte, password, function(result) {
        if (result)
            res.status(200).json('good');
    })
}