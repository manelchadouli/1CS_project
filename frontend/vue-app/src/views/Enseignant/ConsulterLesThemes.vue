<template>
  <TopBar />
  <div v-if="popupVisible">
    <Popup
      @closePopup="closePopup"
      :modifer="modify"
      :theme="popupTheme"
    />
  </div>
  <div class="consulterLesThemes">
    <h1>Page de consulation des themes</h1>
    <br />
    <select name="sortOption" v-model="sortType" @change="sort">
      <option value="NONE">Rien</option>
      <option value="DATE">Date</option>
      <option value="TITL">Titre</option>
      <option value="TEAC">Enseignant</option>
      <option value="KEYS">Mots CLes</option>
    </select>
    <input
      type="text"
      placeholder="Rechercher"
      v-model="searchText"
      @input="search"
    />
    <button
      @click="
        {
          popupVisible = true;
          modify = false;
        }
      "
    >
      ajouter un theme
    </button>

    <div>
      <div
        v-for="theme in displayList"
        :key="theme.IdTheme"
        @click="openTheme(theme.IdTheme)"
        v-bind:class="{
          refuser: Refuser(theme.Status),
          valider: Valider(theme.Status),
          pasEncore: PasEncore(theme.Status),
        }"
      >
        <p>{{ theme.TitreComplet }}</p>
        <p>{{ theme.Niveau + "_" + theme.Filiere }}</p>
        <p>{{ theme.Annee }}</p>
        <p>{{ theme.MotsCles }}</p>
        <p>{{ this.user.Nom + " " + this.user.Prenom }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import EnseignantTopBar from "./EnseignantTopBar.vue";
import AjouterTheme from "./PopupContainer.vue";
import axios from "axios";
export default defineComponent({
  name: "ConsulterLesThemesEnseignant",
  components: {
    TopBar: EnseignantTopBar,
    Popup: AjouterTheme,
  },

  data() {
    return {
      popupVisible: false,
      themes: [],
      displayList: [],
      searchText: "",
      sortType: "NONE",

      // Boolean showing if thE popup that will get open is to modify a theme or to create a new one
      modify: false,

      // The theme we gonna modify if any
      popupTheme: {},
      user: Object,
    };
  },
  async created() {
    this.user = JSON.parse(localStorage.getItem("User"));
    await this.GetTheme();
  },
  methods: {
    async closePopup(){
      this.popupVisible = false;
      await this.GetTheme();

      location.reload();
    },
    Valider: function (status) {
      if (status === "Valider") return true;
      return false;
    },
    Refuser: function (status) {
      if (status === "Refuser") return true;
      return false;
    },
    PasEncore: function (status) {
      if (status === "PasEncore") return true;
      return false;
    },
    async GetTheme() {
      // Get the data from the server
      
        await axios.get(`http://localhost:5000/themeEnseignant/${this.user.IdEnseignant}`)
        .then((response)=>{
        this.themes = response.data;
        this.displayList = [...this.themes];
  })     
  .catch ((err)=>{
    console.log(err.response);
  })  
    },
    // Go to the theme page
    async openTheme(id) {
      // Get the theme we want to modify
      this.popupTheme = this.themes.filter((x) => x.IdTheme === id)[0];

      // Set the modifier flag to true
      this.modify = true;

      // Show the popup
      this.popupVisible = true;
    },
    search() {
      // If the text to search is empty...
      if (this.searchText === "") {
        // we return the whole list
        this.displayList = [...this.themes];
        return;
      }

      // Show the elements that contain the searched string
      this.displayList = this.themes.filter((theme) =>
        this.containsText(theme)
      );
      // Make the sort back to default
      this.sortType = "NONE";
    },
    // Return true if the theme contains the specified text
    containsText(theme) {
      var lowerText = this.searchText.toLowerCase();

      // Return true if any of theme fields contains the text to search
      if (theme.Titre.toLowerCase().includes(lowerText)) return true;
      if (theme.TitreComplet.toLowerCase().includes(lowerText)) return true;
      if (theme.Nom.toLowerCase().includes(lowerText)) return true;
      if (theme.Prenom.toLowerCase().includes(lowerText)) return true;
      if (theme.Niveau.toLowerCase().includes(lowerText)) return true;
      if (theme.MotsCles.toLowerCase().includes(lowerText)) return true;
      if (theme.Description.toLowerCase().includes(lowerText)) return true;
      if (theme.TechnoFront.toLowerCase().includes(lowerText)) return true;
      if (theme.TechnoBack.toLowerCase().includes(lowerText)) return true;
      if (theme.PlanDeTravail.toLowerCase().includes(lowerText)) return true;
      if (theme.Titre.toLowerCase().includes(lowerText)) return true;
      if (theme.Titre.toLowerCase().includes(lowerText)) return true;
      // Return false otherwise
      return false;
    },
    sort() {
      // Delete any search text if it exists
      this.searchText = "";
      // If we want to sort the list by date, TODO: need to rethink how to compare dates
      if (this.sortType === "DATE") {
        this.displayList = [...this.themes].sort((a, b) => {
          if (a.DateAjout < b.DateAjout) return -1;
          return 1;
        });
        return;
      }
      // If we want to sort the list by title
      if (this.sortType === "TITL") {
        this.displayList = [...this.themes].sort((a, b) => {
          if (a.TitreComplet < b.TitreComplet) return -1;
          return 1;
        });
        return;
      }
      // If we want to sort the list by teacher
      if (this.sortType === "TEAC") {
        this.displayList = [...this.themes].sort((a, b) => {
          if (a.Nom < b.Nom) return -1;
          if (a.Prenom < b.Prenom) return -1;
          return 1;
        });
        return;
      }
      // If we want to sort the list by key words
      if (this.sortType === "KEYS") {
        this.displayList = [...this.themes].sort((a, b) => {
          if (a.MotsCles < b.MotsCles) return -1;
          return 1;
        });
        return;
      }
      // If we don't want to sort the list
      if (this.sortType === "NONE") {
        this.displayList = [...this.themes];
        return;
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
  font-weight: 500;
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
.consulterLesThemes {
  padding: 36px 0px 144px 0px;
}
.consulterLesThemes > h1 {
  font-size: 48px;
  padding: 24px;
  margin-left: 36px;
  font-weight: 700;
  text-align: left;
  display: inline;
}
.consulterLesThemes > select {
  background-color: #fefefe;
  border: 2px solid #b1b2b2;
  padding: 16px;
  margin-left: 72px;
  border-radius: 16px;
  color: #b1b2b2;
  outline-style: none;
}
.consulterLesThemes > select:focus {
  box-shadow: 0px 0px 5px 2px #51a6dd;
  border: 1px solid #51a6dd;
}
.consulterLesThemes > input {
  font-size: 16px;
  border-radius: 16px;
  border: 2px solid #b1b2b2;
  color: #030c17;
  width: 48%;
  padding: 16px;
  margin: 24px 72px 0px 72px;
  outline-style: none;
}
.consulterLesThemes > input:focus {
  box-shadow: 0px 0px 5px 2px #51a6dd;
  border: 1px solid #51a6dd;
}
.consulterLesThemes > button {
  color: #51a6dd;
  border: 2px solid #51a6dd;
  background-color: #fefefe;
  padding: 16px 24px;
  border-radius: 16px;
}
.consulterLesThemes > button:hover,
.consulterLesThemes > button:focus {
  box-shadow: 0px 0px 16px #51a6dd;
  text-shadow: 0px 0px 9.6px #51a6dd;
  cursor: pointer;
}
.consulterLesThemes > div {
  margin: 72px 72px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 360px);
  gap: 36px;
}
.consulterLesThemes > div > div {
  border-radius: 24px;
  background-color: #fefefe;
  height: 216px;
  border: 1px solid #b1b2b2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "area-1 area-1"
    "area-2 area-3"
    "area-4 area-4"
    "area-5 area-5";
  box-shadow: 0px 0px 8px 3px #b1b2b2;
}
.consulterLesThemes > div > div > p {
  padding: 16px;
  border: 1px solid #e6eefa;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.consulterLesThemes > div > div > p:nth-child(1) {
  text-align: center;
  background-color: #51a6dd;
  border: 1px solid #51a6dd;
  color: #fefefe;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  grid-area: area-1;
}
.consulterLesThemes > div > div > p:nth-child(2) {
  grid-area: area-2;
}
.consulterLesThemes > div > div > p:nth-child(3) {
  grid-area: area-3;
}
.consulterLesThemes > div > div > p:nth-child(4) {
  grid-area: area-4;
}
.consulterLesThemes > div > div > p:nth-child(5) {
  grid-area: area-5;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
}
.consulterLesThemes > div > div.refuser:hover {
  animation: theme-hover-red 0.4s forwards;
  cursor: pointer;
}
.consulterLesThemes > div > div.refuser:hover p:nth-child(2) {
  animation: theme-element-hover-red 0.3s forwards 0.2s;
}
.consulterLesThemes > div > div.refuser:hover p:nth-child(3) {
  animation: theme-element-hover-red 0.3s forwards 0.4s;
}
.consulterLesThemes > div > div.refuser:hover p:nth-child(4) {
  animation: theme-element-hover-red 0.3s forwards 0.6s;
}
.consulterLesThemes > div > div.refuser:hover p:nth-child(5) {
  animation: theme-element-hover-red 0.3s forwards 0.8s;
}
.consulterLesThemes > div > div.refuser > p:nth-child(1) {
  background-color: red;
  border: 1px solid red;
  color: #fefefe;
}
.consulterLesThemes > div > div.valider:hover {
  animation: theme-hover-lime 0.4s forwards;
  cursor: pointer;
}
.consulterLesThemes > div > div.valider:hover p:nth-child(2) {
  animation: theme-element-hover-lime 0.3s forwards 0.2s;
}
.consulterLesThemes > div > div.valider:hover p:nth-child(3) {
  animation: theme-element-hover-lime 0.3s forwards 0.4s;
}
.consulterLesThemes > div > div.valider:hover p:nth-child(4) {
  animation: theme-element-hover-lime 0.3s forwards 0.6s;
}
.consulterLesThemes > div > div.valider:hover p:nth-child(5) {
  animation: theme-element-hover-lime 0.3s forwards 0.8s;
}
.consulterLesThemes > div > div.valider > p:nth-child(1) {
  background-color: lime;
  border: 1px solid lime;
  color: #fefefe;
}
.consulterLesThemes > div > div.pasEncore:hover {
  animation: theme-hover 0.4s forwards;
  cursor: pointer;
}
.consulterLesThemes > div > div.pasEncore:hover p:nth-child(2) {
  animation: theme-element-hover 0.3s forwards 0.2s;
}
.consulterLesThemes > div > div.pasEncore:hover p:nth-child(3) {
  animation: theme-element-hover 0.3s forwards 0.4s;
}
.consulterLesThemes > div > div.pasEncore:hover p:nth-child(4) {
  animation: theme-element-hover 0.3s forwards 0.6s;
}
.consulterLesThemes > div > div.pasEncore:hover p:nth-child(5) {
  animation: theme-element-hover 0.3s forwards 0.8s;
}
.consulterLesThemes > div > div.pasEncore > p:nth-child(1) {
  background-color: #51a6dd;
  border: 1px solid #51a6dd;
  color: #fefefe;
}
@keyframes theme-hover {
  100% {
    box-shadow: 0px 0px 10px 2px #51a6dd;
    border: 1px solid #51a6dd;
  }
}
@keyframes theme-element-hover {
  0% {
    border: none;
  }
  100% {
    color: #51a6dd;
    border: none;
  }
}
@keyframes theme-hover-red {
  100% {
    box-shadow: 0px 0px 10px 2px red;
    border: 1px solid red;
  }
}
@keyframes theme-element-hover-red {
  0% {
    border: none;
  }
  100% {
    color: red;
    border: none;
  }
}
@keyframes theme-hover-lime {
  100% {
    box-shadow: 0px 0px 10px 2px lime;
    border: 1px solid lime;
  }
}
@keyframes theme-element-hover-lime {
  0% {
    border: none;
  }
  100% {
    color: lime;
    border: none;
  }
}
</style>