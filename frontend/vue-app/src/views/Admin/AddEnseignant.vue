<template>
  <div class="backdrop">
    <div class="modal">
      <h1>{{titlee}}</h1>
      <label for="nom"><b>Nom</b></label>
      <input
        type="text"
        placeholder="Entrer nom"
        name="nom"
        v-model="Teacher.Nom"
      />

      <label for="prénom"><b>Prénom</b></label>
      <input
        type="text"
        placeholder="Entrer prénom"
        name="prénom"
        v-model="Teacher.Prenom"
      />

      <label for="email"><b>Email</b></label>
      <input
        type="text"
        placeholder="Entrer Email"
        name="email"
        required
        v-model="Teacher.Email"
      />

      <label for="spécialité"><b>Spécialité</b></label>
      <input
        type="text"
        placeholder="Entrer spécialité"
        name="spécialité"
        v-model="Teacher.Specialite"
      />

      <!--<label for="grade"><b>Grade</b></label>
      <input
        type="text"
        placeholder="Entrer Grade"
        name="grade"
        v-model="Teacher.Grade"
      />-->
      <label for="grade"><h2>Grade</h2></label>
        <select v-model="grade" name="grade" id="grade"> 
          <option value="MAA">MAA</option> 
          <option value="MAB">MAB</option> 
          <option value="MCA">MCA</option> 
          <option value="MCB">MCB</option> 
          <option value="PR">PR</option> 
        </select>
<div class="Jury">
    <div class="true">
      <input type="checkbox" id="True" name="True" v-model="CanBeJury"
             checked>
    </div>
    <b>Jury</b>
</div>

<div class="Encadrant">
    <div class="true1">
      <input type="checkbox" id="True" name="True" v-model="CanBeEncadrant" 
             checked>
    </div>
    <b>Encadrant</b>
</div>


      <div class="btns">
        <button type="button" class="Annuler" @click="closeModal">
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
    this.Teacher = this.data ? this.data : { ...this.data };
   },
   data() {
    return { Teacher: Object ,
    CanBeJury:true,
    CanBeEncadrant:true,
    
    };

   },
  methods: {
    closeModal() {
      this.$emit("close");
    },
   async submit() {
      // The data that you need to send to the server
      var stuffToSend = this.Teacher;
      // Check if the original data was null, if it was the user wants to create a new Etudiant,
      // If it wasn't the user wants to modify an existing user
      if (this.data == null) {
        // Code to add Etudiant
        var token=localStorage.getItem("token");
        try {
           await  axios.post('http://localhost:5000/AjouterEnseignant', stuffToSend ,{
 headers: {
    Authorization: token
  }})
         alert("Un enseignant a été ajouté");
        } catch (error) {    
          console.log(">>>>>>>",JSON.stringify(error.response.data.message))
          // alert(error.response.data.message);
        }
     
    
      } else {
        // Code to modify Etudiant
         let idEnseignant=this.data.IdEnseignant;
       axios.post(`http://localhost:5000/modifieEnseignant/${idEnseignant}`,stuffToSend,{
        headers:{
            Authorization: localStorage.getItem('token')
        }
      });
         alert("Un enseignant a été modifié");
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
  overflow-y: scroll;
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
   display: inline-block;
  text-align: left;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 10px;
}
h2{
   display: inline-block;
  text-align: left;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 10px;
}

select{ 
  border-radius: 8px;
  border: 1px solid black;
  text-align: left;
  margin-top: 6px;
  margin-bottom: 20px;
  margin-right: 10px;
  margin-left: 10px;
  padding-top: 18px;
  padding-right: 53px;
  padding-bottom: 18px;
  width:62%;
  padding-left: 53px;
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
select{ 
  border-radius: 8px;
  border: 1px solid black;
  text-align: left;
  margin-top: 6px;
  margin-bottom: 20px;
  margin-right: 10px;
  margin-left: 10px;
  padding-top: 18px;
  padding-right: 53px;
  padding-bottom: 18px;
  padding-left: 53px;
      
  }
.true {
  margin-left: 0px;
    display: inline-block;
    width:60px;
    height:10px;
    
 }
.true1 {
  margin-left: 0px;
    display: inline-block;
    width:60px;
    height:10px;
    
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