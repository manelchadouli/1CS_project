<template>
  <div class="consulterUnTheme">
    <h1>{{ theme.Titre }}</h1>
    <div>
      <h2>Titre Complet</h2>
      <p>
        {{ theme.TitreComplet }}
      </p>
    </div>
    <div>
      <h2>Encadreur</h2>
      <p>{{ theme.Nom + " " + theme.Prenom }}</p>
    </div>
    <div>
      <h2>Niveau</h2>
      <p>{{ theme.Niveau + " " + theme.Filiere }}</p>
    </div>
    <div>
      <h2>Mots Cles</h2>
      <p>{{ theme.MotsCles }}</p>
    </div>
    <div>
      <h2>Resume</h2>
      <p>{{ theme.Description }}</p>
    </div>
    <div>
      <h2>Frontend</h2>
      <p>{{ theme.TechnoFront }}</p>
    </div>
    <div>
      <h2>Backend</h2>
      <p>{{ theme.TechnoBack }}</p>
    </div>
    <div>
      <h2>Plan De Travail</h2>
      <p>
        {{ theme.PlanDeTravail }}
      </p>
    </div>
    <div>
      <button @click="returnToThemesListPage">Fermer</button>
    </div>
  </div>
</template>


<script>
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  // The name of this component
  name: "ConsulterUnTheme",
  data() {
    return {
      theme: Object,
      fromRoute: "/",
    };
  },
  async created() {
    await this.GetThemeById();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => (vm.fromRoute = from));
  },

  // the different methods in this component
  methods: {
    async GetThemeById() {
      try {
        const response = await axios.get(
          `http://localhost:5000/theme/${this.$route.params.id}`
        );
        this.theme = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    returnToThemesListPage() {
      this.$router.push(this.fromRoute);
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
.consulterUnTheme {
  padding: 48px;
  padding-bottom: 144px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "area-1 area-1"
    "area-2 area-2"
    "area-3 area-4"
    "area-5 area-5"
    "area-6 area-6"
    "area-7 area-8"
    "area-9 ."
    ". area-10";
}
.consulterUnTheme > h1 {
  justify-self: center;
  font-size: 48px;
}
.consulterUnTheme > div {
  padding: 9.6px;
  margin: 24px;
}
.consulterUnTheme > div > h2 {
  font-size: 24px;
  margin-bottom: 9.6px;
  font-weight: 600;
  text-shadow: 0px 5px 9.6px #b1b2b2;
}
.consulterUnTheme > div > p {
  border: 1px solid #b1b2b2;
  border-radius: 16px;
  padding: 24px;
  font-size: 24px;
  box-shadow: 0px 0px 16px #b1b2b2;
}
.consulterUnTheme > div * {
  transition: 0.2s ease-in;
}
.consulterUnTheme > div:hover > h2,
.consulterUnTheme > div:focus > h2 {
  color: #51a6dd;
  text-shadow: 0px 5px 9.6px #51a6dd;
}
.consulterUnTheme > div:hover > p,
.consulterUnTheme > div:focus > p {
  box-shadow: 0px 0px 16px #51a6dd;
  border: 1px solid #e6eefa;
}
.consulterUnTheme *:nth-child(10) {
  text-align: right;
  padding-right: 0px;
}
.consulterUnTheme *:nth-child(10) > button {
  color: #ff7f22;
  border: 2px solid #ff7f22;
  background-color: #fefefe;
  padding: 16px 24px;
  border-radius: 16px;
}
.consulterUnTheme *:nth-child(10) > button:hover,
.consulterUnTheme *:nth-child(10) > button:focus {
  box-shadow: 0px 0px 16px #ff7f22;
  text-shadow: 0px 0px 9.6px #ff7f22;
  cursor: pointer;
}
.consulterUnTheme > :nth-child(1) {
  grid-area: area-1;
}
.consulterUnTheme > :nth-child(2) {
  grid-area: area-2;
}
.consulterUnTheme > :nth-child(3) {
  grid-area: area-3;
}
.consulterUnTheme > :nth-child(4) {
  grid-area: area-4;
}
.consulterUnTheme > :nth-child(5) {
  grid-area: area-5;
}
.consulterUnTheme > :nth-child(6) {
  grid-area: area-6;
}
.consulterUnTheme > :nth-child(7) {
  grid-area: area-7;
}
.consulterUnTheme > :nth-child(8) {
  grid-area: area-8;
}
.consulterUnTheme > :nth-child(9) {
  grid-area: area-9;
}
.consulterUnTheme > :nth-child(10) {
  grid-area: area-10;
}
</style>
