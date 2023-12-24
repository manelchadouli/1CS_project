<template>
  <TopBar />

  <div class="page-container">
    <h1>Vos Equipes</h1>

    <div class="eq">
      <div class="equipe" v-for="equipe in equipes" :key="equipe.IdEquipe" @click="OuvrirEquipe(equipe.IdEquipe)">
        <h2>{{ equipe.Nom }} {{ equipe.Prenom }}</h2>
        <p>{{ equipe.TitreComplet }}</p>
        <div class="percent">{{ percent }}%</div>
        <div class="loading-bar">
          <div class="percentage" :style="{ width: percentage + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import EnseignantTopBar from "./EnseignantTopBar.vue";
import axios from "axios";
export default defineComponent({
  name: "Equipe",
  components: {
    TopBar: EnseignantTopBar,
  },
  data() {
    return {
      percentage: 80,
      equipes: [],
      user: Object,
    };
  },
  computed: {
    percent() {
      return this.percentage;
    },
  },
  async created() {
    this.user = JSON.parse(localStorage.getItem("User"));
    await this.GetEquipes();
  },
  methods: {
    OuvrirEquipe(idEquipe){
      this.$router.push("/Enseignant/ConsulterLivrables/" + idEquipe);
    },

    async GetEquipes() {
      try {
        const response = await axios.get(
          `http://localhost:5000/EnseignantEquipes/${this.user.IdEnseignant}`
        );
        this.equipes = response.data;
        // get id etudiants de table invitations
        //     var listEtudiantsAvecInvite= [];
        //     listEtudiantsAvecInvite.forEach(etudiant => {
        // this.Etudiants.forEach(checkEtudiant => {
        //       checkEtudiant.inviteSent =
        //     });
        //     });
      } catch (err) {
        console.log(err);
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
.page-container {
  padding: 36px 0px 144px 0px;
}
.equipe {
  padding: 30px;
  border-radius: 24px;
  background-color: #fefefe;
  height: 170px;
  border: 1px solid #b1b2b2;
cursor: pointer;
  box-shadow: 0px 0px 8px 3px #b1b2b2;
}
.eq {
  margin: 72px 72px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  gap: 60px;
}
.equipe h2 {
  text-align: center;
  font-size: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 10px;
}
.equipe p {
  white-space: normal;
  text-align: center;
  height: 50px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.page-container h1 {
  padding-left: 58px;
  font-size: 270%;
}
.loading-bar {
  position: relative;
  width: 200px;
  height: 10px;
  border-radius: 15px;
  background-color: transparent;
  overflow: hidden;
  border: 1px solid #b1b2b2;
}
.percentage {
  position: absolute;
  display: block;
  height: 100%;
  border-radius: 15px;
  background-color: #51a6dd;
  background-size: 30px 30px;
}
.percent {
  padding-top: 45px;
  padding-bottom: 2px;
}
</style >