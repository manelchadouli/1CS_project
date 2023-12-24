<template>
  <ETopBar />

         
         <div class="page-containerr" >
          <div class="title"><img
                src="../../assets/user-svgrepo-com.svg"
                alt="user"
                style="width: 50px; height: 50px"
              /><h1> Welcome to Your Profile </h1></div>
          <div class="box1">
           


          <div class="etudiant-Commentaire" v-for="commentaire in commentaires" :key="commentaire.id">
            <h1>{{commentaire.titre}}</h1>  
           <p>{{commentaire.description}}</p>
          
           </div>
           </div>
           
           
              <div class="box2">
               <h1> Mes Taches</h1>
               <div class="etudiant-Taches" v-for="tache in taches" :key="tache.id">
               <h2>{{tache.titre}}</h2>
               <p>{{tache.responsable}}</p>
               <button>
               <img
                src="../../assets/details-svgrepo-com.svg"
                alt="details"
                style="width: 40px; height: 40px"
              />
              </button>
               </div>
               </div>
          
         
          </div>
          </template>


<script >
import { defineComponent } from "vue";
import EtudiantTopBar from "./EtudiantTopBar.vue";

// Export this component so we can use it from other files
    export default defineComponent({
  // The name of this component
  name: "Projet",

  // The different components that are used in this component
  components: { ETopBar: EtudiantTopBar },
    data(){
    return{
    commentaires: [
        {
          id: "1",
          titre: "titreCommentaire",
          description: "Description",
          

        },

        {
          id: "2",
          titre: "titreCommentaire",
          description: "lfdjglmdskjglskjlfgkjsmdgkslmfkgjslfkgjfdlsgjfdgjklfdjglmdskjglskjlfgkjsmdgkslmfkgjslfkgjfdlsgjfdgjkvlfdjglmdskjglskjlfgkjsmdgkslmfkgjslfkgjfdlsgjfdgjk",
          

        },
        {
          id: "3",
          titre: "titreCommentaire",
          description: "Description",
          

        },

         {
          id: "4",
          titre: "titreCommentaire",
          description: "Description",
          

        },
    
    
    ],

    taches: [
        {
          id: "1",
          titre: "titreTache",
          responsable: "nomResponsable",
         
             
        },

        {
          id: "2",
         titre: "titreTache",
          responsable: "nomResponsable",
          
        },
        {
          id: "3",
         titre: "titreTachetitreTachetitreTachetitreTachetitreTachetitreTachevvvtitreTachetitreTachetitreTachetitreTachetitreTachetitreTache",
          responsable: "nomResponsabtitreTachetitreTachetitreTachetitreTachetitreTachetitreTachetitreTachetitreTachetitreTachetitreTachetitreTachetitreTachetitreTachetitreTachele",
         
        },
    
    
    ],
    };
    }


});
</script>
<style>
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

.etudiant-Commentaire{
   overflow: hidden;
    overflow: ellipsis; 
   border-radius: 10px;
   width: 300px;
   height: 100px;
   
   border:  1px solid gray;
   margin-top: 50px;
   margin-left: 100px;
   margin-right: 100px;
   background:  none;



    
}
 .etudiant-Commentaire h1{
   color:white;
   font-size: 100%;
   padding-top: 10px;
     border:none;
     width:100%;
     height:33%;
     background-color: #6bb4d1 ;
     text-align: center;
     border-top-left-radius: 10px;
     border-top-right-radius: 10px;

 }
 

.etudiant-Taches{ 
   vertical-align:middle;
    overflow:hidden;
    text-overflow: ellipsis; 
       height: 50px;
     border-radius: 10px;
     width: 680px;
     padding-right: 20px;
     padding-top: 10px;
     padding-bottom: 10px;
     border: 1px solid gray;
     margin-top: 50px;
      margin-left: 0px;
 align-self: left;
    margin-right: 100px;
     display: flex;
     flex-direction: row;
     justify-content: space-between;

}
.box1{
  float:left;
}
.title h1{
 padding-left:50px ;
  font-size: 300%;
}
.title{
   padding-top:3% ;
   padding-bottom:3% ;
   padding-left:100px ;
  display: flex;
     flex-direction: row;
     
}


.box2{
  float:right;
}
.box2 h1{
  padding-top:43px;
  padding-left:0px;
    font-size:200% ;
    color: black;
   
}

.etudiant-Taches h2{
  overflow: hidden;
    overflow: ellipsis;
    width: 80px;
  padding-left: 20px;
  font-size:100% ;
  color: black;
  
  transform: translateY(30%);
}


.etudiant-Taches p{

 overflow: hidden;
    overflow: ellipsis;
    width: 150px;
 
  font-size:100% ;
  color: black;
  transform: translateY(30%);
}
  .etudiant-Taches button{
  background-color: transparent;
  padding-right:10px ;
}

.etudiant-Taches img{
  
   padding-right:10px ;
}

.etudiant-Commentaire p{
  overflow: hidden;
   text-overflow: ellipsis; 
  background-color:white;
  border-radius: 10px;
  padding-top: 20px;
  padding-left: 10px;
  text-align: left;
}

button{
  border: none;
  background-color: none;
}

</style>
