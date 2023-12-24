<template>
  <nav class="top-bar">
    <ul>
      <li>
        <img class="logo" src="../../assets/logo.svg" alt="logo" />
      </li>
      <!-- This div is used to make a separator between the logo and the page links -->
      <li><div></div></li>

      <li><router-link to="/etudiant/MainPage">Accueil</router-link></li>

      <li>
        <router-link to="/Etudiant/ConsulterLesThemes">Themes</router-link>
      </li>

      <li v-if="linktoequipe">
        <router-link to="/etudiant/Equipe">Equipe</router-link>
      </li>
      <li v-else>
        <router-link to="/etudiant/EquipeNonChef">Equipe</router-link>
      </li>
      <li v-if="linktoequipe">
        <router-link to="/etudiant/remplirfichedevoeux"
          >Fiche de voeux</router-link
        >
      </li>

      <button class="icons" @click="openModal">
        <img src="../../assets/notification-svgrepo-com.svg" alt="bell" />
      </button>
      <li><button class="Deconnexion" @click.prevent="deconnection">Deconnexion</button></li>
    </ul>
  </nav>
  <transition class="toast"
    ><div v-if="showModal"><notifetudiant @close="closeModal" /></div
  ></transition>
</template>

<script >
import { defineComponent } from "@vue/runtime-core";
import notifetudiant from "./notifetudiant.vue";
import axios from "axios";
export default defineComponent({
  name: "EtudiantTopBar",
  components: {
    notifetudiant,
  },
  data() {
    return {
      linktoequipe: false,
      showModal: false,
      user: Object,
      NonChef: Object,
    };
  },
  async created() {
    this.user = JSON.parse(localStorage.getItem("User"));
    await this.Condition();
  },

  methods: {
    async Condition() {
      try {
        const response = await axios.get(
          `http://localhost:5000/NotChefCondition/${this.user.IdEtudiant}`
        );
        this.NonChef = response.data;
        this.linktoequipe = this.NonChef.length == 0 ? true : false;
        console.log(this.linktoequipe);
      } catch (err) {
        console.log(err);
      }
    },

    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    deconnection(){
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
  margin-top: 10px;
  margin-left: 800px;
  width: 36px;
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
.toast-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
.toast-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.toast-enter-active {
  transition: all 0.3s ease;
}

.toast-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.toast-leave-active {
  transition: all 0.3s ease;
}

@keyframes fade {
  0% {
    opacity: 0;
    transform: translateY(-60px);
  }
  50% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 1;
    transform: translateY(18px);
  }
}
</style>
