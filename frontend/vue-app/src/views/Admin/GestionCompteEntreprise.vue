<template>
  <TopBar />

   <div v-if="ShowModal">
    <!-- Pass the data in a property (data is the name we gave the property in the component "AddEnseignant") 
    and TeacherToOpen is the name we gave it in this page -->
    <AddEntreprise :data="EntrepriseToOpen" @close="closeModal" :titlee="titlee" :btnTitle="btnTitle" />
  </div>
  <div class="page-container">
    <div class="Entreprise-page">
      <h1>Gestion des compte d'entreprise</h1>
      <div class="ajouterE">
        <button  @click="openModal" class="AjouterE">+ Ajouter Entreprise</button>
      </div>
      <table ref="table">
        <tr>
          <th>Nom de l'entreprise</th>
          
          <th>Email</th>
          <th>Telephone</th>
          <th>Adresse</th>
          <th>Supprimer</th>
          <th>Modifier</th>
        </tr>
        <tr v-for="Entreprise in Entreprises" :key="Entreprise.IdEntreprise">
          <td>
            <h4>{{ Entreprise.Nom }}</h4>
            <span>{{ Entreprise.Domaine }}</span>
          </td>
          <td>{{ Entreprise.Email }}</td>
          <td>{{ Entreprise.Tel}}</td>
          <td>{{ Entreprise.Adresse}}</td>
          <td>
            <button class="delete"       @click="Msgdelete(); deleteEntreprise(Entreprise)">
              <img
                src="../../assets/trash-svgrepo-com.svg"
                alt="delete"
                style="width: 35px; height: 15px"
              />
              <span></span>
            </button>
          </td>
          <td>
            <button class="modify" @click="modifierEntreprise(Entreprise)">
              <img
                src="../../assets/pen-svgrepo-com.svg"
                alt="modify"
                style="width: 35px; height: 25px"
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
import AdminTopBar from "./AdminTopBar.vue";
import AddEntreprise from "./AddEntreprise.vue";
import axios from "axios";

// Export this component so we can use it from other files
export default defineComponent({
  // The name of this component
  name: "GestionCompteEntreprise",
  components: {AddEntreprise, TopBar: AdminTopBar },

  // The data that this components will manipulate
  data() {
    return {
      EntrepriseToOpen: null,
      ShowModal: false,
      Entreprises: [],
     };
     },
 async mounted() {
await this.GetEntreprises();
  
    // Execute the code that will remove the last additional border in the table
 
     },
  // the different methods in this component
  methods: {
    async GetEntreprises(){
await axios.get("http://localhost:5000/GetEntreprises",{
  headers:{
    Authorization:localStorage.getItem('token')
  }
})
.then((response)=>{
  console.log(response.data);
this.Entreprises=response.data;
})
.catch((error)=>{
alert(error.response.data.message);
})




    },
    openModal() {
      this.ShowModal = true;
      this.titlee= "Ajouter Entreprise";
      this.btnTitle="Ajouter";
    },
      Msgdelete() {
       var msg="Une entreprise a été supprimé";
       console.log(msg)
       alert(msg);
   },
    // This function will close the popup to add/modify a teacher
    closeModal() {
      // Hide the popup
      this.ShowModal = false;
      // Delete any existing data from previous operations
      this.EntrepriseToOpen = null;
      this.GetEntreprises()
      
    },
    // This function will open the popup to modify a teacher and load the existing data in the popup
    modifierEntreprise(Entreprise) {
      // Get the data to show in the popup
      this.EntrepriseToOpen = Entreprise;

      // Show the popup
      this.ShowModal = true;

      this.titlee= "Modifier Entreprise";
       this.btnTitle="Modifier";
      //  this.changeStyle();
    },
    // This function will make the admin choose a file from his pc,
    // and add teachers to the database from that file
    importer() {},
    async deleteEntreprise(Entreprise){
      if(Entreprise.IdEntreprise!==null)
      await axios.delete(`http://localhost:5000/deleteEntreprise/${Entreprise.IdEntreprise}`  ,{
  headers:{
    Authorization:localStorage.getItem('token')
  }
})
.then((response)=>{
   console.log(response.data);
     const idx = this.Entreprises.indexOf(Entreprise);
              this.Entreprises.splice(idx, 1);
       
})
.catch((error)=>{
alert(error.response.data.message);
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
.Entreprise-page {
  margin-left: auto;
  margin-right: auto;
  max-width: 1152px;
  padding: 36px;
}
.Entreprise-page h1 {
  opacity: 100%;
  font-weight: 500;
  font-size: 48px;
  margin-bottom: 72px;
  margin-top: 24px;
}
.Entreprise-page table {
  border: 1px solid #b1b2b2;
  border-radius: 16px;
  width: 100%;
  border-spacing: 0px;
}
.Entreprise-page table tr:first-child th:first-child {
  border-top-left-radius: 9.6px;
}
.Entreprise-page table tr:first-child th:last-child {
  border-top-right-radius: 9.6px;
}
.Entreprise-page table td,
.Entreprise-page table th {
  padding: 9.6px 16px;
}
.Entreprise-page table th {
  background-color: #b1b2b2;
  color: #fefefe;
  padding: 16px;
}
.Entreprise-page table tr * {
  text-align: left;
}
.Entreprise-page table tr td {
  border-bottom: 1px solid #b1b2b2;
  max-width: 450px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
}
.Entreprise-page table tr td h4 {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20.8px;
  font-weight: 500;
}
.Entreprise-page table tr td button {
  transition: ease-in 200ms;
  padding: 0px;
  background-color: transparent;
  border: none;
  font-size: 16px;
}
.Entreprise-page table tr td button:focus,
.Entreprise-page table tr td button:hover {
  color: #51a6dd;
  cursor: pointer;
}
.Entreprise-page table tr td:nth-child(1) span {
  opacity: 50%;
}
.Entreprise-page table tr :nth-child(2) {
  max-width: 216px;
}
.Entreprise-page table tr :nth-child(3) {
  padding-left: 72px;
  padding-right: 0px;
}
/*.Entreprise-page table tr :nth-child(3) span {
  font-weight: 800;
  margin: 9.6px;
  color: green;
}
.Entreprise-page table tr :nth-child(4) {
  padding-left: 0px;
}
.Entreprise-page table tr :nth-child(4) span {
  font-weight: 800;
  margin: 9.6px;
  color: red;
}*/
.Entreprise-page table tr :nth-child(5) button {
  padding: 0px 9.6px;
  font-family: sans-serif;
  transform: scale(1, 2);
}

.ajouterE {
  text-align: right;
}
button.AjouterE {
 
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
