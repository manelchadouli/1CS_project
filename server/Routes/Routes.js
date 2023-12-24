const express = require("express");
var path = require('path');
var cors = require('cors');
var fs = require('fs');
const multer = require('multer');
const config = require('../configuration/Read_Excel')
const Etudiant_Auth = require("../Authentification/Etudiant_Auth")
const AdminAuth = require("../Authentification/Admin_Auth")
    /*const authorized = require("../Authentification/Etudiant_Auth");*/
const EnseignantAuth = require("../Authentification/Enseignant_Auth");
// init express router
const router = express.Router();
const ThemeController = require("../Controllers/ThemeController");
const EtudiantController = require("../Controllers/EtudiantController");
const EnseignantController = require("../Controllers/EnseignantController");
const EquipeController = require("../Controllers/EquipeController");
const CompteController = require('../Controllers/CompteController');
const fileFilter = require("../Controllers/XcelReader")
const ChoixController = require('../Controllers/ChoixController');
const ProjetController = require('../Controllers/ProjetController');
const EtudiantModel = require("../Models/EtudiantModel");
const isLogedIn = require("../Authentification/isLogedIn");
const EntrepriseController = require("../Controllers/EntrepriseController")
const upload = multer({
    dest: '../donne/',
    fileFilter
});
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../Livrables')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
var uploadLivrable = multer({
    storage: storage
});


router.get('/verifyTokenEnseignant', EnseignantAuth);
router.get('/theme', ThemeController.ShowThemes);
router.get('/verifyToken', isLogedIn);
router.get('/theme/:id', ThemeController.ShowThemeById);
router.put('/theme/:id', ThemeController.ValiderTheme);
router.get('/themeEnseignant/:id', ThemeController.ShowThemeByEnseignant);
router.delete('/theme/:id', ThemeController.RefuserTheme);
router.delete('/themeSup/:id', ThemeController.DeleteTheme);
router.post('/UpdateTheme/:IdTheme',ThemeController.UpdateTheme);
router.post('/Ajoutertheme', ThemeController.AddTheme);
router.post('/AjouterEtudiant', AdminAuth, EtudiantController.AjouterEtudiant);
router.get('/getEtudiant', AdminAuth, EtudiantController.getEtudiants);
router.get('/getEtudiant/:id', AdminAuth, EtudiantController.GetEtudiant);
router.delete('/deleteEtudiant/:id', AdminAuth, EtudiantController.deleteEtudiant);
router.post('/AjouterEnseignant', AdminAuth, EnseignantController.AjouterEnseignant);
router.get('/Enseignant', AdminAuth, EnseignantController.ConsulterEnseignants);
router.post('/CreerEquipe/:id', EquipeController.AjouterEquipe);
router.delete('/SupprimerEnseignant/:id', AdminAuth, EnseignantController.deleteEnseignant);
router.get('/AfficherEtudiant/:id', EquipeController.AffichierEtudiant);
router.post('/EnvoyerInvitation', EquipeController.AjouterInvitation);
router.get('/EtudiantInvitation/:id', EquipeController.AfficherInvitation);
router.delete('/SupprimerInv/:ideq/:ide', EquipeController.SupprimerInvitation);
router.delete('/AnnulerInv/:id/:ide', EquipeController.AnnulerInvitation);
router.post('/AccepterInv/:ideq/:ide', EquipeController.AccepterInvitation);
router.post('/Membre/:id', EquipeController.MembreEquipe);
router.get('/AfficherMembreEquipe/:id', EquipeController.AfficherMembreEquipe);
router.post('/Chef/:id', EquipeController.ChefEquipe);
router.get('/NotChefCondition/:id', EquipeController.NotChefCondition);
router.post('/findCompte', CompteController.findCompte);
router.post('/updatePassword/:idCompte', CompteController.updatePassword)
router.post('/uploadFile', upload.single('file'), (req, res) => {
    var len = 0;
    config.ReadExcel(req.body.imported, req.file.path, function(length) {
        len = length;
    })
    res.status(200).json(len);
});

router.use(function(err, req, res, next) {
    if (err.code === "WORNG_EXTENSION") {
        return res.status(422).json({ error: "Only excel files allowed " });
    }
});
//************************************************************ */
router.get('/downloadLivrable/:idLivrable',
    cors({
        exposedHeaders: ['Content-Disposition'],
    }),
    ProjetController.DownloadLivrable)

//***************************************************** */
router.post('/uploadLivrable', uploadLivrable.single('file'), ProjetController.AjouterLivrables);
router.get('/getLivrables/:idEquipe', ProjetController.GetLivrables);
router.post('/modifieEtudiant/:idEtudiant', AdminAuth, EtudiantController.modifieEtudiant);
router.post('/modifieEnseignant/:idEnseignant', AdminAuth, EnseignantController.modifieEnseignant);
router.get('/ThemePourChoix/:id', ChoixController.Theme);
router.get('/NbMaxTheme/:id', ChoixController.NbMaxTheme);
router.post('/EnvoyerFicheDeVoeux/:id', ChoixController.EnvoyerFicheDeVoeux);
router.get('/ThemePourAffecter', ChoixController.ThemePourAffecter);
router.get('/ThemeEquipePriorite/:id', ChoixController.ThemeEquipePriorite);
router.get('/ThemeEquipeChoix', ChoixController.ThemeEquipeChoix);
router.get('/EquipePriorite/:ideq/:idtm', ChoixController.EquipePriorite);
router.get('/IsSelected/:id', ChoixController.IsSelected);

router.post('/AjouterProjet/:ideq/:idtm', ProjetController.AddProjet);
router.delete('/SupprimerProjet/:ideq', ProjetController.DeleteProjet);
router.delete('/Reinitialiser/:idtm', ProjetController.Reinitialiser);
router.get('/EquipePourEncadrant', ProjetController.EquipePourEncadrant);
router.get('/MembresEquipe/:id', ProjetController.MembresEquipe);
router.get('/Encadreurs', ProjetController.Encadreurs);
router.post('/AjouterEncadrant/:ide/:ideq', AdminAuth, ProjetController.AddEncadrantProjet);
router.get('/EnseignantEquipes/:id', ProjetController.EnseignantEquipes);
router.post('/AjouterCommentaire/:id', ProjetController.AjouterCommentaire)
router.post('/AjouterEntreprise', EntrepriseController.AjouterEntreprise);
router.get('/GetEntreprises', EntrepriseController.GetEntreprise);
router.post('/modifieEntreprise/:IdEntreprise', EntrepriseController.UpdateEntreprise);
router.delete('/deleteEntreprise/:IdEntreprise', EntrepriseController.deleteEntreprise);

module.exports = router;