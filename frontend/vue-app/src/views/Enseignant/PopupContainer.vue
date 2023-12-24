<template>
  <div class="popup-container">
    <form>
      <div>
        <label for="titre">Titre</label>
        <textarea name="titre" id="titre" rows="1" v-model="Titre"></textarea>
      </div>
      <div>
        <label for="titreComplet">Titre Complet</label
        ><textarea
          name="titreComplet"
          id="titreComplet"
          rows="2"
          v-model="TitreComplet"
        ></textarea>
      </div>
      <div>
        <label for="Filière">Filière</label><br />
        <select v-model="Filiere" name="Filière" id="Filière">
          <option value="SIW">SIW</option>
          <option value="ISI">ISI</option>
          <option value="TC">tronc commun</option>
        </select>
      </div>
      <div>
        <label for="niveau">Niveau</label><br />
        <select v-model="Niveau" name="niveau" id="Niveau">
          <option value="1CPI">1CPI</option>
          <option value="2CPI">2CPI</option>
          <option value="1CS">1CS</option>
          <option value="2CS">2CS</option>
          <option value="3CS">3CS</option>
        </select>
      </div>
      <div>
        <label for="motscles">Mots Cles</label
        ><textarea
          v-model="MotsCles"
          name="motscles"
          id="motscles"
          rows="3"
        ></textarea>
      </div>
      <div>
        <label for="resume">Resume</label
        ><textarea
          v-model="Description"
          name="resume"
          id="resume"
          rows="16"
        ></textarea>
      </div>
      <div>
        <label for="frontend">Frontend</label
        ><textarea
          v-model="TechnoFront"
          name="frontend"
          id="frontend"
          rows="2"
        ></textarea>
      </div>
      <div>
        <label for="backend">Backend</label
        ><textarea
          v-model="TechnoBack"
          name="backend"
          id="backend"
          rows="2"
        ></textarea>
      </div>
      <div>
        <label for="planDeTravail">Plan De Travail</label
        ><textarea
          v-model="PlanDeTravail"
          name="planDeTravail"
          id="planDeTravail"
          rows="5"
        ></textarea>
      </div>
      <div>
        <button @click.prevent="cancel">annuler</button>
        <button class="supprimer" v-if="modifer" @click.prevent="supprimer">
          supprimer
        </button>
        <button class="enregistrer" @click.prevent="submit">enregistrer</button>
      </div>
    </form>
  </div>
</template>

<script >
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";
export default defineComponent({
  name: "AjouterTheme",
  data() {
    return {
      Titre: "",
      TitreComplet: "",
      IdTheme: "",
      Niveau: "",
      Filiere: "",
      MotsCles: "",
      Description: "",
      TechnoBack: "",
      TechnoFront: "",
      PlanDeTravail: "",
      user: Object,
    };
  },
  props: {
    // Boolean showing if this popup is to modify a theme or to create a new one
    modifer: false,
    // The theme we gonna modify if any
    theme: {},
  },
  async created() {
    this.user = JSON.parse(localStorage.getItem("User"));
  },
  mounted: function () {
    if (this.modifer) {
      
      this.Titre = this.theme.Titre;
      this.TitreComplet = this.theme.TitreComplet;
      this.Niveau = this.theme.Niveau;
      this.Filiere = this.theme.Filiere;
      this.MotsCles = this.theme.MotsCles;
      this.Description = this.theme.Description;
      this.TechnoBack = this.theme.TechnoBack;
      this.TechnoFront = this.theme.TechnoFront;
      this.PlanDeTravail = this.theme.PlanDeTravail;
      this.IdTheme = this.theme.IdTheme;
    }
  },
  methods: {
  
    // This function will send the modified theme by the admin to the server
    async submit() {
      
      // Close the popup after the job is done
      this.$emit("closePopup");
      
      // If we want to add a new theme
      if (!this.modifer) {
        try {
          await axios.post("http://localhost:5000/Ajoutertheme", {
            Titre: this.Titre,
            TitreComplet: this.TitreComplet,
            Niveau: this.Niveau,
            Filiere: this.Filiere,
            MotsCles: this.MotsCles,
            Description: this.Description,
            TechnoBack: this.TechnoBack,
            TechnoFront: this.TechnoFront,
            PlanDeTravail: this.PlanDeTravail,
            IdEnseignant: this.user.IdEnseignant,
          });
        } catch (err) {
          console.log(err);
        }
      }
      // Otherwise...
      else {
        // We want to change a theme
          await axios.post(`http://localhost:5000/UpdateTheme/${this.IdTheme}`, {
            Titre: this.Titre,
            TitreComplet: this.TitreComplet,
            MotsCles: this.MotsCles,
            Description: this.Description,
            TechnoBack: this.TechnoBack,
            TechnoFront: this.TechnoFront,
            PlanDeTravail: this.PlanDeTravail,
          })
          .then((response)=>{
            console.log("Response modifer");
            console.log(response)
          })
          .catch ((error)=>{
            console.log(err.response);
          }) 
      }

    },
    cancel() {
      // Send an event to close the popup
      this.$emit("closePopup");
    },
    async supprimer() {
      // We want to delete this theme
      // TODO: delete it
      var id = this.theme.IdTheme;
      try {
          await axios.delete(`http://localhost:5000/themeSup/${id}`);
        } catch (err) {
          console.log(err);
        }
      // Send an event to close the popup
      this.$emit("closePopup");
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
.popup-container {
  background-color: rgba(3, 12, 23, 0.3);
  width: 100%;
  height: 100vh;
  z-index: 2;
  position: fixed;
  top: 0px;
}
.popup-container > form {
  margin-left: auto;
  margin-right: auto;
  margin-top: 72px;
  margin-bottom: 72px;
  background-color: #fefefe;
  height: 75vh;
  width: 864px;
  overflow-y: scroll;
  scrollbar-color: #b1b2b2 #fefefe;
  scrollbar-width: thin;
  border-radius: 16px;
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "one one"
    "two two"
    "three four"
    "five five"
    "six six"
    "seven eight"
    "nine ."
    "ten ten";
}
.popup-container > form > *:nth-child(1) {
  grid-area: one;
  justify-self: center;
  font-size: 48px;
  font-weight: 700;
}
.popup-container > form > *:nth-child(2) {
  grid-area: two;
}
.popup-container > form > *:nth-child(3) {
  grid-area: three;
}
.popup-container > form > *:nth-child(4) {
  grid-area: four;
}
.popup-container > form > *:nth-child(5) {
  grid-area: five;
}
.popup-container > form > *:nth-child(6) {
  grid-area: six;
}
.popup-container > form > *:nth-child(7) {
  grid-area: seven;
}
.popup-container > form > *:nth-child(8) {
  grid-area: eight;
}
.popup-container > form > *:nth-child(9) {
  grid-area: nine;
}
.popup-container > form > *:nth-child(10) {
  grid-area: ten;
  text-align: right;
}
.popup-container > form > *:nth-child(10) button:nth-child(1) {
  transition: 0.3s ease-in;
  color: #ff7f22;
  border: 2px solid #ff7f22;
  background-color: #fefefe;
  padding: 16px 24px;
  border-radius: 16px;
  margin: 24px;
}
.popup-container > form > *:nth-child(10) button:nth-child(1):hover {
  box-shadow: 0px 0px 16px #ff7f22;
}
.popup-container > form > *:nth-child(10) button.supprimer {
  transition: 0.3s ease-in;
  color: red;
  border: 2px solid red;
  background-color: #fefefe;
  padding: 16px 24px;
  border-radius: 16px;
  margin: 24px;
}
.popup-container > form > *:nth-child(10) button.supprimer:hover {
  box-shadow: 0px 0px 16px red;
}
.popup-container > form > *:nth-child(10) button.enregistrer {
  transition: 0.3s ease-in;
  color: #51a6dd;
  border: 2px solid #51a6dd;
  background-color: #fefefe;
  padding: 16px 24px;
  margin: 24px;
  border-radius: 16px;
}
.popup-container > form > *:nth-child(10) button.enregistrer:hover,
.popup-container > form > *:nth-child(10) button.enregistrer:focus {
  box-shadow: 0px 0px 16px #51a6dd;
}
.popup-container > form > * {
  margin: 24px;
}
.popup-container > form > div textarea {
  resize: none;
  padding: 16px;
  background-color: transparent;
  box-sizing: border-box;
  width: 100%;
  border-radius: 9.6px;
  border: 1px solid #b1b2b2;
  box-shadow: 0px 0px 4px #b1b2b2;
  background-color: #fefefe;
  margin-top: 9.6px;
}
.popup-container > form > div textarea:focus {
  border: 2px solid #51a6dd;
  box-shadow: 0px 0px 4px #51a6dd;
  outline: none;
}
.popup-container > form > div > select {
  background-color: #fefefe;
  padding: 12px 0px 12px 12px;
  box-shadow: 0px 0px 4px #b1b2b2;
  border-radius: 9.6px;
  border: 2px solid #b1b2b2;
  margin: 12px 16px;
}
.popup-container > form > div label {
  font-size: 20.8px;
  font-weight: 600;
}
::-webkit-scrollbar {
  width: 16px;
}
::-webkit-scrollbar-track {
  border-radius: 16px;
  background-color: #fefefe;
}
::-webkit-scrollbar-thumb {
  border-radius: 16px;
  background-color: #e6eefa;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #b1b2b2;
}
</style>