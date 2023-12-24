<template>
<div v-if="ShowModal">
    <!-- Pass the data in a property (data is the name we gave the property in the component "AddEnseignant") 
    and TeacherToOpen is the name we gave it in this page -->
    <ChoixRole
   :data="logedUser"
    @close="closeModal"
   
    />
</div>
  <div class="container" id="container">
    <div class="form-container log-in-container">
      <div class="logo">
        <img src="../../assets/logo2.png" alt="Logo picture" class="logo" />
      </div>
      <form>
        <h1>Connexion</h1>

        <span>Bienvenu! merci de vous connecter à votre compte</span>
        <input
          type="text"
          placeholder="Email"
          name="email"
          required
          v-model="email"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          v-model="password"
        />
        <div v-if="passwordError" class="error">{{ passwordError }}</div>

        <div class="boxe">
          <div class="checkbox">
            <input
              type="checkbox"
              checked="checked"
              name="remember"
              v-model="remember_me"
              id="chackbox"
            />
            <label for="checkbox">Rappelez-vous de moi</label>
          </div>

                <div class="changePassword">
                    <router-link to="/Login/email_validation">mot de passe oublier?</router-link>
                </div>
            </div>

        <button @click.prevent="handleSubmit">connextion</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-right">
          <h1>Welcome back!</h1>
          <img
            src="../../assets/login_picture.svg"
            alt="Login picture"
            class="login"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import ChoixRole from "../Shared/ChoixRole.vue";
export default defineComponent ({
  
  name: "login",
  // The different components that are used in this component
  components: { ChoixRole },
  data() {
    return {
      email: "",
      password: "",
      remember_me: false,
      passwordError: "",
       ShowModal: false,
        logedUser:null
    };
  },
  methods: {
      closeModal() {
      // Hide the popup

      this.ShowModal = false;

      // Delete any existing data from previous operations
      this.logedUser = null;
    },
    async handleSubmit() {
      //validate password
      this.logedUser={
        email:this.email,
        password:this.password,
        role:""
      }

      this.passwordError =
        this.password.length > 6
          ? ""
          : "password must be at least 8 chars long";
      await axios.post('http://localhost:5000/Inscrire', this.logedUser)
      .then((response)=>{
        
 if(response.data.Roles){
  //  this.ShowModal = true;
  //  return;
  localStorage.setItem('Roles',response.data.Roles);
      this.logedUser.role="Admin";
      axios.post('http://localhost:5000/Inscrire', this.logedUser)
      .then((res)=>{
localStorage.setItem('User',JSON.stringify(res.data.User[0]));
      localStorage.setItem('token',res.data.token);

      this.Redirect(res.data.role)
      
      })
      .catch((err)=>{
      })
      
    }
    else
    {
 //save token in localStorage 
 
      localStorage.setItem('User',JSON.stringify(response.data.User[0]));
      localStorage.setItem('token',response.data.token);
      this.Redirect(response.data.role)
    }
  
  
       
      })
     .catch((error)=>{
this.passwordError=error.response.data.message;
     })
      // let User=JSON.parse(localStorage.getItem('User'))
   

    },
    Redirect(role){
      switch(role){
     case 'Admin':
            this.$router.push('/admin/GestionCompteEtudiant');
            break;
        case 'Enseignant':
           this.$router.push('/Enseignant/ConsulterLesThemes');
            break;
        case 'Etudiant':
         this.$router.push('/Etudiant/ConsulterLesThemes');
            break;
        case 'Entreprise':
            this.$router.push('/');
            break;
            default :
            this.$router.push('/');
  }
    }
  },
});
</script>

<style scoped>
html {
  background-color: #fefefe;
  color: #030c17;
}
* {
  margin:5px  auto;
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
* {
  box-sizing: border-box;
}
body {
  background: #fefefe;
  height: 100vh;
}
h1 {
  font-weight: bold;
  margin: 36px;
  font-size: 48px;
 
}
span {
  font-size: 12.30769px;
  color: #6d6e6e;
  padding: 16px;
}

.logo {
  width: 32px;
  margin-left: auto;
  margin-right: 30px;
  margin-top: 10px;
  height: 32px;
}

a {
  float: right;
  color: #005d93;
  font-size: 12.30769px;
  text-decoration: none;
  padding-top: 9.6px;
}
button {
  margin-top: -10px;
  border-radius: 9.6px;
  background-color: #005d93;
  color: #fefefe;
  font-size: 16px;
  font-weight: 600;
  padding: 16px 48px;
  text-transform: uppercase;
  transition: 0.2s ease-in;

}
button:hover {
  background-color: #51a6dd;
}
form {
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
  padding: 0 48px;
  height: 100%;
  text-align: center;
}
input {
  background-color: #e6eefa;
  border: none;
  padding: 16px;
  margin: 9.6px 0;
  width: 100%;
  border-radius: 5px;
}
.container {
  margin-top: 78px;
  border-radius: 9.6px;
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.25), 0 9.6px 9.6px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 900px;
  max-width: 100%;
  min-height: 504px;
  margin-left: auto;
  margin-right: auto;
}
.form-container {
  position: absolute;
  height: 100%;
}
.log-in-container {
  left: 50%;
  width: 50%;
  z-index: 2;
}
.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
}
.overlay {
  background: #51a6dd;
  background: -webkit-linear-gradient(to right, #005d93, #51a6dd);
  background: linear-gradient(to right, #005d93, #51a6dd);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #fefefe;
  position: absolute;
  left: -100%;
  height: 100%;
  width: 100%;
  margin-top: -5px;
}
.error {
  color: red;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
.boxe {
  display: flex;
  align-content: left;
}
.checkbox {
 
   display: inline-block;
   flex-direction: row;
   align-content: left;
   /*background-color: crimson;*/
  /* margin-right: 10px;*/
  
   margin-left:-20px;
   margin-top: -15px;
  
}
.checkbox input {
   
  width: 18px;            
  margin-right: 2px;
  margin-bottom: 0px;
  background-color: white;
}
.checkbox label {
  /*margin-right: 250px;*/
  font-size: 12px;
 /* background-color: #ff7f22;*/

}
.changePassword{
  align-content: right;
 /* flex-direction: row;*/
  margin-top: 0px;
  margin-left: 100px;
  margin-right: -20px;
 /* background-color: #ff7f22;*/
  margin-top: -20px;


  
}
.login{
  width: 100%;
  height:100% ;
  left: 10px;
}
</style>