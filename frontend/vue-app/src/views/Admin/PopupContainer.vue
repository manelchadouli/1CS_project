<template>
  <div class="popup-container">
    <form>
      <h2>{{ theme.Titre }}</h2>
      <div>
        <label for="titreComplet">Titre Complet</label
        ><textarea
          readonly
          name="titreComplet"
          id="titreComplet"
          rows="2"
          v-model="theme.TitreComplet"
        ></textarea>
      </div>
      <div>
        <label for="encadreur">Encadreur</label
        ><textarea
          readonly
          v-model="theme.Prenom"
          name="encadreur"
          id="encadreur"
          rows="3"
        ></textarea>
      </div>
      <div>
        <label for="niveau">Niveau</label
        ><textarea
          readonly
          v-model="theme.Niveau"
          name="niveau"
          id="niveau"
          rows="1"
        ></textarea>
      </div>
      <div>
        <label for="motscles">Mots Cles</label
        ><textarea
          readonly
          v-model="theme.MotsCles"
          name="motscles"
          id="motscles"
          rows="3"
        ></textarea>
      </div>
      <div>
        <label for="resume">Resume</label
        ><textarea
          readonly
          v-model="theme.Description"
          name="resume"
          id="resume"
          rows="16"
        ></textarea>
      </div>
      <div>
        <label for="frontend">Frontend</label
        ><textarea
          readonly
          v-model="theme.TechnoFront"
          name="frontend"
          id="frontend"
          rows="2"
        ></textarea>
      </div>
      <div>
        <label for="backend">Backend</label
        ><textarea
          readonly
          v-model="theme.TechnoBack"
          name="backend"
          id="backend"
          rows="2"
        ></textarea>
      </div>
      <div>
        <label for="planDeTravail">Plan De Travail</label
        ><textarea
          readonly
          v-model="theme.PlanDeTravail"
          name="planDeTravail"
          id="planDeTravail"
          rows="5"
        ></textarea>
      </div>
      <div>
        <button @click.prevent="submit">OK</button>
      </div>
    </form>
  </div>
</template>

<script >
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "PopupContainer",
  props: { data: Object },

  computed: {
    theme() {
      return this.data;
    },
  },
  methods: {
    // This function will send the modified theme by the admin to the server
    submit() {
      // Close the popup after the job is done
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
    ". ten";
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
  text-align: right;
  grid-area: ten;
}
.popup-container > form > *:nth-child(10) button:nth-child(1) {
  transition: 0.3s ease-in;
  color: #51a6dd;
  border: 2px solid #51a6dd;
  background-color: #fefefe;
  padding: 16px 24px;
  margin: 24px;
  border-radius: 16px;
}
.popup-container > form > *:nth-child(10) button:nth-child(1):hover,
.popup-container > form > *:nth-child(10) button:nth-child(1):focus {
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
.popup-container > form > div label {
  font-size: 20.8px;
  font-weight: 500;
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