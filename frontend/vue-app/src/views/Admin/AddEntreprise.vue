<template>
  <div class="backdrop">
    <div class="modal">
      <h1>{{titlee}}</h1>

      <label for="nom"><b>Nom</b></label>
      <input type="text" placeholder="Entrer nom" name="nom" v-model="Entreprise.Nom"/>

      <label for="email"><b>Email</b></label>
      <input type="email" placeholder="Entrer Email" name="email" required v-model="Entreprise.Email"/>


      <label for="domaine"><b>Domaine</b></label>
      <input type="text" placeholder="Entrer domaine" name="domaine" v-model="Entreprise.Domaine"/>
      
      <label for="Telephone"><b>Téléphone</b></label>
      <input type="tel" placeholder="Entrer Telephone" name="Tel" v-model="Entreprise.Tel"/>

      <label for="Adresse"><b>Adresse</b></label>
      <input type="text" placeholder="Entrer Adresse" name="Adresse" v-model="Entreprise.Adresse"/>

     

      <div class="btns">
        <button type="button" class="Annuler"  @click="closeModal">
          Annuler
        </button>
        <button @click.prevent="submit" class="Ajouter">{{btnTitle}}</button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  props: {
    btnTitle:String, titlee:String, data: Object,
  },
  mounted() {
    this.Entreprise = this.data ? this.data : { ...this.data };
  },
  data() {
    return { Entreprise: Object };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  async  submit() {
      // The data that you need to send to the server
      var stuffToSend = this.Entreprise;

      // Check if the original data was null, if it was the user wants to create a new Etudiant,
      // If it wasn't the user wants to modify an existing user
      if (this.data == null) {
        // Code to add Entreprise
        var token = localStorage.getItem("token");
        await axios.post("http://localhost:5000/AjouterEntreprise", stuffToSend, {
          headers: {
            Authorization: token,
          },
      });

      } else {
        // Code to modify Entreprise
        console.log(" +++++++++++++",this.data)
        let idEntreprise = this.data.IdEntreprise;
      await   axios.post(
          `http://localhost:5000/modifieEntreprise/${idEntreprise}`,
          stuffToSend,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        ).then((response)=>{
console.log(response.data);
        })
        .catch((error)=>{
alert(error.response.data.message);
        })
      }
 // Close the popup
      this.closeModal();
    },
  },
};
</script>


<style scoped>
.modal {
  width: 500px;
  padding: 40px;
  margin: 100px auto;
  background: #ececec;
  border-radius: 10px;
}

.backdrop {
  overflow: scroll;
  scrollbar-color: #b1b2b2 #fefefe;
  scrollbar-width: thin;
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
b {
  text-align: left;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

.modal h1 {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  font-size: 30px;
  padding-bottom: 18px;
}

input {
  border-radius: 8px;
  border: 1px solid black;

  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 10px;
  margin-left: 10px;

  padding-top: 18px;
  padding-right: 53px;
  padding-bottom: 18px;
  padding-left: 53px;
}

label {
  display: inline-block;
  width: 100px;
  text-align: left;
}

.Annuler {
  background-color: #ff7222;
  border-radius: 16px;
  border: 1px solid white;
  color: white;
  padding: 9.6px 36px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 20px;
  margin-right: 20px;
}

.Ajouter {
  background-color: #51a6dd;
  border-radius: 16px;
  border: 1px solid white;
  color: white;
  padding: 9.6px 36px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.Ajouter:hover{
  
 cursor: pointer;
 transform-origin: center;
 transform: scaleY(1.1) scaleX(1.1);
  color: #51a6dd;
  background-color: white;
   border: 1px solid #51a6dd;
}

.Annuler:hover{
  
 cursor: pointer;
 transform-origin: center;
 transform: scaleY(1.1) scaleX(1.1);
  color: #ff7222;
  background-color: white;
   border: 1px solid #ff7222;
}
.btns {
  text-align: right;
}
</style>