const express = require("express");
const RouterTheme = require("./Routes/Routes.js");
const cors = require("cors");
const parser = require("body-parser");
const port = process.env.PORT || 5000;
const path = require("path");
const AdminAuth = require("./Authentification/Admin_Auth");
const EtudiantAuth = require("./Authentification/Etudiant_Auth");
const authController = require("./Authentification/Controller");
const LoginRoutes = require("./Authentification/Routes")
const cookie = require("cookie-parser");
const app = express();
const router = express.Router();
app.use(cookie());
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.json());
//to allow our APP to use "views(html/css)" as static files
// app.use(express.static("../frontend/old/pages/login/WebRoot"));
// app.use(express.static("../frontend/old/pages/admin/WebRoot"));
// app.use(express.static("../frontend/old/pages/student/WebRoot"));

// router.get('/image', express.static("../frontend/pages/shared/images"));
app.use('/', LoginRoutes)
    //app.use('/', Etudiant_Routes);


///************************************************ */
router.post("/Inscrire", authController.postLogin);


//app.use('/', routes);
//app.get("/DashBord", Admin_Routes);
app.use(RouterTheme);
app.listen(port, err => {
        if (err) throw err
        else
            console.log("Sever is listening to Port number :" + port);
    })
    // module.exports = router;
    // import express
    //  email:s.beloufa@esi-sba.dz Admin : =65jz.?j Etudiant : hhpkGx'W