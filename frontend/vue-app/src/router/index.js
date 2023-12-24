import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

// Shared pages imports
import Home from "../views/Home.vue"
import ConsulterUnTheme from "../views/Shared/ConsulterUnTheme.vue"
import login from "../views/Login/login.vue"
import email_validation from "../views/Login/email_validation.vue"
import SetNewPassword from "../views/Login/SetNewPassword.vue"
import PasswordSet from "../views/Login/PasswordSet.vue"


// Admin pages imports
import ValidateThemes from "../views/Admin/ValidateThemes.vue"
import Soutenance from "../views/Admin/Soutenance.vue"
import GestionCompteEntreprise from "../views/Admin/GestionCompteEntreprise.vue"
import GestionCompteEtudiant from "../views/Admin/GestionCompteEtudiant.vue"
import GestionCompteEnseignant from "../views/Admin/GestionCompteEnseignant.vue"
import AddEnseignant from "../views/Admin/AddEnseignant.vue"
import AddEtudiant from "../views/Admin/AddEtudiant.vue"
import AffecterLesEncadreurs from "../views/Admin/AffecterLesEncadreurs.vue"
import AffecterLesThemes from "../views/Admin/AffecterLesThemes.vue"


// Student pages imports
import projet from "../views/Etudiant/projet.vue"
import ConsulterLesThemesEtudiant from "../views/Etudiant/ConsulterLesThemes.vue"
import equipe from "../views/Etudiant/Equipe.vue"
import EquipeNonChef from "../views/Etudiant/EquipeNonChef.vue"
import RemplirFicheDeVoeux from "../views/Etudiant/RemplirFicheDeVoeux.vue"
import MainPage from "../views/Etudiant/MainPage.vue"


// Teacher pages imports
import ConsulterLesThemesEnseignant from "../views/Enseignant/ConsulterLesThemes.vue"
import Equipe from "../views/Enseignant/Equipe.vue"
import ConsulterLivrables from "../views/Enseignant/ConsulterLivrables.vue"


const routes = [

    // Shared paths
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requireAuth: false,

        }

    },
    {
        path: '/Login/login',
        name: 'login',
        component: login,
        meta: {
            requireAuth: false,

        }
    },
    {
        path: '/ConsulterUnTheme/:id',
        name: 'ConsulterUnTheme',
        component: ConsulterUnTheme,
        meta: {
            requireAuth: true

        },
    },
    {
        path: '/Login/email_validation',
        name: 'email_validation',
        component: email_validation,
        props: true,
        meta: {
            requireAuth: false,

        }
        // 1
    },
    {
        path: '/Login/SetNewPassword',
        name: 'SetNewPassword',
        component: SetNewPassword,
        props: true,
        meta: {
            requireAuth: false,

        }
        //2
    },
    {
        path: '/Login/PasswordSet',
        name: 'PasswordSet',
        component: PasswordSet,
        meta: {
            requireAuth: false,

        }
        //3
    },



    // Admin paths
    {
        path: '/Admin/validateThemes',
        name: 'ValidateThemes',
        component: ValidateThemes,
        meta: {
            requireAuth: true
        }

    },
    {
        path: '/Admin/GestionCompteEntreprise',
        name: 'GestionCompteEntreprise',
        component: GestionCompteEntreprise,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/Admin/AddEnseignant',
        name: 'AddEnseignant',
        component: AddEnseignant,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/Admin/AddEtudiant',
        name: 'AddEtudiant',
        component: AddEtudiant,
        meta: {
            requireAuth: true,

        },
    },
    {
        path: '/Admin/GestionCompteEnseignant',
        name: 'GestionCompteEnseignant',
        component: GestionCompteEnseignant,
        meta: {
            requireAuth: true
        }
    },

    {
        path: '/Admin/GestionCompteEtudiant',
        name: 'GestionCompteEtudiant',
        component: GestionCompteEtudiant,
        meta: {
            requireAuth: true

        },

    },

    {
        path: '/Admin/soutenance',
        name: 'Soutenance',
        component: Soutenance,
        meta: {
            requireAuth: true
        }
    },

    {
        path: '/Admin/AffecterLesEncadreurs',
        name: 'AffecterLesEncadreurs',
        component: AffecterLesEncadreurs,
        meta: {
            requireAuth: true
        }
    },

    {
        path: '/Admin/AffecterLesThemes',
        name: 'AffecterLesThemes',
        component: AffecterLesThemes,
        meta: {
            requireAuth: true
        }
    },




    // Student paths
    {
        path: '/Etudiant/projet',
        name: 'projet',
        component: projet,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/Etudiant/Equipe',
        name: 'equipe',
        component: equipe,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/Etudiant/EquipeNonChef',
        name: 'EquipeNonChef',
        component: EquipeNonChef,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/Etudiant/ConsulterLesThemes',
        name: 'ConsulterLesThemesEtudiant',
        component: ConsulterLesThemesEtudiant,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/Etudiant/RemplirFicheDeVoeux',
        name: 'RemplirFicheDeVoeux',
        component: RemplirFicheDeVoeux,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/Etudiant/MainPage',
        name: 'MainPage',
        component: MainPage,
        meta: {
            requireAuth: true
        }
    },


    // Teacher paths
    {
        path: '/Enseignant/ConsulterLesThemes',
        name: 'ConsulterLesThemesEnseignant',
        component: ConsulterLesThemesEnseignant,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/Enseignant/Equipe',
        name: 'Equipe',
        component: Equipe,
        meta: {
            requireAuth: true
        }
    },

    {
        path: '/Enseignant/ConsulterLivrables/:id',
        name: 'ConsulterLivrables',
        component: ConsulterLivrables,
        meta: {
            requireAuth: true
        }
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async(to, from, next) => {
    var role = "";
    //  Login is public route
    // if (to.name == "login" || to.name == "Home") {
    //     next();
    //     return;
    // }

    // verify if  the user is logged in and we verify his role 
    await axios.get("http://localhost:5000/verifyToken", {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then((response) => {
            var p = to.path.split('/')[1].charAt(0).toUpperCase() + to.path.split('/')[1].slice(1);
            // get the necessary role of the route we are going to ..

            switch (p) {
                case 'Admin':
                    role = "Admin";
                    break;
                case 'Enseignant':
                    role = "Enseignant";
                    break;
                case 'Etudiant':
                    role = "Etudiant";
                    break;
                case 'Entreprise':
                    role = "Entreprise";
                    break;
            }
            const user = response.data;
            //check if the route we are going to need authentication
            const requireAuth = to.matched.some(record => record.meta.requireAuth);
            if (requireAuth && user.role === role) {
                // if user is not logged in or don't have the necessary role ..
                //we redirect him to the login page ..
                next();
            } else if (!requireAuth) next();
            else if (requireAuth && user.role !== role)
                alert("You are not authorized to :" + to.path);
        })
        .catch((error) => {
            const requireAuth = to.matched.some(record => record.meta.requireAuth);
            console.log(error.response)
            if (requireAuth)
                next('/Login/login');
            else if (!requireAuth)
                next();

        })



})


export default router