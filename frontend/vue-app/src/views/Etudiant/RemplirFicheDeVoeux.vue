<template>
  <TopBar />

  <div class="fiche">
    <h1>Fiche de voeux</h1>
    <div class="choix">
      <h2>Mes choix</h2>
      <div>
        <div v-for="theme in orderedChoices" :key="theme.IdTheme">
          {{ theme.TitreComplet }}
          <span
            ><i @click="down(theme.IdTheme)"></i
            ><i @click="up(theme.IdTheme)"></i></span
          ><button @click="remove(theme.IdTheme)">--</button>
        </div>
      </div>
    </div>

    <div class="themes">
      <span>
        <h2>Themes existant</h2>
        <button @click="send">envoyer</button>
      </span>
      <div>
        <div v-for="theme in Themes" :key="theme.IdTheme">
          <span>{{ theme.TitreComplet }}</span
          ><button @click="add(theme.IdTheme)">ajouter</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import EtudiantTopBar from "./EtudiantTopBar.vue";
import axios from "axios";

export default defineComponent({
  name: "RemplirFicheDeVoeux",
  components: {
    TopBar: EtudiantTopBar,
  },

  data() {
    return {
      Themes: [],
      NbMaxChoix:'',
      Choix: [],
      user: Object,
      nombreChoixMax: 0,
      i: 0,
    };
  },
  async created() {
    this.user = JSON.parse(localStorage.getItem('User'));
    await this.GetData();
  },
  computed: {

    // Orders the list of themes according to rank
    orderedChoices() {
      // Order the list of choices by rank
      var list = this.Choix.sort((a, b) => (b.Rang > a.Rang ? -1 : 1));
      // Return the list
      return list;
    },
  },
  methods: {

    async GetData() {
      try {
        const response = await axios.get(`http://localhost:5000/ThemePourChoix/${this.user.IdEtudiant}`);
        this.Themes= response.data;
        const resp = await axios.get(`http://localhost:5000/NbMaxTheme/${this.user.IdEtudiant}`);
        this.NbMaxChoix= resp.data;
      } catch (err) {
        console.log(err);
      }
      this.nombreChoixMax = this.NbMaxChoix[0].NbMaxTheme;
    },

    // Gives the selected theme a lower rank
    down(idTheme) {
      // Get the selected theme
      var theme = this.Choix.filter((theme) => theme.IdTheme === idTheme)[0];

      // If this is theme with the highest rank
      if (theme.Rang >= this.Choix.length - 1)
        // Don't do anything
        return;

      // Get the theme with the rank that we want to give to the new one
      var oldTheme = this.Choix.filter((them) => them.Rang === theme.Rang + 1);

      // Give the theme a lower rank
      theme.Rang++;

      // If there is another theme with that rank
      if (oldTheme.length > 0)
        // Higher up it's rank
        oldTheme[0].Rang--;
    },

    // Gives a given theme a higher rank
    up(idTheme) {
      // Get the selected theme
      var theme = this.Choix.filter((theme) => theme.IdTheme === idTheme)[0];

      // If the rank is already 0
      if (theme.Rang <= 0)
        // Don't do anything
        return;

      // Get the theme with the rank that we want to give to the new one
      var oldTheme = this.Choix.filter((them) => them.Rang === theme.Rang - 1);

      // Give the theme a higher rank
      theme.Rang--;

      // If there is another theme with that rank
      if (oldTheme.length > 0)
        // Lower it's rank
        oldTheme[0].Rang++;
    },

    // Remove a theme from the list of choices
    remove(idTheme) {
      // Get the theme to remove
      var themeToRemove = this.Choix.filter(
        (theme) => theme.IdTheme === idTheme
      )[0];

      // For all the choices
      this.Choix.forEach((choix) => {
        // If the rank of this choice is lower than the one we about to remove
        if (choix.Rang > themeToRemove.Rang)
          // Give it a higher rank
          choix.Rang--;
      });

      // Set the new list of choices
      this.Choix = this.Choix.filter((theme) => theme.IdTheme != idTheme);

      // Add this theme back to the list of non-selected themes
      this.Themes.push(themeToRemove);
    },

    // Add a theme to the list of choices
    add(idTheme) {
      // Get the number for selected themes
      var numberOfSelectedThemes = this.Choix.length;

      // If we already have selected the maximum number of themes
      if (numberOfSelectedThemes >= this.nombreChoixMax)
        // Don't do anything
        return;

      // Get the theme to add
      var theme = this.Themes.filter((theme) => theme.IdTheme === idTheme)[0];

      // Set the rank of the theme to be the last
      theme.Rang = numberOfSelectedThemes;

      // Add the theme
      this.Choix.push(theme);

      // Remove it from the existing list
      this.Themes = this.Themes.filter((theme) => theme.IdTheme != idTheme);
    },

    // This function will send the wishlist to the server
    async send() {
      // TODO: send wishlist to the server

      console.log("we are going to send this list to the server");
      var dataToSend = this.Choix;
      console.log(dataToSend);
      for ( const data of dataToSend){
        try {
        await axios.post(`http://localhost:5000/EnvoyerFicheDeVoeux/${this.user.IdEtudiant}` ,{
          IdTheme : data.IdTheme,
          Priorite : data.Rang +1 ,
        });
      } catch (err) {
        console.log(err);
      }
    
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
.fiche {
  margin-left: auto;
  margin-right: auto;
  max-width: 1152px;
  padding: 72px;
  display: grid;
  grid-template-areas:
    "title title"
    "choix themes";
  column-gap: 72px;
  grid-template-columns: 1fr 1fr;
}
.fiche h1 {
  grid-area: title;
  font-weight: 600;
  font-size: 48px;
  margin-bottom: 36px;
}
.fiche > .choix {
  grid-area: choix;
}
.fiche > .choix > h2 {
  color: #ff7f22;
  font-weight: 600;
  font-size: 20.8px;
  margin-bottom: 36px;
  margin-top: 24px;
  margin-left: 9.6px;
}
.fiche > .choix ::-webkit-scrollbar {
  width: 16px;
}
.fiche > .choix ::-webkit-scrollbar-track {
  border-radius: 16px;
  background-color: #fefefe;
}
.fiche > .choix ::-webkit-scrollbar-thumb {
  border-radius: 16px;
  background-color: #e6eefa;
}
.fiche > .choix ::-webkit-scrollbar-thumb:hover {
  background-color: #b1b2b2;
}
.fiche > .choix > div {
  scrollbar-color: #b1b2b2 #fefefe;
  scrollbar-width: thin;
  padding-bottom: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 360px;
}
.fiche > .choix > div > div {
  position: relative;
  border: 1px solid #e6eefa;
  box-shadow: 0px 0px 9.6px #e6eefa;
  border-radius: 24px;
  padding: 24px;
  margin-top: 24px;
  margin-right: 24px;
  margin-left: 9.6px;
  line-height: 1.3;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 144px;
  width: 288px;
}
.fiche > .choix > div > div > span > i {
  position: absolute;
  right: 24px;
  border: solid #ff7f22;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 4px;
}
.fiche > .choix > div > div > span > i:hover {
  cursor: pointer;
}
.fiche > .choix > div > div span > :nth-child(1) {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  top: 36px;
}
.fiche > .choix > div > div span > :nth-child(2) {
  transform: rotate(225deg);
  -webkit-transform: rotate(225deg);
  top: 24px;
}
.fiche > .choix > div > div > button {
  position: absolute;
  right: 72px;
  top: 24px;
  background-color: transparent;
  border: none;
  border-radius: 16px;
  font-weight: 600;
  color: #ff7f22;
  letter-spacing: -5px;
  font-weight: 600;
  padding: 0px 16px;
}
.fiche > .choix > div > div > button:hover {
  cursor: pointer;
}
.fiche > .themes {
  grid-area: themes;
}
.fiche > .themes > span > h2 {
  color: #51a6dd;
  font-weight: 600;
  font-size: 20.8px;
  margin-bottom: 24px;
  margin-top: 24px;
  margin-left: 24px;
  display: inline-block;
}
.fiche > .themes > span > button {
  color: #51a6dd;
  border: 2px solid #51a6dd;
  background-color: transparent;
  padding: 9.6px 24px;
  margin: 16px 24px;
  border-radius: 16px;
}
.fiche > .themes > span > button:hover,
.fiche > .themes > span > button:focus {
  box-shadow: 0px 0px 16px #51a6dd;
  cursor: pointer;
}
.fiche > .themes > span {
  display: flex;
  justify-content: space-between;
}
.fiche > .themes ::-webkit-scrollbar {
  width: 16px;
}
.fiche > .themes ::-webkit-scrollbar-track {
  border-radius: 16px;
  background-color: #fefefe;
}
.fiche > .themes ::-webkit-scrollbar-thumb {
  border-radius: 16px;
  background-color: #e6eefa;
}
.fiche > .themes ::-webkit-scrollbar-thumb:hover {
  background-color: #b1b2b2;
}
.fiche > .themes > div {
  scrollbar-color: #b1b2b2 #fefefe;
  scrollbar-width: thin;
  padding-bottom: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 360px;
}
.fiche > .themes > div > div {
  display: flex;
  justify-content: space-between;
  width: 576px;
  padding: 24px 16px;
  margin: 24px;
  border-radius: 16px;
  border: 1px solid #e6eefa;
  box-shadow: 0px 0px 9.6px #e6eefa;
}
.fiche > .themes > div > div > span {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fiche > .themes > div > div > button {
  background-color: transparent;
  border: none;
  font-weight: 600;
  color: #51a6dd;
  padding: 0px 16px;
}
.fiche > .themes > div > div > button:hover {
  cursor: pointer;
}
</style>