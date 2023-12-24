<template>
  <div class="backdrop">
    <div class="modal">
      <h1>{{ titlee }}</h1>

      <label for="nom"><b>Nom</b></label>
      <input
        type="text"
        placeholder="Entrer nom"
        name="nom"
        v-model="Etudiant.Nom"
      />

      <label for="prénom"><b>Prénom</b></label>
      <input
        type="text"
        placeholder="Entrer prénom"
        name="prénom"
        v-model="Etudiant.Prénom"
      />

      <label for="email"><b>Email</b></label>
      <input
        type="text"
        placeholder="Entrer Email"
        name="email"
        required
        v-model="Etudiant.Email"
      />

      <!--<label for="filiére"><b>Filiére</b></label>
      <input
        type="text"
        placeholder="Entrer filiére"
        name="filiére"
        v-model="Etudiant.Filière"
      />

      <label for="niveau"><b>Niveau </b></label>
      <input
        type="text"
        placeholder="Entrer niveau"
        name="niveau"
        v-model="Etudiant.Niveau"
      />-->

      <label for="Filière"><b>Filière</b></label>
        <select v-model="Etudiant.Filière" name="Filière" id="Filière">
          <option value="SIW">SIW</option>
          <option value="ISI">ISI</option>
          <option value="TC">Tronc commun</option>
        </select><br/>
      
        <label for="niveau"><h2>Niveau</h2></label>
        <select v-model="Etudiant.Niveau" name="niveau" id="Niveau">
          <option value="1CPI">1CPI</option>
          <option value="2CPI">2CPI</option>
          <option value="1CS">1CS</option>
          <option value="2CS">2CS</option>
          <option value="3CS">3CS</option>
        </select>

       <!-- <label for="Filière"><b>Filière</b></label>
        <select v-model="Filiere" name="Filière" id="Filière"> 
          <option value="SIW">SIW</option> 
          <option value="ISI">ISI</option> 
          <option value="TC">tronc commun</option> 
        </select> 
       
        <label for="niveau"><b>Niveau</b></label> 
        <select v-model="Niveau" name="niveau" id="Niveau"> 
          <option value="1CPI">1CPI</option> 
          <option value="2CPI">2CPI</option> 
          <option value="1CS">1CS</option> 
          <option value="2CS">2CS</option> 
          <option value="3CS">3CS</option> 
        </select> -->
      
      <div class="btns">
        <button type="button" class="Annuler" @click="closeModal">
          Annuler
        </button>
        <button @click.prevent="submit" class="Ajouter">{{ btnTitle }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    btnTitle: String,
    titlee: String,
    data: Object,
  },
  mounted() {
    this.Etudiant = this.data ? this.data : { ...this.data };
  },
  data() {
    return { Etudiant: Object };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },

    async submit() {
      // The data that you need to send to the server
      var stuffToSend = this.Etudiant;
      // Check if the original data was null, if it was the user wants to create a new Etudiant,
      // If it wasn't the user wants to modify an existing user
      if (this.data == null) {
        // Code to add Etudiant
        var token = localStorage.getItem("token");
        await axios.post("http://localhost:5000/AjouterEtudiant", stuffToSend, {
          headers: {
            Authorization: token,
          },
      });

      } else {
        // Code to modify Etudiant
        let idEtudiant = this.data.id;
        axios.post(
          `http://localhost:5000/modifieEtudiant/${idEtudiant}`,
          stuffToSend,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
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
h2{
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
select {
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
.Annuler{
  /* background-color: #ff7222; */
  border-radius: 16px;
}
</style>
