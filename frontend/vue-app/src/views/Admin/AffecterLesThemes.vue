<template>
  <TopBar />

  <div class="pageAffecterLesThemes">
    <h1>page de l'affectation des themes</h1>
    <div>
      <button @click="remplir('AUTO')">Remplir Automatiquement</button>
      <button @click="remplir('EQUIPE')">Par note equipe</button>
    </div>
    <div class="themesList">
      <div v-for="theme in newThemes" :key="theme.IdTheme">
        <span>{{ theme.Titre }}</span
        ><button @click="reinitialiser(theme.IdTheme)">réinitialiser</button
        ><i @click="theme.IsOpen = !theme.IsOpen"></i>
        <div v-bind:class="{ hidden: !theme.IsOpen }">
          <div
            v-for="equipe in theme.Equipes"
            :key="equipe.IdEquipe"
            v-bind:class="{ selected: equipe.IsSelected }"
            @click="select(theme.IdTheme, equipe.IdEquipe)"
          >
            <span>{{ equipe.Priorite }}</span>
            <span>{{ equipe.NomChef }}</span>
            <button @click.stop="deselect(equipe.IdEquipe)">
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { defineComponent } from "vue";
import AdminTopBar from "./AdminTopBar.vue";
import axios from "axios"
export default defineComponent({
  name: "AffecterLesThemes",
  components: { TopBar: AdminTopBar },
  data() {
    return {
      // La liste de tous les themes, et les equipes qui les ont choisis
      Themes: [],
      equipe : Object,
      Selected: Object,
      newThemes:[],
     
    };
  },
  created() {
    // Get the data from the server
    this.LoadThemesFromServer();
  },
  methods: {
    // This function will get the themes from the server, the name of each team leader of each team
    // that chose that theme, the id of that team, the priority at which the theme was put in the wishlist
    // of that theme
    async LoadThemesFromServer() {
        
      try {

        const response = await axios.get("http://localhost:5000/ThemeEquipeChoix" ,{
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          console.log("response: " +response);
        this.Themes = response.data;
      } catch (err) {
        console.log(err);
      }
      for (var theme of this.Themes ){
         var newTheme = {
        Titre : "",
        IdTheme : 0,
        Equipes:[],
        IsOpen: false,
      };
        newTheme.Titre = theme.TitreComplet;
        newTheme.IdTheme = theme.IdTheme;
    
      for (var idequipe of theme.IdEquipe.split(",")) {
       try {
       const resp = await axios.get(`http://localhost:5000/EquipePriorite/${idequipe}/${theme.IdTheme}`);
        this.equipe = resp.data;
  
        const res = await axios.get(`http://localhost:5000/IsSelected/${idequipe}`);
        this.Selected = res.data;
  
      } catch (err) {
        console.log(err);
      }
        var Equipe = {
        IdEquipe : 0,
        NomChef: "",
        Priorite : 0,
        IsSelected : false ,
      };
    
    Equipe.IdEquipe = idequipe,
    Equipe.NomChef =  this.equipe[0].Nom + " " + this.equipe[0].Prenom,
    Equipe.Priorite = this.equipe[0].Priorite ,
    Equipe.IsSelected = this.Selected.length == 0 ? false : true ,
      
      
      newTheme.Equipes.push(Equipe)
        }

        this.newThemes.push(newTheme);
         
        
        }
        console.log(this.newThemes);
        },
            // This function will remove all the associated teams to a specific theme
    async reinitialiser(idTheme) {
        try {
       await axios.delete(`http://localhost:5000/Reinitialiser/${idTheme}`);
    this.LoadThemesFromServer;
  
      } catch (err) {
        console.log(err);
      }
    },
    // This function will remove the specified team from the specified theme
    async deselect(idEquipe) {
        try {
       await axios.delete(`http://localhost:5000/SupprimerProjet/${idEquipe}`);
    this.LoadThemesFromServer;
  
      } catch (err) {
        console.log(err);
      }
    },
    // This function will add the specified team to the specified theme
    async select(idTheme, idEquipe) {
          try {
       await axios.post(`http://localhost:5000/AjouterProjet/${idEquipe}/${idTheme}`);
    this.LoadThemesFromServer;
  
      } catch (err) {
        console.log(err);
      }
  
    },
    // Cette fonction va faire le remplissage automatique des toutes les themes et leur equipes
    remplir(critere) {
      // TODO: backend: implement all the three functions bellow
      // Sans aucune critere
      if (critere === "AUTO") {
        console.log("le remplissage auto");
      }
      // Remplissage par la moyenne de toute l'equipe
      else if (critere === "EQUIPE") {
        console.log("le remplissage par moyenne equipe");
      }
    },
  },
});
</script>

<style scoped>
html {
  background-color: #fefefe;
  color: #030c17;
}
* {
  margin: 0px;
  padding: 0px;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
}
a {
  transition: ease-in 200ms;
  color: #ff7f22;
  text-decoration: none;
}
a:hover,
a:focus {
  color: #51a6dd;
}
.pageAffecterLesThemes {
  margin-left: auto;
  margin-right: auto;
  max-width: 1152px;
  padding: 72px;
}
.pageAffecterLesThemes h1 {
  grid-area: title;
  font-weight: 600;
  font-size: 48px;
  margin-bottom: 72px;
}
.pageAffecterLesThemes > div:nth-child(2) {
  text-align: right;
}
.pageAffecterLesThemes > div:nth-child(2) > button {
  transition: all 0.2s ease;
  padding: 16px;
  margin: 0px 24px 72px 24px;
  border-radius: 16px;
  border: none;
  background-color: #51a6dd;
  color: #fefefe;
  box-shadow: 0px 0px 9.6px #51a6dd;
}
.pageAffecterLesThemes > div:nth-child(2) > button:hover {
  cursor: pointer;
  background-color: #ff7f22;
  box-shadow: 0px 0px 24px #ff7f22;
}
.pageAffecterLesThemes > .themesList > div {
  border: 2px solid #51a6dd;
  margin: 24px;
  padding: 24px;
  text-align: right;
  border-radius: 24px;
}
.pageAffecterLesThemes > .themesList > div > span {
  font-size: 20.8px;
  font-weight: 500;
  float: left;
}
.pageAffecterLesThemes > .themesList > div > i {
  border: solid #005d93;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 4px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.pageAffecterLesThemes > .themesList > div > i:hover {
  cursor: pointer;
}
.pageAffecterLesThemes > .themesList > div > button {
  transition: all 0.3s ease;
  background-color: #e6eefa;
  border: none;
  border-radius: 9.6px;
  padding: 9.6px;
  margin: 0px 24px;
}
.pageAffecterLesThemes > .themesList > div > button:hover {
  cursor: pointer;
  background-color: #ff7f22;
  color: #fefefe;
  box-shadow: 0px 0px 24px #ff7f22;
}
.pageAffecterLesThemes > .themesList > div > div {
  padding: 24px;
}
.pageAffecterLesThemes > .themesList > div > div > div {
  border-bottom: 3px solid #51a6dd;
  margin-top: 24px;
}
.pageAffecterLesThemes > .themesList > div > div > div:hover {
  cursor: pointer;
  border-bottom: 3px solid #ff7f22;
}
.pageAffecterLesThemes > .themesList > div > div > div > span:nth-child(1) {
  float: left;
  margin: 0px 24px;
}
.pageAffecterLesThemes > .themesList > div > div > div > span:nth-child(2) {
  margin: 0px 24px 0px 0px;
  float: left;
}
.pageAffecterLesThemes > .themesList > div > div > div > button {
  margin: 0px 24px;
  padding: 0px 9.6px;
  background-color: transparent;
  border: none;
  border-radius: 9.6px;
  font-size: 20.8px;
  color: #51a6dd;
  font-weight: 600;
}
.pageAffecterLesThemes > .themesList > div > div > div > button:hover {
  cursor: pointer;
  color: #ff7f22;
}
.hidden {
  visibility: collapse;
  display: none;
  height: 0px;
  padding: 0px !important;
}
.selected {
  border-bottom: 3px solid #ff7f22 !important;
}
</style>