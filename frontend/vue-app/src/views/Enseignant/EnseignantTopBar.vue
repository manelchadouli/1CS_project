<template>
  <nav class="top-bar">
    <ul>
      <li>
        <img class="logo" src="../../assets/logo.svg" alt="logo" />
      </li>
      <!-- This div is used to make a separator between the logo and the page links -->
      <li><div></div></li>

      <li><router-link to="#">Acceuil</router-link></li>
      <li>
        <router-link to="/Enseignant/ConsulterLesThemes">Themes</router-link>
      </li>
      <li>
        <router-link to="#">Soutenance</router-link>
      </li>
      <li>
        <router-link to="/enseignant/equipe">Equipe</router-link>
      </li>
      <li>
        <select name="year" @change="yearChanged">
          <option value="1">année 1</option>
          <option value="2">année 2</option>
          <option value="3">année 3</option>
          <option value="4">année 4</option>
          <option value="5">année 5</option>
        </select>
      </li>

      <button class="icons">
        <img src="../../assets/notification-svgrepo-com.svg" alt="bell" />
      </button>

      <li><button class="Deconnexion" @click="Deconnection">Deconnexion</button></li>
    </ul>
  </nav>
</template>

<script >
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "EtudiantTopBar",

  methods: {
    // This will get fired when the year gets changed
  
// This will get fired when the year gets changed 
    yearChanged(e) { 
      // The value could be {1,2,3,4,5} 
      var value = e.target.value; 
 
      // Get the current route 
      var currentRoute = this.$route.fullPath.toLowerCase(); 
     
      // If we are not in the students page 
      if (!currentRoute.includes("/enseignant/consulterlesthemes")){ 
        // Don't do anything 
        return; 
       } 
    localStorage.setItem("filterEnseignantValue",value) 
    this.$emit('filterTheme'); 
 
    },
    Deconnection(){
      console.log("================== ")
    localStorage.removeItem('token')
    localStorage.removeItem('User');
    this.$router.push('/Login/login');
    }
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
  border: none;
  margin: 24px;
}
.top-bar ul li button.Deconnexion {
  transition: ease-in 200ms;
  background-color: #fefefe;
  border: 2px solid #51a6dd;
  color: #51a6dd;
  padding: 9.6px 36px;
  margin: 16px 24px;
  border-radius: 16px;
}
.icons {
  background-color: transparent;
  width: 36px;
  margin-top: 24px;
}

.icons:hover {
  cursor: pointer;
  transform-origin: center;
  transform: scaleY(1.1) scaleX(1.1);
}
.top-bar ul li button:hover {
  animation: neon-border 0.3s forwards 0.2s, color-text 0.2s forwards;
}
.top-bar ul li img.logo {
  height: 36px;
  width: auto;
  padding: 16px;
}
.top-bar ul :nth-child(7) {
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
.feed-container {
  right: -440px !important;
}
</style>
