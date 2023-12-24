<template>
  <TopBar />

  <div class="ChoisirEquipe">
    <h1>Mon Equipe</h1>
    <br />
    <div class="Recherche">
      <input
        type="text"
        placeholder="Rechercher"
        v-model="searchText"
        @input="search"
      />
      <button
        @click.once="
          clicked = true;
          AddEquipe();
        "
        :disabled="click"
        class="CréerEquipe"
        :key="buttonKey"
      >
        Créer Equipe
      </button>
    </div>
    <div class="titles">
      <div class="Title1">Membres de mon equipe</div>
      <div class="Title2">Membres Disponibles</div>
    </div>
    <div class="Box1">
      <div class="MonEquipe" v-for="membre in membres" :key="membre.IdEtudiant">
        <p>{{ membre.Nom }}</p>
        <p>{{ membre.Prenom }}</p>
        <p>{{ membre.Email }}</p>
      </div>
    </div>

    <div class="Box2">
      <div
        class="RechercheMembre"
        v-for="Etudiant in Etudiants"
        :key="Etudiant.IdEtudiant"
      >
        <p>{{ Etudiant.Nom }}</p>
        <p>{{ Etudiant.Prenom }}</p>

        <div class="btns">
          <button
            class="Inviter"
            @click="
              Etudiant.inviteSent = true;
              Inviter(user.IdEtudiant, Etudiant.IdEtudiant);
            "
            :disabled="Etudiant.inviteSent"
          >
            Inviter
          </button>
          <button
            class="Annuler"
            @click="
              Etudiant.inviteSent = false;
              annuler(user.IdEtudiant, Etudiant.IdEtudiant);
            "
          >
            Annuler
          </button>
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
  name: "equipe",
  components: {
    TopBar: EtudiantTopBar,
  },
  data() {
    return {
      click: false,
      clicked: false,
      user: Object,
      Etudiants: [],
      membres: [],
    };
  },
  async created() {
    this.user = JSON.parse(localStorage.getItem("User"));
    await this.AddEquipe();
    await this.GetEtudiant();
    await this.GetMembres();
  },
  methods: {
    async GetEtudiant() {
      try {
        const response = await axios.get(
          `http://localhost:5000/AfficherEtudiant/${this.user.IdEtudiant}`
        );
        this.Etudiants = response.data;
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

    async AddEquipe() {
      if (this.clicked == true) {
        this.click = true;
        try {
          await axios.post(
            `http://localhost:5000/CreerEquipe/${this.user.IdEtudiant}`
          ).then((response)=>{
            this.user.IdEquipe=response.data;
            localStorage.setItem("User",JSON.stringify(this.user)); 
            //  this.user = JSON.parse(localStorage.getItem("User"));
          })
          this.GetEtudiant();

          await axios.post(
            `http://localhost:5000/Chef/${this.user.IdEtudiant}`
          );

          this.GetMembres();
        } catch (err) {
          console.log(err);
        }
      }
    },

    async Inviter(id1, id2) {
      try {
        await axios.post("http://localhost:5000/EnvoyerInvitation", {
          IdChefEquipe: id1,
          IdEtudiant: id2,
        });
        this.GetEtudiant();
        this.GetMembres();
        this.value = false;
      } catch (err) {
        console.log(err);
      }
      //fonction envoyer linvitation
      console.log("inviter working");
    },
    async annuler(id, ide) {
      this.value = false;
      try {
        const response = await axios.delete(
          `http://localhost:5000/AnnulerInv/${id}/${ide}`
        );
        this.GetEtudiant();
        this.GetMembres();
      } catch (err) {
        console.log(err);
      }
    },
    async GetMembres() {
      try {
        const response = await axios.get(
          `http://localhost:5000/AfficherMembreEquipe/${this.user.IdEtudiant}`
        );
        this.membres = response.data;
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
.ChoisirEquipe {
  padding: 36px 0px 144px 0px;
}
.ChoisirEquipe h1 {
  padding-left: 58px;
  font-size: 270%;
}
.Recherche {
}
input {
  font-size: 16px;
  border-radius: 16px;
  border: 2px solid #b1b2b2;
  color: #030c17;

  padding: 16px;
  margin-left: 100px;
  margin-bottom: 60px;

  width: 70%;
  float: left;
}
input:focus {
  box-shadow: 0px 0px 5px 2px #51a6dd;
  border: 1px solid #51a6dd;
}
.titles {
  border-radius: 10px;
  color: black;
  border: none;
  background-color: white;
  margin-left: 50px;
  margin-bottom: 80px;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
}
.Title1 {
  color: black;
  border: none;
  float: left;
  font-size: 30px;
  font-weight: 500;
  margin-left: 80px;
}
.Title2 {
  float: right;
  color: black;
  font-size: 30px;
  font-weight: 500;
  margin-right: 250px;
}
.Box1 {
  width: 500px;
  height: 400px;
  border: none;

  margin-left: 100px;
  margin-bottom: 50px;
  float: left;
  overflow-y: scroll;
  overflow-x: hidden;
}
/* width */
::-webkit-scrollbar {
  width: 5px;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 10px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: gray;
}
.Box2 {
  width: 500px;
  height: 400px;
  border: none;
  border-radius: 16px;
  margin-right: 100px;
  margin-bottom: 50px;
  float: right;
  overflow-y: scroll;
  overflow-x: hidden;
}
.MonEquipe {
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 40px;
  border-radius: 10px;
  width: 480px;
  border: 1px solid #51a6dd;
  background-color: #51a6dd;
  align-self: left;
  margin-bottom: 30px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.MonEquipe p {
  overflow: hidden;
  overflow: ellipsis;
  width: 100px;
  white-space: nowrap;
  transform: translateY(20%);
  font-size: 100%;
  color: white;
  margin-left: 5px;
  margin-right: 10px;
}
.RechercheMembre {
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 40px;
  border-radius: 10px;
  width: 480px;
  border: 1px solid gray;
  align-self: left;
  margin-bottom: 30px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fefefe;
}
.RechercheMembre p {
  overflow: hidden;
  overflow: ellipsis;
  width: 100px;
  white-space: nowrap;
  transform: translateY(20%);
  font-size: 100%;
  color: black;
  margin-left: 5px;
}
.Inviter {
  background-color: white;
  color: #51a6dd;
  width: 70px;
  height: 20px;
  border-radius: 9px;
  border: 1px solid #51a6dd;
  transform: translateY(40%);
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}
.Annuler {
  background-color: white;
  color: #ff7222;
  width: 70px;
  height: 20px;
  border-radius: 9px;
  border: 1px solid #ff7222;
  transform: translateY(40%);
  font-size: 12px;
  font-weight: 600;
  margin-left: 12px;
  text-align: center;
}
.btns {
  margin-right: 9px;
}
.Annuler:hover {
  cursor: pointer;
}
.Inviter:hover {
  cursor: pointer;
}
.Inviter:disabled {
  cursor: not-allowed;
  background-color: #b1b2b2;
  color: gray;
}
.CréerEquipe:disabled {
  pointer-events: none;
  cursor: not-allowed;
  background-color: #b1b2b2;
  color: gray;
  border: #b1b2b2;
}
button.CréerEquipe {
  transition: ease-in 200ms;
  background-color: #fefefe;
  border: 2px solid #51a6dd;
  color: #51a6dd;
  padding: 16px;
  margin-bottom: 60px;
  margin-right: 60px;
  border-radius: 16px;
  display: inline-block;
  float: right;
}
button.CréerEquipe:hover {
  cursor: pointer;

  transform-origin: center;
  transform: scaleY(1.1) scaleX(1.1);
  color: #ff7f22;
  border-color: #ff7f22;
}
</style>