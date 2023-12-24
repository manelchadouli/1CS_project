<template>
  <TopBar />
  <div class="consulterLivrables">
    <div class="header">
      <button @click="Autoriser">autoriser</button>
    </div>
    <div class="content">
      <div v-for="livrable in livrables" :key="livrable.IdLivrable">
        <span>{{ livrable.Titre }}</span>
        <span>{{ livrable.NomCreateur }}</span>
          <span>{{ livrable.DateAjout }}</span>
        <span>
          <i @click="livrable.IsOpen = !livrable.IsOpen"></i>
          <img
            src="../../assets/icons/down-arrow.svg"
            alt="download"
            @click="DownloadFile(livrable.IdLivrable)"
          />
        </span>
        <div v-bind:class="{ hidden: !livrable.IsOpen }">
          <p
            v-for="commentaire in livrable.Commentaires"
            :key="commentaire.IdComment"
          >
            {{ commentaire.Comment }}
          </p>
          <span
            ><input
              v-model="livrable.NouveauCommentaire"
              type="text"
              placeholder="Ajouter un nouveau commentaire" /><button>
              <img
                src="../../assets/icons/send-message.svg"
                alt="ajouter"
                @click="AjouterCommentaire(livrable)"
              /></button
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import EnseignantTopBar from "./EnseignantTopBar.vue";
import axios from "axios";

export default defineComponent({
  name: "ConsulterLivrables",
  components: {
    TopBar: EnseignantTopBar,
  },

  data() {
    return {
      livrables: [],
      teamId: 0,
    };
  },
  // On page load
  async created() {
    // Set the id of the team
    this.teamId = this.$route.params.id;
    
    // Get livrables
    await this.GetLivrables();
  },
  methods: {
    // Load data from the server
    async GetLivrables() {
      // The team to get livrables for
  var idEquipe=  this.teamId;
     
      //  get the data from the server
    
await axios.get(`http://localhost:5000/getLivrables/${idEquipe}`,
{
  headers:{
    Authorization: localStorage.getItem("token"),
  }
}
).then((response)=>{
  this.livrables=[];
response.data.forEach(elem => {
  var dataDate = new Date(elem.liv.Date);
    var date =(dataDate.getDate()) +" " + (dataDate.toLocaleString("default",{month:"long"})) + " à " +  dataDate.getHours() + "h "  ;
  if(elem)
      this.livrables.push({
          IdLivrable: elem.liv.IdLivrable,
          Titre: elem.liv.Titre,
          NomCreateur:elem.liv.Nom+"  "+elem.liv.Prenom,
          DateAjout:date ,
          Commentaires: elem.res,
          IsOpen: false,
        });
  
   
});
console.log(this.livrables)

})


  

    
    /*  for (var i = 0; i < 5; i++) {
        this.livrables.push({
          IdLivrable: i,
          Titre: "titre test " + i,
          NomCreateur: "createur hahh",
          Commentaires: [
            {
              IdCommentaire: 1,
              Text: "comment hamfidamfa mlakh fmlak fmlak fmalk fmal fmalk famlk famlk ",
            },
          ],

          NouveauCommentaire: "",
          IsOpen: false,
        });
      }*/
    },
    // Autoriser la soutenance de cette equipe
    Autoriser() {
      // Get id equipe
      var idEquipeAAutoriser = this.teamId;

      // TODO: add it in the server
      console.log("autorized");
    },

    // Downloads the file with the specific idLivrable
     async DownloadFile(idLivrable) {
     axios({
url:`http://localhost:5000/downloadLivrable/${idLivrable} `,
method:'GET',
  headers:{
    Authorization:localStorage.getItem('token'),
  },
responseType:'arraybuffer'
      }).then((response)=>{
      let   file= response.headers['content-disposition'].split(`filename='`)[1].slice(0,-1);
var fileUrl=window.URL.createObjectURL(new Blob([response.data],{type:'application/*'}));
var fileLink=document.createElement('a');
fileLink.href=fileUrl;
fileLink.download=file;
document.body.appendChild(fileLink);
fileLink.click();
fileLink.remove();
})
.catch(error=>{
   alert(error.response.statusText);
})
    },

    // Add comment with the specific idLivrable and comment
  async  AjouterCommentaire(livrable) {
      // Get the id of livrable
      var id = livrable.IdLivrable;
      // Get the comment to add
      var comment = livrable.NouveauCommentaire;
//Get the id of the enseignant from localStorage ...
var IdEnseignant= JSON.parse(localStorage.getItem('User')).IdEnseignant;
      // If the comment is empty
      if (comment == "")
        // Don't do anything
        return;
await axios.post(`http://localhost:5000/AjouterCommentaire/${id}`,{comment,IdEnseignant},{
  headers:{
    Authorization:localStorage.getItem('token')
  }
}).then((response)=>{
// Add the comment to the existing list
      livrable.Commentaires.push({
        IdCommentaire: response.data,
        Comment: comment,
      });

}).catch((error)=>{
alert(error.response.statusText)
})
      
      // Delete any text that  might be in the comment
      livrable.NouveauCommentaire = "";
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
.consulterLivrables {
  padding: 48px 144px 144px 144px;
}
.consulterLivrables > .header {
  text-align: right;
  padding: 16px 0px;
}
.consulterLivrables > .header > button {
  color: #51a6dd;
  border: 2px solid #51a6dd;
  background-color: #fefefe;
  padding: 16px 24px;
  margin: 16px;
  border-radius: 16px;
}
.consulterLivrables > .header > button:hover,
.consulterLivrables > .header > button:focus {
  box-shadow: 0px 0px 16px #51a6dd;
  cursor: pointer;
}
.consulterLivrables > .content > div {
  margin: 24px;
  padding: 16px 9.6px;
  border: 2px solid #e6eefa;
  box-shadow: 0px 0px 9.6px #e6eefa;
  border-radius: 16px;
  font-weight: 600;
}
.consulterLivrables > .content > div > span > *:nth-child(2):hover {
  cursor: pointer;
}
.consulterLivrables > .content > div > span > *:nth-child(2) {
  width: 13px;
  height: 13px;
}

.consulterLivrables > .content > div > span > i:nth-child(1) {
  border: solid #ff7f22;
  border-width: 0 3px 3px 0;
  padding: 4px;
  margin-bottom: 3px;
  display: inline-block;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.consulterLivrables > .content > div > span > i:nth-child(1):hover {
  cursor: pointer;
}
.consulterLivrables > .content > div > span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0px 16px;
  display: inline-block;
}
.consulterLivrables > .content > div > *:nth-child(1) {
  width: 25%;
  color: #005d93;
}
.consulterLivrables > .content > div > *:nth-child(2) {
  color: #005d93;
  width: 30%;
}
.consulterLivrables > .content > div > *:nth-child(3) {
  width: 20%;
  text-align: right;
}
.consulterLivrables > .content > div > *:nth-child(4) {
  width: 10%;
  text-align: right;
}
.consulterLivrables > .content > div > *:nth-child(4) > * {
  margin: 0px 2px 0px 16px;
}
.consulterLivrables > .content > div > div {
  padding: 24px 24px 16px 36px;
}
.consulterLivrables > .content > div > div > p {
  color: rgba(3, 12, 23, 0.6);
  padding: 24px 9.6px 4px 9.6px;
  border-bottom: 2px solid #b1b2b2;
}
.consulterLivrables > .content > div > div > span {
  display: block;
  position: relative;
  padding: 24px 9.6px 4px 9.6px;
}
.consulterLivrables > .content > div > div > span > input {
  transition: all 0.2s ease-in;
  width: 100%;
  height: 36px;
  padding: 4px 72px 4px 16px;
  box-sizing: border-box;
  border-radius: 6px;
  border: 2px solid #b1b2b2;
  outline: none;
  color: rgba(3, 12, 23, 0.6);
  font-weight: 600;
}
.consulterLivrables > .content > div > div > span > input:hover,
.consulterLivrables > .content > div > div > span > input:focus {
  box-shadow: 0px 0px 9.6px #51a6dd;
  border: 2px solid #51a6dd;
}
.consulterLivrables > .content > div > div > span > button {
  position: absolute;
  right: 24px;
  top: 30px;
  background-color: transparent;
  border: none;
}
.consulterLivrables > .content > div > div > span > button > img {
  width: 15px;
  height: 15px;
}
.consulterLivrables > .content > div > div > span > button > img:hover {
  cursor: pointer;
}
.consulterLivrables > .content > div > div.hidden {
  visibility: collapse;
  display: none;
  height: 0px;
  padding: 0px !important;
}
</style >