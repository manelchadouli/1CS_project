<template>
<div class="modal" v-if="currentUser">
<h1>veuillez choisir un role</h1>
  <select v-model="role" name="role" id="role" @change=" getRole(role)">
    <option value="Admin">Admin</option>
    <option value="Enseignant"> Enseignant</option>
    <option value="Etudiant">Etudiant</option>
  </select>
  </div>
</template>

<script>
export default {
    data(){
        return{
            role:null,
            }
    
    },
  
 methods:{
      mounted(){
         this.role = this.data ? this.data : { ...this.data };
         console.log(this.role);
    },
    
      closeModal() {
        console.log("************")
      this.$emit("close");
    },
    getRole(role){
console.log("the user is loged as : ",this.role);
localStorage.setItem('Role',role);
return;
      this.logedUser.role="Admin";
      axios.post('http://localhost:5000/Inscrire', this.logedUser)
      .then((res)=>{
localStorage.setItem('User',JSON.stringify(res.data.User[0]));
      localStorage.setItem('token',res.data.token);

      this.Redirect(res.data.role)
      
      })
      .catch((err)=>{
      })
    },
       currentUser(){
    
      // Get role
      var role = localStorage.getItem('role');
 }
}}
</script>
<style>
.modal {
  width: 200px;
  height: 100px;
  padding: 20px;
  margin: 250px auto;
  background: #ececec;
  border-radius: 10px;
  border-color: 1px black;
}
.modal > select {
  background-color: #fefefe;
  border: 2px solid #b1b2b2;
  padding: 16px;
  margin-left: 25px;
  margin-top: 20px;
  border-radius: 16px;
  color: #b1b2b2;
  outline-style: none;
}
</style>