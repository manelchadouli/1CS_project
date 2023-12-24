<template>
  <TopBar />
  <div v-if="ShowModal">
    <!-- Pass the data in a property (data is the name we gave the property in the component "AddEnseignant") 
    and TeacherToOpen is the name we gave it in this page -->
    <AddEnseignant :data="TeacherToOpen" @close="closeModal" :titlee="titlee" :btnTitle="btnTitle" />
  </div>
  <div class="page-container">
    <div class="Enseignant-page">
      <h1>Gestion des compte des Enseignants</h1>
      <div class="ajouterE">
        <!-- When this button gets clicked we run the function openModal -->
        <button @click="openModal" class="AjouterE">+ Ajouter</button>

        <!-- When this button gets clicked we run the function importer -->
         <input type="file"
         ref="files" 
        style="display: none" 
          @change="importer"
          />
        <button class="importer" @click="$refs.files.click()">+ Importer</button>
      </div>
      <table ref="table">
        <tr>
          <th>Id</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Spécialité</th>
          <th>Grade</th>
          <th>Supprimer</th>
          <th>Modifier </th>
        </tr>
        <tr v-for="enseignant in enseignants" :key="enseignant.IdEnseignant" v-if="enseignants.length">
          <td>
            {{ enseignant.IdEnseignant }}
          </td>
          <td>{{ enseignant.Nom }}</td>
          <td>{{ enseignant.Prenom }}</td>
          <td>{{ enseignant.Email }}</td>
          <td>{{ enseignant.Specialite }}</td>
          <td>{{ enseignant.Grade }}</td>
          <td>
            <button class="delete" @click="SupprimerEnseignant(enseignant)">
              <img
                src="../../assets/trash-svgrepo-com.svg"
                alt="delete"
                style="width: 20px; height: 20px"
              />
              <span></span>
            </button>
          </td>
          <td>
            <!-- When this button gets clicked we run the function modifierEnseignant,
            and we pass the teacher details to that function -->
            <button class="modify" @click="modifierEnseignant(enseignant)">
              <img
                src="../../assets/pen-svgrepo-com.svg"
                alt="modify"
                style="width: 28px; height: 15px"
              />
              <span></span>
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script>
import { defineComponent } from "vue";
import AddEnseignant from "./AddEnseignant.vue";
import axios from 'axios';
import AdminTopBar from "./AdminTopBar.vue";


// Export this component so we can use it from other files
export default defineComponent({
  // The name of this component
  name: "GestionCompteEnseignant",

  // The different components that are used in this component
  components: { AddEnseignant, TopBar: AdminTopBar },

  // The data that this components will manipulate
  data() {
    return {
      TeacherToOpen: null,
      ShowModal: false,
      enseignants: [] ,
       file:"",
      inter:null,
       imported:"Enseignant"
    };
  },
 async mounted() {
   
   await  this.GetEnseignant();
    
    // this.changeStyle();
  },

  

  methods: {
     // This function will get called when we want to add a teacher
    openModal() {
      this.ShowModal = true;
      this.titlee= "Ajouter Enseignant";
      this.btnTitle="Ajouter";
    },
      Msgdelete() {
       var msg="Un Enseignant a été supprimé";
       console.log(msg)
       alert(msg);
   },
    MsgImport() {
       var msg="Vous avez importé une liste d'enseignants";
       console.log(msg)
       alert(msg);
   },
    // This function will close the popup to add/modify a teacher
   closeModal() {
     // this.forceUpdate();
      // Hide the popup
      
      this.ShowModal = false;

      // Delete any existing data from previous operations
      this.StudentToOpen = null;
      this.GetEnseignant();
      
    
    },
      async GetEnseignant() {
      // Get the data from the server
      try {
        const response = await axios.get("http://localhost:5000/Enseignant",
        { headers:{
        Authorization: localStorage.getItem('token')
      }}
      );
        this.enseignants = await response.data;
      } catch (err) {
        console.log(err);
      }
      
    },
   async SupprimerEnseignant(enseignant){
   if(enseignant.IdEnseignant!=null)
         try {
        await axios.delete(`http://localhost:5000/SupprimerEnseignant/${enseignant.IdEnseignant}`,{headers:{
            Authorization: localStorage.getItem('token')}
        }).then((response)=>{
          if(response){
 const idx=this.enseignants.indexOf(enseignant)
      this.enseignants.splice(idx,1)

}
        })
       
      } catch (err) {
        console.log(err);
      }
  
    },
 
  // the different methods in this component


    // This function will open the popup to modify a teacher and load the existing data in the popup
    modifierEnseignant(teacher) {
      // Get the data to show in the popup
      this.TeacherToOpen = teacher;

      // Show the popup
      this.ShowModal = true;

      this.titlee= "Modifier Enseignant";
       this.btnTitle="Modifier";
    },
    // This function will make the admin choose a file from his pc,
    // and add teachers to the database from that file
     async importer() {
      this.file=this.$refs.files.files[0];
      const formData=new FormData();
      formData.append('file',this.file);
       formData.append('imported',this.imported);
    
     const len=this.enseignants.length;
  await  axios({
    url:'http://localhost:5000/uploadFile',
    method:'post',
    data:formData,
    headers:{
      'Content-Type':'multipart/form-data',
      'Access-Control-Allow-Origin':'*',
       Authorization: localStorage.getItem('token')
    }
  })
 .then((response)=>{ 
this.inter=setInterval(()=>{
       this.GetEnseignant();
        clearInterval(this.inter);
        },response.data*105)
        })
    },
    changeStyle() {
      // Get the table of themes
      var table = this.$refs["table"];

      // Get the children of the last row in the table
      var lastRowChildren = table.children.item(
        table.children.length - 1
      )?.children;

      // If those children aren't equal to null
      if (lastRowChildren) {
        // For each td cell
        for (let i = 0; i < lastRowChildren.length; i++) {
          // Remove the bottom border
          lastRowChildren[i].style.borderBottom = "none";
        }
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
a {
  transition: ease-in 200ms;
  color: #ff7f22;
  text-decoration: none;
}
a:hover,
a:focus {
  color: #51a6dd;
}
.Enseignant-page {
  margin-left: auto;
  margin-right: auto;
  max-width: 1152px;
  padding: 36px;
}
.Enseignant-page h1 {
  opacity: 100%;
  font-weight: 500;
  font-size: 48px;
  margin-bottom: 72px;
  margin-top: 24px;
}
.Enseignant-page table {
  border: 1px solid #b1b2b2;
  border-radius: 16px;
  width: 100%;
  border-spacing: 0px;
}
.Enseignant-page table tr:first-child th:first-child {
  border-top-left-radius: 9.6px;
}
.Enseignant-page table tr:first-child th:last-child {
  border-top-right-radius: 9.6px;
}
.Enseignant-page table td,
.Etudiant-page table th {
  padding: 9.6px 16px;
}
.Enseignant-page table th {
  background-color: #b1b2b2;
  color: #fefefe;
  padding: 16px;
}
.Enseignant-page table tr * {
  text-align: left;
}
.Enseignant-page table tr td {
  border-bottom: 1px solid #b1b2b2;
  max-width: 504px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
}
.Enseignant-page table tr td h4 {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20.8px;
  font-weight: 500;
}
.Enseignant-page table tr td button {
  transition: ease-in 200ms;
  padding: 0px;
  background-color: transparent;
  border: none;
  font-size: 16px;
}
.Enseignant-page table tr td button:focus,
.Enseignant-page table tr td button:hover {
  color: #51a6dd;
  cursor: pointer;
}
.Enseignant-page table tr td:nth-child(1) span {
  opacity: 50%;
}
.Enseignant-page table tr :nth-child(2) {
  max-width: 216px;
}
.Enseignant-page table tr :nth-child(3) {
  padding-left: 72px;
  padding-right: 0px;
}
.Enseignant-page table tr :nth-child(3) span {
  font-weight: 800;
  margin: 9.6px;
  color: green;
}
.Enseignant-page table tr :nth-child(4) {
  padding-left: 0px;
}
.Enseignant-page table tr :nth-child(4) span {
  font-weight: 800;
  margin: 9.6px;
  color: red;
}
.Enseignant-page table tr :nth-child(5) button {
  padding: 0px 9.6px;
  font-family: sans-serif;
  transform: scale(1, 2);
}

.ajouterE {
  text-align: right;
}
button.AjouterE {
  transition: ease-in 200ms;
  background-color: #fefefe;
  border: 2px solid #51a6dd;
  color: #51a6dd;
  padding: 9.6px 36px;
  margin: 16px 24px;
  border-radius: 16px;
  display: inline-block;
}
button.importer:hover {
 
cursor: pointer;
transform-origin: center;
transform: scaleY(1.1) scaleX(1.1);
color: #ff7f22;
border-color: #ff7f22;
}

button.importer {
  transition: ease-in 200ms;
  background-color: #fefefe;
  border: 2px solid #51a6dd;
  color: #51a6dd;
  padding: 9.6px 36px;
  margin: 16px 24px;
  border-radius: 16px;
  display: inline-block;
}
button.AjouterE:hover {

cursor: pointer;
transform-origin: center;
transform: scaleY(1.1) scaleX(1.1);
color: #ff7f22;
border-color: #ff7f22;

}

button.delete:hover {
  cursor: pointer;
transform-origin: center;
transform: scaleY(1.1) scaleX(1.1);

}

button.modify:hover {
  cursor: pointer;
transform-origin: center;
transform: scaleY(1.1) scaleX(1.1);
}
</style>
