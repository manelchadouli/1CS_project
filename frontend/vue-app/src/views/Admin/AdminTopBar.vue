<template>
  <nav class="top-bar">
    <ul>
      <li>
        <img src="../../assets/logo.svg" alt="logo" />
      </li>
      <!-- This div is used to make a separator between the logo and the page links -->
      <li><div></div></li>
      <li>
        <select name="year" @change="yearChanged">
          <option value="1">année 1</option>
          <option value="2">année 2</option>
          <option value="3">année 3</option>
          <option value="4">année 4</option>
          <option value="5">année 5</option>
        </select>
      </li>
      <li>
        <router-link to="/admin/validateThemes">Validation</router-link>
      </li>
      <li>
        <router-link to="/admin/AffecterLesEncadreurs">Encadreurs</router-link>
      </li>
      <li>
        <router-link to="/admin/AffecterLesThemes">Affectation</router-link>
      </li>
      <li>
        <router-link to="/admin/soutenance">Soutenance</router-link>
      </li>
      <li>
        <select v-model="selectPage" @change="userChanged">
          <option value="STU">étudiant</option>
          <option value="TEA">enseignant</option>
          <option value="ENT">entreprise</option>
        </select>
      </li>
      <li><button @click.prevent="Deconnexion">Deconnexion</button></li>
    </ul>
  </nav>
</template>

<script>
import router from "@/router";
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";

export default defineComponent({
  name: "AdminTopBar",

  data() {
    return {
      selectPage: "STU",
    };
  },
  mounted() {
    // Get the page that is in the local storage
    var value = localStorage.getItem("adminPage");

    // If it's not null
    if (value)
      // Set the value of the select element when the page loads
      this.selectPage = localStorage.getItem("adminPage");
  },
  methods: {
    // This will get fired when the type of user changes
    userChanged(e) {
      // The value could be {STU,TEA,ENT} pour étudiant,enseignant,entreprise
      var value = e.target.value;

      // Set the value in the global variable
      localStorage.setItem("adminPage", value);

      // Switch the value
      switch (value) {
        // If it was student
        case "STU":
          // Go to the students page
          this.$router.push("/admin/GestionCompteEtudiant");
          // Break
          break;

        // If it was teacher
        case "TEA":
          // Go to the teachers page
          this.$router.push("/admin/GestionCompteEnseignant");
          // Break
          break;

        // If it was entreprise
        case "ENT":
          // Go to the entreprises page
          this.$router.push("/admin/GestionCompteEntreprise");
          // Break
          break;
      }
    },

    // This will get fired when the year gets changed
    yearChanged(e) {
      // The value could be {1,2,3,4,5}
      var value = e.target.value;

      // Get the current route
      var currentRoute = this.$route.fullPath.toLowerCase();
    
      // If we are not in the students page
      if (!currentRoute.includes("/admin/gestioncompteetudiant")){
        // Don't do anything
        return;
      }
    localStorage.setItem("filterValue",value)
    this.$emit('filter');

    },
    Deconnexion() {
      localStorage.removeItem('token')
    localStorage.removeItem('User');
    this.$router.push('/Login/login');
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.top-bar {
  box-shadow: 0px 0px 9.6px 0px #030c17;
}
.top-bar ul {
  display: flex;
  width: 100%;
  align-content: space-between;
}
.top-bar ul li {
  list-style-type: none;
}
.top-bar ul li * {
  display: block;
}
.top-bar ul li a {
  font-size: large;
  text-decoration: none;
  color: #030c17;
  margin: 24px;
  transition: ease-in 200ms;
}
.top-bar ul li a:hover {
  color: #51a6dd;
}
.top-bar ul li select {
  background-color: #fefefe;
  padding: 12px 0px 12px 12px;
  border: none;
  margin: 12px 16px;
}
.top-bar ul li button {
  transition: ease-in 200ms;
  background-color: #fefefe;
  border: 2px solid #51a6dd;
  color: #51a6dd;
  padding: 9.6px 36px;
  margin: 16px 24px;
  border-radius: 16px;
}
.top-bar ul li button:hover {
  animation: neon-border 0.3s forwards 0.2s, color-text 0.2s forwards;
}
.top-bar ul li img {
  height: 36px;
  width: auto;
  padding: 16px;
}
.top-bar ul :nth-child(8) {
  text-align: right;
  margin-left: auto;
}
.top-bar ul li:nth-child(2) {
  width: 3px;
  background-color: #030c17;
  margin: 24px;
  opacity: 20%;
}
@keyframes neon-border {
  100% {
    border: 2px solid #ff7f22;
    box-shadow: 0px 0px 16px #ff7f22;
  }
}
@keyframes color-text {
  100% {
    color: #ff7f22;
  }
}
</style>
