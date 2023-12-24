<template>
  <TopBar />
  <div class="consulterLesThemes">
    <h1>Page de consulation des themes</h1>
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
    <div>
      <div
        v-for="theme in displayList"
        :key="theme.IdTheme"
        @click="openTheme(theme.IdTheme)"
      >
        <p>{{ theme.TitreComplet }}</p>
        <p>{{ theme.Niveau + "_" + theme.Filiere }}</p>
        <p>{{ theme.Annee }}</p>
        <p>{{ theme.MotsCles }}</p>
        <p>{{ theme.Nom + " " + theme.Prenom }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import EtudiantTopBar from "./EtudiantTopBar.vue";
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  name: "ConsulterLesThemesEtudiant",
  components: {
    TopBar: EtudiantTopBar,
  },

 
   data() {
    return {
      themes: [],
      displayList: [],
      searchText: "",
      sortType: "NONE",
    };
  },

  async created() {
    await this.GetTheme();
  },

  methods: {
    async GetTheme() {
      // Get the data from the server
      try {
        const response = await axios.get("http://localhost:5000/theme",{
        headers:{
            Authorization: localStorage.getItem('token')
        }
      });
        var themes = response.data;
        console.log(themes);
        this.themes = themes.filter((x) => x.Status === "Valider");
        this.displayList = [...this.themes];
      } catch (err) {
        console.log(err);
      }
    },
    // Go to the theme page

    async openTheme(id) {

      this.$router.push("/consulteruntheme/" + id);
    },

      search() {
      // If the text to search is empty...
      if (this.searchText === "") {
        // we return the whole list
        this.displayList = [...this.themes];
        return;
      }
      // Show the elements that contain the searched string
      this.displayList = this.themes.filter((theme) => this.containsText(theme));

      // Make the sort back to default
      this.sortType = "NONE";
    },
// Return true if the theme contains the specified text
    containsText(theme) {
      var lowerText = this.searchText.toLowerCase();
      
      // Return true if any of theme fields contains the text to search
       if (theme.Titre.toLowerCase().includes(lowerText)) return true;
      if (theme.TitreComplet.toLowerCase().includes(lowerText))
        return true;
     if (theme.Nom.toLowerCase().includes(lowerText)) return true;
       if (theme.Prenom.toLowerCase().includes(lowerText)) return true;
       if (theme.Niveau.toLowerCase().includes(lowerText)) return true;
       if (theme.MotsCles.toLowerCase().includes(lowerText)) return true;
       if (theme.Description.toLowerCase().includes(lowerText))
         return true;
       if (theme.TechnoFront.toLowerCase().includes(lowerText)) return true;
      if (theme.TechnoBack.toLowerCase().includes(lowerText)) return true;
       if (theme.PlanDeTravail.toLowerCase().includes(lowerText))
        return true;
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
  text-align: left;
  font-weight: 700;
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
  width: 65%;
  padding: 16px;
  margin: 24px 72px 0px 72px;
  outline-style: none;
}
.consulterLesThemes > input:focus {
  box-shadow: 0px 0px 5px 2px #51a6dd;
  border: 1px solid #51a6dd;
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
.consulterLesThemes > div > div:hover {
  animation: theme-hover 0.4s forwards;
  cursor: pointer;
}
.consulterLesThemes > div > div:hover p:nth-child(2) {
  animation: theme-element-hover 0.3s forwards 0.2s;
}
.consulterLesThemes > div > div:hover p:nth-child(3) {
  animation: theme-element-hover 0.3s forwards 0.4s;
}
.consulterLesThemes > div > div:hover p:nth-child(4) {
  animation: theme-element-hover 0.3s forwards 0.6s;
}
.consulterLesThemes > div > div:hover p:nth-child(5) {
  animation: theme-element-hover 0.3s forwards 0.8s;
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
</style>
