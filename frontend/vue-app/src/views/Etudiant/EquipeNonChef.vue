<template>
<TopBar/>
  
  <div class="ChoisirEquipe">
    <h1>Mon Equipe</h1><br>
    
    
     <div class ="titles">
     <div class="Title1">Membres de mon equipe</div>
      </div>
     <div class="Box1">
         
    <div class="MonEquipe" v-for="membre in membres" :key="membre.IdEtudiant">
     <p>{{membre.Nom}}</p>
       <p>{{membre.Prenom}}</p>
       <p>{{membre.Email}}</p>
    </div>
    </div>
   
  </div>
</template>
<script>
import { defineComponent } from "vue";
import EtudiantTopBar from "./EtudiantTopBar.vue";
import axios from "axios";
export default defineComponent({
  name: "EquipeNonChef",
  components:{
   TopBar:EtudiantTopBar},
 data(){
    return{
         user: Object,  
         membres: [],
         
    };
    
 },
 async created() {
     this.user = JSON.parse(localStorage.getItem('User'));
     await this.GetMembres();
    
  },
  methods: {

       async GetMembres() {
      try {
        const response = await axios.get(`http://localhost:5000/AfficherMembreEquipe/${this.user.IdEtudiant}`);
        this.membres= response.data;
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
   
     .ChoisirEquipe{
 padding:36px 0px 144px 0px;
 }
  .ChoisirEquipe h1{
   padding-left:58px;
  font-size: 270%;
}
.titles{
    
  border-radius: 10px;
  color: black;
  border:none;
  background-color: white;
  margin-left:470px;
 margin-bottom:80px;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
 
  
}
.Title1{
 
  color: black;
  border:none;
  float: left;
  font-size: 30px;
  font-weight: 500;
}
.Box1{
    width: 600px;
  height: 400px;
  border: none;
  
  margin-left:350px ;
  margin-bottom:50px ;
  
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
.MonEquipe{
    vertical-align:middle;
    overflow:hidden;
    text-overflow: ellipsis; 
       height: 40px;
     border-radius: 10px;
     width: 580px;
     border: 1px solid #51A6DD;
     background-color: #51A6DD;
      align-self: left;
     margin-bottom: 30px;
     margin-left: 10px;
     margin-right: 10px;
     margin-top: 10px;
     display: flex;
     flex-direction: row;
     justify-content: space-between;
}
.MonEquipe p{
overflow: hidden;
    overflow: ellipsis;
    width: 100px;
  white-space: nowrap;
transform: translateY(20%);
  font-size:100% ;
  color: white;
  margin-left: 5px;
  margin-right: 10px;
}
</style>