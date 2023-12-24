<template>
  <div class="toast" v-for="inv in invitations" :key="inv.IdEquipe">
    <div class="toast-content">
      <i class="fas fa-solid fa-check check"></i>
      <div class="message">
        <span class="text text-1">{{ inv.Nom }} {{ inv.Prenom }} </span>
        <span class="text text-2"
          >vous etes invitez à rejoindre cette equipe</span
        >
      </div>
      <button
        type="button"
        class="refuse"
        @click="Supprimer(inv.IdEquipe, user.IdEtudiant)"
      >
        refuser
      </button>
      <button
        type="button"
        class="accept"
        @click="Accepter(inv.IdEquipe, user.IdEtudiant)"
      >
        accepter
      </button>
    </div>
    <i button class="fa-solid fa-xmark close" @click="closeModal"></i>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";
export default defineComponent({
  name: "notifetudiant",
  data() {
    return {
      invitations: [],
      user: Object,
      Etudiant: Object,
    };
  },
  async created() {
    this.user = JSON.parse(localStorage.getItem("User"));
    await this.GetInvitations();
  },
  methods: {
    async GetInvitations() {
      try {
        const response = await axios.get(
          `http://localhost:5000/EtudiantInvitation/${this.user.IdEtudiant}`
        );
        this.invitations = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async Accepter(ideq, ide) {
      try {
        await axios.post(`http://localhost:5000/AccepterInv/${ideq}/${ide}`);
        await axios.post(
          `http://localhost:5000/Membre/${this.user.IdEtudiant}`
        );
      } catch (err) {
        console.log(err);
      }
      this.GetInvitations();
      this.GetMembres();
    },
    async Supprimer(ideq, ide) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/SupprimerInv/${ideq}/${ide}`
        );
        this.GetMembres();
      } catch (err) {
        console.log(err);
      }
      this.GetInvitations();
    },
    closeModal() {
      this.$emit("close");
      this.GetInvitations();
    },
  },
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
}
.toast {
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px 10px 50px 10px;
  position: absolute;
  top: 80px;
  right: 10px;
  border-left: 0 6px solid #d3131d;
  overflow: hidden;
}
.toast .toast-content {
  display: flex;
  align-items: center;
}
.toast-content .check {
  height: 25px;
  width: 25px;
  background-color: #4070f4;
  color: #fff;
  font-size: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.message .text {
  font-size: 15px;
  font-weight: 400;
  color: #666666;
}
.message .text.text-1 {
  font-weight: 600;
  color: #333;
}
.toast-content .message {
  display: flex;
  flex-direction: column;

  margin-right: -85px;
}
.toast .close {
  position: absolute;
  top: 10px;
  right: 15px;
  padding: 5px;
  cursor: pointer;
  opacity: 0.7;
}
.toast .close:hover {
  opacity: 1;
}
.toast .refuse {
  background-color: #ff7222;
  border-radius: 16px;
  border: 1px solid white;
  color: white;
  padding: 6.6px 6px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin-bottom: -90px;
  /* right: -100px;*/
}
.toast .refuse:hover {
  opacity: 1;
  background-color: orange;
}
.toast .accept {
  background-color: #51a6dd;
  border-radius: 16px;
  border: 1px solid white;
  color: white;
  padding: 6.6px 6px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin-bottom: -90px;
  opacity: 0.7;
}
.toast .accept:hover {
  opacity: 1;
  background-color: rgb(86, 156, 236);
}
</style>