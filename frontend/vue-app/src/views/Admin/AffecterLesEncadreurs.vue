<template>
  <TopBar />

  <div class="page">
    <h1>page affecter les encadreurs</h1>
    <div class="equipes">
      <h2>Les équipes qui existent</h2>
      <div>
        <div
          v-for="data in Data"
          :key="data.IdEquipe"
          v-bind:class="{ selected: data.isSelected }"
          @click="selectTeam(data.IdEquipe)"
        >
          <span>{{ data.nomChefEquipe }}</span>
          <span>{{ data.titreDuTheme }}</span>
          <i @click.stop="openTeam(data.IdEquipe)"></i>
          <p
            v-for="membre in data.membresEquipe"
            :key="membre.IdEtudiant"
            v-bind:class="{ hide: !data.isOpened }"
          >
            {{ membre.NomMembre}}
          </p>
        </div>
      </div>
    </div>

    <div class="encadreurs">
      <h2>Les encadreurs possibles de l'équipe sélectionné</h2>
      <div>
        <div v-for="teacher in SelectedTeachers" :key="teacher.IdEnseignant">
          <span>{{ teacher.Nom + " " + teacher.Prenom }}</span
          ><span>{{ teacher.Email }}</span
          ><button @click="selectTeacher(teacher.IdEnseignant)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { defineComponent } from "vue";
import axios from "axios";
import AdminTopBar from "./AdminTopBar.vue";

export default defineComponent({
  name: "ValidateThemes",
  // The different components that are used in this component
  components: { TopBar: AdminTopBar },
  // The data that this components will manipulate
  data() {
    return {
      // The list of all teachers
      equipes:[],
      membre : Object,
      encadrants:[],
      Teachers: [],

      // The list of the teachers we gonna show to the user (the ones that can be encadreur for the selected team)
      SelectedTeachers: [],

      // The meat and potato of data, the things that we need to show in the list of teams
      Data: [],

      // The id of the selected team
      IdSelectedTeam: 0,

      // This boolean shows if there is currently a team selected
      IsTeamSelected: false,
    };
  },
  // When the page loads
  async created() {
    await this.GetTeamsAndTeachers();
  },
  // the different methods in this component
  methods: {
    async GetTeamsAndTeachers() {
      // TODO: backend people, you need to do some magic and find the data that is required for this page,
      // you need to get the list of all teams, and for each team you need to get the name of the team leader,
      // and the title of the theme that they have, and you need to get for each team the list of teachers
      // that can be encadreur for them (according to the theme they have),
      // mix all of that together and put it in the data variable

      // So here is how the result will look like
      // data is a list of the bellow objects
   
  try {
        const response = await axios.get("http://localhost:5000/EquipePourEncadrant");
        this.equipes = response.data;
        // console.log(this.equipes[0].IdEtudiant.split(",")[1]);
      } catch (err) {
        console.log(err);
      }
      for (var equipe of this.equipes ){
        if(equipe.IdEncadrant == null) {
         var data =  { 
        IdEquipe : 0,
        nomChefEquipe: "",
        titreDuTheme:"",
        membresEquipe:[],
        encadreurs:[],
        isSelected: false,
        IsOpen: false,
        };
        data.IdEquipe= equipe.IdEquipe;
        data.titreDuTheme = equipe.TitreComplet;
        data.nomChefEquipe = equipe.Nom + " "+equipe.Prenom;
        
      for (var idetudiant of equipe.IdEtudiant.split(",")) {
       try {
       const resp = await axios.get(`http://localhost:5000/MembresEquipe/${idetudiant}`);
        this.membre = resp.data;
  
      } catch (err) {
        console.log(err);
      }
        var membreEquipe = {
        IdEtudiant : 0,
        NomMembre : "",
      };
    membreEquipe.IdEtudiant = idetudiant;
    membreEquipe.NomMembre = this.membre[0].Nom  + " "  + this.membre[0].Prenom;
    
      
      data.membresEquipe.push(membreEquipe);
      
        }
         try {
       const res = await axios.get(`http://localhost:5000/Encadreurs`);
        this.encadrants = res.data;
  
      } catch (err) {
        console.log(err);
      }
      for (var encadrant of this.encadrants ){
         var encadreur = {
        id : 0,
      };
      encadreur.id = encadrant.IdEnseignant;
       
      data.encadreurs.push(encadreur);
      }
        this.Data.push(data);
        }
        
        }
       try {
       const re = await axios.get(`http://localhost:5000/Encadreurs`);
        this.Teachers = re.data;
  
      } catch (err) {
        console.log(err);
      }
    },

    // This function will set the list of teachers to show to the user
    setTeachersToShow(teachersToShow) {
      // Clear the already existing list
      this.SelectedTeachers = [];

      // For each teacher in the list of teachers to show
      teachersToShow.forEach((element) => {
        // Get the teacher by his id
        var result = this.Teachers.find((e) => e.IdEnseignant === element.id);
        // Add the teacher to the list of teachers to show
        this.SelectedTeachers.push(result);
      });
    },

    // This function defines which team is selected if any
    selectTeam(id) {
      // Get the element that we clicked on
      var element = this.Data.find((e) => e.IdEquipe === id);

      // Toggle the selected flag
      element.isSelected = !element.isSelected;

      // When a team gets selected
      if (element.isSelected) {
        // If there is already another team selected
        if (this.IsTeamSelected) {
          // Get the old selected team
          var oldTeam = this.Data.find(
            (e) => e.IdEquipe === this.IdSelectedTeam
          );

          // Set that team to not be selected anymore
          oldTeam.isSelected = false;
        }

        // Set the team selected flag to true
        this.IsTeamSelected = true;

        // Set the id of the selected team
        this.IdSelectedTeam = element.IdEquipe;

        // Set the list of teachers to show to the user
        this.setTeachersToShow(element.encadreurs);
      }
      // Otherwise...
      else {
        // No team will be selected
        this.IsTeamSelected = false;

        // Set the list of teachers to show to be empty
        this.SelectedTeachers = [];
      }
    },

    // This function opens the team element and shows all the members
    openTeam(id) {
      // Get the element that we want to open
      var element = this.Data.find((e) => e.IdEquipe === id);
      console.log(element)

      // Toggle the opened flag
      element.isOpened = !element.isOpened;
    },

    // This function will send to the server the selected team with it's teacher
    async selectTeacher(idTeacher) {
      if (this.IsTeamSelected) {
           try {
       await axios.post(`http://localhost:5000/AjouterEncadrant/${idTeacher}/${this.IdSelectedTeam}`);
        
      } catch (err) {
        console.log(err);
      }
  

        // Remove the selected team from the list of teams
        this.Data = this.Data.filter(
          (value) => value.IdEquipe != this.IdSelectedTeam
        );

        // Set team selected to false
        this.IsTeamSelected = false;

        // Clear the list of teachers to show
        this.SelectedTeachers = [];
      }
      // Else no team has been selected
      else {
        // Don't do anything
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
.page {
  margin-left: auto;
  margin-right: auto;
  max-width: 1152px;
  padding: 72px;
  display: grid;
  grid-template-areas:
    "title title"
    "teams teachers";
  column-gap: 72px;
  grid-template-columns: 1fr 1fr;
}
.page h1 {
  grid-area: title;
  font-weight: 600;
  font-size: 48px;
  margin-bottom: 36px;
}
.page > .equipes {
  grid-area: teams;
}
.page > .equipes > h2 {
  color: #ff7f22;
  font-weight: 600;
  font-size: 20.8px;
  margin-bottom: 36px;
  margin-top: 24px;
  margin-left: 9.6px;
}
.page > .equipes > div {
  scrollbar-color: #b1b2b2 #fefefe;
  scrollbar-width: thin;
  padding-bottom: 24px;
  overflow-y: auto;
  max-height: 360px;
}
.page > .equipes > div ::-webkit-scrollbar {
  width: 16px;
}
.page > .equipes > div ::-webkit-scrollbar-track {
  border-radius: 16px;
  background-color: #fefefe;
}
.page > .equipes > div ::-webkit-scrollbar-thumb {
  border-radius: 16px;
  background-color: #e6eefa;
}
.page > .equipes > div ::-webkit-scrollbar-thumb:hover {
  background-color: #b1b2b2;
}
.page > .equipes > div > div {
  position: relative;
  border: 1px solid #e6eefa;
  box-shadow: 0px 0px 9.6px #b1b2b2;
  border-radius: 24px;
  padding: 24px;
  margin-top: 24px;
  margin-right: 24px;
  margin-left: 9.6px;
  line-height: 1.3;
  font-weight: 500;
}
.page > .equipes > div > div > i {
  position: absolute;
  right: 24px;
  border: solid #ff7f22;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 4px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.page > .equipes > div > div > i:hover {
  cursor: pointer;
}
.page > .equipes > div > div > span {
  margin-right: 24px;
}
.page > .equipes > div > div > p:nth-child(4) {
  margin-top: 9.6px;
}
.page > .equipes > div > div > p {
  color: rgba(3, 12, 23, 0.6);
  font-weight: 500;
  font-size: 16px;
  margin-left: 24px;
}
.page > .encadreurs {
  grid-area: teachers;
}
.page > .encadreurs > h2 {
  color: #51a6dd;
  font-weight: 600;
  font-size: 20.8px;
  margin-bottom: 24px;
  margin-top: 24px;
  margin-left: 24px;
}
.page > .encadreurs > div {
  scrollbar-color: #b1b2b2 #fefefe;
  scrollbar-width: thin;
  padding-bottom: 24px;
  overflow-y: auto;
  max-height: 360px;
}
::-webkit-scrollbar {
  width: 16px;
}
::-webkit-scrollbar-track {
  border-radius: 16px;
  background-color: #fefefe;
}
::-webkit-scrollbar-thumb {
  border-radius: 16px;
  background-color: #e6eefa;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #b1b2b2;
}
.page > .encadreurs > div > div {
  font-size: 0px;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  padding: 24px 16px;
  margin: 24px;
  border-radius: 16px;
  border: 1px solid #e6eefa;
  box-shadow: 0px 0px 9.6px #e6eefa;
}
.page > .encadreurs > div > div > span {
  font-size: 16px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.page > .encadreurs > div > div > button {
  background-color: transparent;
  border: none;
  font-weight: 700;
  color: #51a6dd;
}
.page > .encadreurs > div > div > button:hover {
  cursor: pointer;
  transform: scale(2);
}
.page > .encadreurs > div > div > span:nth-child(1) {
  width: 144px;
}
.page > .encadreurs > div > div > span:nth-child(2) {
  width: 216px;
}

.hide {
  visibility: collapse;
  height: 0px;
  margin: 0px !important;
}

.selected {
  border: 1px solid #ff7f22 !important;
  box-shadow: 0px 0px 16px #ff7f22 !important;
}
</style>
