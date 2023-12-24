<template>
  <TopBar />
  <div class="mainPage">
    <h1>Main Page</h1>
    <br />
    <div class="content">
      <div>
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
          </div>
        </div>
      </div>
      <div>
        <h2>Ajouter un nouveau livrable :</h2>
        <label for="title">Entrez un titre</label>
        <textarea name="title" v-model="nouveauLivrableTitre"></textarea>
        <label for="fileInput">Selectionez un fichier</label>
        <span v-bind:class="{ selected: nouveauLivrableAdded }">
          <input name="fileInput" type="file"  ref="filesReference"  @change="FileAdded" />
          <img src="../../assets/icons/upload-to-cloud.svg" alt="upload file" />
        </span>
        <div>
          <button @click="UploadFile">ajouter</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EtudiantTopBar from "./EtudiantTopBar.vue";
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  name: "MainPage",
  components: {
    TopBar: EtudiantTopBar,
  },
  data() {
    return {
      livrables: [],
      nouveauLivrableTitre: "",
      nouveauLivrableAdded: false,
      file: "",
    };
  },
  // On page load
  async created() {
    await this.GetLivrables();
  },
  methods: {
    // Load data from the server
    async GetLivrables() {
      var user  =  JSON.parse(localStorage.getItem('User'));
      var idEquipe=  user.IdEquipe;
await axios.get(`http://localhost:5000/getLivrables/${idEquipe}`,
{
  headers:{
    Authorization: localStorage.getItem("token"),
  }
}
).then((response)=>{
  this.livrables=[];
response.data.forEach(elem => {
  if(elem)

  var dataDate = new Date(elem.liv.Date);
    var date = (dataDate.getDate()) +" " + (dataDate.toLocaleString("default",{month:"long"})) + " à " +  dataDate.getHours() + "h "  ;
this.livrables.push({
          IdLivrable: elem.liv.IdLivrable,
          Titre: elem.liv.Titre,
          NomCreateur:elem.liv.Nom+"  "+elem.liv.Prenom,
          DateAjout:date ,
          Commentaires: elem.res,
          IsOpen: false,
        });
  
   
});
})

  

    },

    // Downloads the file with the specific idLivrable
   async DownloadFile(idLivrable) {
     axios({
url:`http://localhost:5000/downloadLivrable/${idLivrable} `,
method:'GET',
responseType:'arraybuffer'
      }).then((response)=>{
      let   file= response.headers['content-disposition'].split(`filename='`)[1].slice(0,-1);
var fileUrl=window.URL.createObjectURL(new Blob([response.data],{type:'application/*'}));
console.log("fileUrl > >  ",fileUrl)
var fileLink=document.createElement('a');
console.log("fileUrl > >  ",fileLink)
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

    FileAdded(){
      // Add file reference
       this.file = this.$refs.filesReference.files[0];
       
       // Set file added to true
       this.nouveauLivrableAdded = true;
    },

    // Uploads the added file to the database
  async  UploadFile() {
    // If we didn't select a file
    if(!this.nouveauLivrableAdded)
    // Don't do anything
    return;
    
    // If we didn't add a title
    if(this.nouveauLivrableTitre === "")
    // Don't do anything
    return;
    
    const formData = new FormData();
      formData.append("file", this.file);
      formData.append("titre", this.nouveauLivrableTitre);
      var user  =  JSON.parse(localStorage.getItem('User'));
      formData.append("IdEtudiant", user.IdEtudiant);
      formData.append("IdEquipe", user.IdEquipe);

      console.log(user);
      console.log(user.IdEquipe);
      console.log(Array.from(formData))
      // console.log(formData)
      await axios({
        url: "http://localhost:5000/uploadLivrable",
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          Authorization: localStorage.getItem("token"),
        },
      }).then((response) => {
       console.log(response)
       this.GetLivrables();
      })

      this.nouveauLivrableTitre  = '';
    this.nouveauLivrableAdded = false;

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
.mainPage {
  padding: 48px 72px 144px 72px;
}
.mainPage > h1 {
  font-size: 48px;
  margin-bottom: 48px;
}
.mainPage > .content {
  display: grid;
  grid-template-areas: "livrables ajouter";
}
.mainPage > .content > div:nth-child(1) {
  grid-area: livrables;
  max-width: 792px;
  min-width: 720px;
}
.mainPage > .content > div:nth-child(1) > div {
  margin: 24px;
  padding: 16px 9.6px;
  border: 2px solid #e6eefa;
  box-shadow: 0px 0px 9.6px #e6eefa;
  border-radius: 16px;
  font-weight: 600;
}
.mainPage > .content > div:nth-child(1) > div > span > *:nth-child(2):hover {
  cursor: pointer;
}
.mainPage > .content > div:nth-child(1) > div > span > i:nth-child(1) {
  border: solid #ff7f22;
  border-width: 0 3px 3px 0;
  padding: 4px;
  margin-bottom: 3px;
  display: inline-block;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.mainPage > .content > div:nth-child(1) > div > span > i:nth-child(1):hover {
  cursor: pointer;
}

.mainPage > .content > div:nth-child(1) > div > span > *:nth-child(2) {
  width: 13px;
  height: 13px;
}
.mainPage > .content > div:nth-child(1) > div > span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0px 16px;
  display: inline-block;
}
.mainPage > .content > div:nth-child(1) > div > *:nth-child(1) {
  width: 20%;
  color: #005d93;
}
.mainPage > .content > div:nth-child(1) > div > *:nth-child(2) {
  color: #005d93;
  width: 25%;
}

.mainPage > .content > div:nth-child(1) > div > *:nth-child(3) {
  width: 22%;
  text-align: right;
}

.mainPage > .content > div:nth-child(1) > div > *:nth-child(4) {
  width: 12%;
  text-align: right;
}
.mainPage > .content > div:nth-child(1) > div > *:nth-child(4) > * {
  margin: 0px 2px 0px 16px;
}
.mainPage > .content > div:nth-child(1) > div > div {
  padding: 24px 24px 16px 36px;
}
.mainPage > .content > div:nth-child(1) > div > div > p {
  color: rgba(3, 12, 23, 0.6);
  padding: 24px 9.6px 4px 9.6px;
  border-bottom: 2px solid #b1b2b2;
}
.mainPage > .content > div:nth-child(1) > div > div.hidden {
  visibility: collapse;
  display: none;
  height: 0px;
  padding: 0px !important;
}
.mainPage > .content > div:nth-child(2) {
  padding: 0px 0px 0px 16px;
  max-width: 100%;
  grid-area: ajouter;
}
.mainPage > .content > div:nth-child(2) > h2 {
  font-size: 20.8px;
  font-weight: 600;
  margin: 24px 24px 16px 0px;
  color: #51a6dd;
}
.mainPage > .content > div:nth-child(2) textarea {
  resize: none;
  padding: 16px;
  background-color: transparent;
  box-sizing: border-box;
  width: 100%;
  height: 72px;
  border-radius: 9.6px;
  border: 1px solid #b1b2b2;
  box-shadow: 0px 0px 4px #b1b2b2;
  background-color: #fefefe;
  margin-top: 9.6px;
  margin-bottom: 24px;
}
.mainPage > .content > div:nth-child(2) textarea:focus {
  border: 2px solid #51a6dd;
  box-shadow: 0px 0px 4px #51a6dd;
  outline: none;
}
.mainPage > .content > div:nth-child(2) label {
  font-size: 20.8px;
  font-weight: 600;
}
.mainPage > .content > div:nth-child(2) > span {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px solid #51a6dd;
  border-radius: 16px;
  margin-top: 24px;
  padding: 24px 0px;
  margin-bottom: 24px;
}
.mainPage > .content > div:nth-child(2) > span.selected {
  box-shadow: 0px 0px 9.6px #51a6dd;
}
.mainPage > .content > div:nth-child(2) > span > input {
  position: absolute;
  cursor: pointer;
  height: 180px;
  opacity: 0;
}
.mainPage > .content > div:nth-child(2) > span > img {
  height: 180px;
}
.mainPage > .content > div:nth-child(2) > div {
  text-align: right;
}
.mainPage > .content > div:nth-child(2) > div > button {
  padding: 9.6px;
  border-radius: 9.6px;
  border: 2px solid #51a6dd;
  background-color: #fefefe;
  color: #51a6dd;
}
.mainPage > .content > div:nth-child(2) > div > button:hover,
.mainPage > .content > div:nth-child(2) > div > button:focus {
  box-shadow: 0px 0px 9.6px #51a6dd;
  cursor: pointer;
}
</style>
