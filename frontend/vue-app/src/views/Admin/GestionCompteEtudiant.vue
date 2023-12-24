<template>
  <TopBar @filter="filter()"/>
  <div v-if="ShowModal">
    <!-- Pass the data in a property (data is the name we gave the property in the component "AddEnseignant") 
    and TeacherToOpen is the name we gave it in this page -->
    <AddEtudiant
      :data="StudentToOpen"
      @close="closeModal"
      :titlee="titlee"
      :btnTitle="btnTitle"
    />
  </div>
  <div class="page-container">
    <div class="Etudiant-page">
      <h1>Gestion des compte des Etudiants</h1>
      <div class="ajouterE">
        <!-- When this button gets clicked we run the function openModal -->
        <button @click="openModal" class="AjouterE">+ Ajouter</button>

        <!-- When this button gets clicked we run the function importer -->
        <input
          type="file"
          ref="files"
          style="display: none"
          @change="importer"
        />
        <button
          class="importer"
          @click="
            $refs.files.click();
            MsgImport();
          "
        >
          + Importer
        </button>
      </div>
      <table ref="table">
        <tr>
          <th>Id</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Niveau</th>
          <th>Filiére</th>
          <th>Supprimer</th>
          <th>Modifier</th>
        </tr>
        <tr v-for="Etudiant in FilteredEtudiants" :key="Etudiant.id">
          <td>
            {{ Etudiant.id }}
          </td>
          <td>{{ Etudiant.Nom }}</td>
          <td>{{ Etudiant.Prénom }}</td>
          <td>{{ Etudiant.Email }}</td>
          <td>{{ Etudiant.Niveau }}</td>
          <td>{{ Etudiant.Filière }}</td>
          <td>
            <button
              class="delete"
              @click="
                deleteEtudiant(Etudiant);
                Msgdelete();
              "
            >
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
            <button class="modify" @click="modifierEtudiant(Etudiant)">
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
import AddEtudiant from "./AddEtudiant.vue";
import AdminTopBar from "./AdminTopBar.vue";
import axios from "axios";
// Export this component so we can use it from other files
export default defineComponent({
  // The name of this component
  name: "GestionCompteEtudiant",

  // The different components that are used in this component
  components: { AddEtudiant, TopBar: AdminTopBar },

  // The data that this components will manipulate
  data() {
    return {
      StudentToOpen: null,
      ShowModal: false,
      Etudiants: [],
      FilteredEtudiants:[],
      file: "",
      inter: null,
    };
  },
  // When the page loads
  async mounted() {
    // Then change the styles to remove the border
    await this.getEtudiants();
  },

  // the different methods in this component
  methods: {

    filter(){
      // Niveau to check against
      var niveau = "";
      // Get annee
      var annee = localStorage.getItem('filterValue');

      // Switch annee to get niveau
      switch (annee.toString()) {
        // Case annee = 1
        case "1":
          // Set niveau to 1cpi
          niveau = "1CPI";
          // Return
          break;

        // Case annee = 2
        case "2":
          // Set niveau to 2cpi
          niveau = "2CPI";
          // Return
          break;

        // Case annee = 3
        case "3":
          // Set niveau to 1cs
          niveau = "1CS";
          // Return
          break;

        // Case annee = 4
        case "4":
          // Set niveau to 2cs
          niveau = "2CS";
          // Return
          break;

        // Case annee = 5
        case "5":
          // Set niveau to 3cs
          niveau = "3CS";
          // Return
          break;
        // If other
        default:
          // Return none
          niveau = "none";
          // Return
          break;
      }

        // If we have no specific niveau
          if ((niveau === "none")) {
            // Add all students
            this.FilteredEtudiants=[...this.Etudiants]; 
           
           // Return
            return;
          }
          // Otherwise...
          // Filter students by level
          var studs =this.Etudiants;
          var filtered =studs.filter(etudiant=> etudiant.Niveau === niveau);
          this.FilteredEtudiants = filtered;
     

      
    },
    // This function will get called when we want to add a teacher
    openModal() {
      this.ShowModal = true;
      this.titlee = "Ajouter Etudiant";
      this.btnTitle = "Ajouter";
    },
    // This function will close the popup to add/modify a teacher
    closeModal() {
      // Hide the popup

      this.ShowModal = false;

      // Delete any existing data from previous operations
      this.StudentToOpen = null;
      this.getEtudiants();
    },
    Msgdelete() {
      var msg = "Un Etudiant a été supprimé";
      console.log(msg);
      // alert(msg);
    },
    MsgImport() {
      var msg = "Vous avez importé une liste d'étudiant";
      console.log(msg);
      //  alert(msg);
    },
    async getEtudiants() {
    
      await axios
        .get("http://localhost:5000/getEtudiant", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
            this.Etudiants = response.data;
            this.FilteredEtudiants=[...this.Etudiants]; 
        });
    },
    // This function will open the popup to modify a teacher and load the existing data in the popup
    modifierEtudiant(Etudiant) {
      // Get the data to show in the popup
      this.StudentToOpen = Etudiant;
      // Show the popup
      this.ShowModal = true;
      this.titlee = "Modifier Etudiant";
      this.btnTitle = "Modifier";
    },
    async deleteEtudiant(Etudiant) {
      try {
        if(Etudiant.id!==null)
        await axios
          .delete(`http://localhost:5000/deleteEtudiant/${Etudiant.id}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((response) => {
            if (response) {
              const idx = this.Etudiants.indexOf(Etudiant);
              this.Etudiants.splice(idx, 1);
            this.FilteredEtudiants=[...this.Etudiants]; 
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    // This function will make the admin choose a file from his pc,
    // and add teachers to the database from that file
    async importer() {
      const imported = "Etudiant";
      this.file = this.$refs.files.files[0];
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("imported", imported);
      await axios({
        url: "http://localhost:5000/uploadFile",
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          Authorization: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.inter = setInterval(() => {
          this.getEtudiants();
          clearInterval(this.inter);
        }, response.data * 105);
      });
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
.Etudiant-page {
  margin-left: auto;
  margin-right: auto;
  max-width: 1152px;
  padding: 36px;
}
.Etudiant-page h1 {
  opacity: 100%;
  font-weight: 500;
  font-size: 48px;
  margin-bottom: 72px;
  margin-top: 24px;
}
.Etudiant-page table {
  border: 1px solid #b1b2b2;
  border-radius: 16px;
  width: 100%;
  border-spacing: 0px;
}
.Etudiant-page table tr:first-child th:first-child {
  border-top-left-radius: 9.6px;
}
.Etudiant-page table tr:first-child th:last-child {
  border-top-right-radius: 9.6px;
}
.Etudiant-page table td,
.Etudiant-page table th {
  padding: 9.6px 16px;
}
.Etudiant-page table th {
  background-color: #b1b2b2;
  color: #fefefe;
  padding: 16px;
}
.Etudiant-page table tr * {
  text-align: left;
}
.Etudiant-page table tr td {
  border-bottom: 1px solid #b1b2b2;
  max-width: 504px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
}
.Etudiant-page table tr td h4 {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20.8px;
  font-weight: 500;
}
.Etudiant-page table tr td button {
  transition: ease-in 200ms;
  padding: 0px;
  background-color: transparent;
  border: none;
  font-size: 16px;
}
.Etudiant-page table tr td button:focus,
.Etudiant-page table tr td button:hover {
  color: #51a6dd;
  cursor: pointer;
}
.Etudiant-page table tr td:nth-child(1) span {
  opacity: 50%;
}
.Etudiant-page table tr :nth-child(2) {
  max-width: 216px;
}
.Etudiant-page table tr :nth-child(3) {
  padding-left: 72px;
  padding-right: 0px;
}
.Etudiant-page table tr :nth-child(3) span {
  font-weight: 800;
  margin: 9.6px;
  color: green;
}
.Etudiant-page table tr :nth-child(4) {
  padding-left: 0px;
}
.Etudiant-page table tr :nth-child(4) span {
  font-weight: 800;
  margin: 9.6px;
  color: red;
}
.Etudiant-page table tr :nth-child(5) button {
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

button.importer {
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
