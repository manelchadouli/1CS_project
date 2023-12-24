<template>
<div class="page">
        <div class="header">
         <img src="../../assets/logo2.png" alt="this logo ">
        </div>
        <div class="content">
           <h1>Réinitialiser le mot de passe</h1>
           <span>si vous avez perdu votre mot de passe ou souhaitez le réinitialiser,</span><br>
           <span>veuillez entrer votre email ci-dessous pour commencer</span>
           
           <form >
               <p>Email</p>
               <input id="email" type="text" placeholder="entrez votre adresse email" name="email" v-model="email">
               <div class="error-text">
                  entrez un valide adress email
               </div>
               <button @click.prevent="handleSubmit">soumettre</button>
            </form>
        </div>
                <div class="v45_20"><a href="login"><img src="../../assets/arrow.png" alt="click here to get back to login_page"></a></div>
                 <span class="v45_21">retour à connextion</span>
                <div class="v45_22"><img src="../../assets/forget_password.svg" alt="forgot your password" width="300px" height="150px"></div>
</div>
</template>

<script>
import axios from "axios"

export default ( {
    name:'email_validation',
    data() {
        return {
             email:"",
        }
    },
    methods: {
    async    handleSubmit(){
     
     let user={email:this.email};
         if(email){
 const response= await axios.post('http://localhost:5000/findCompte',user);
if(response.data){
 this.$router.push({name:'SetNewPassword',
 params:{
     idCompte:response.data,
 }
 });
}
else {console.log("user not found")}
         }

         
         
        }

    },


})
</script>

<style scoped>
html{
    background-color:#fefefe;
    color:#030c17
}
*{
    margin:0px;
    padding:0px;
    font-family:'Poppins', sans-serif;
    font-size:16px
}
a{
    transition:ease-in 200ms;
    color:#ff7f22;
    text-decoration:none
}
a:hover,a:focus{
    color:#51A6DD
}
*{
    box-sizing:border-box
}
body{
    background:#fefefe;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    font-family:'Poppins', sans-serif;
    height:100vh
}
.page{
    margin-right:auto;
    margin-left:auto;
   /* background-color: #51A6DD;*/
}
.header img{
    position:relative;
    left:85%;
    margin-top: 30px;
     width:80px; height:80px
}
h1{
    font-weight:bold;
    margin:10px;
    font-size:32px;
    text-align:center;
    top:1%
}
span{
    font-size:12.30769px;
    color:#6d6e6e;
    margin:16px 16px 36px 180px;
   
}
p{
    font-weight:500;
    background-color:hwb(0 100% 0%);
    margin:0px;
    padding-right: 230px;
}
button{
    border-radius:9.6px;
    background-color:#005D93;
    color:#fefefe;
    font-size:16px;
    font-weight:600;
    padding:16px 48px;
    text-transform:uppercase;
    transition:0.2s ease-in;
    width:100%
}
button:hover{
    background-color:#51A6DD
}
.content{
    background-color:#fefefe;  /*#fefefe*/
    border-radius:9.6px;
    position:relative;
    overflow:hidden;
    width:720px;
    max-width:100%;
    min-height:432px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;

}
.form-content{
    position:relative;
    top:0}
form{
    background-color:#fefefe;
    display:flex;
   /* align-items:center;*/
    justify-content:center;
    flex-direction:column;
    padding:0 216px;
    height:20%;
    text-align:center
}
input{
    background-color:#e6eefa;
    border:none;
    padding:16px;
    margin:9.6px 0;
    width:100%;
    border-radius:5px
}
form .error-text{
    margin:6px 0;
    background-color:#f8d7da;
    color:#8b3e46;
    font-size:16px;
    padding:16px 36px;
    border-radius:5px;
    width:100%;
    display:none
}
form .error-text:before{
    position:absolute;
    height:15px;
    width:15px;
    background-color:#f8d7da;
    right:20px;
    top:-7px;
    transform:rotate(45deg)
}
.v45_20 img{
    width:2%;
    position:relative;
    top:-12px;
    left:30px;
    width:27px ;height:27px
}
.v45_21{
    width:220px;
    position:relative;
    top:-45px;
    left:-120px;
    font-family:Poppins;
    font-weight:Regular;
    font-size:16px;
    opacity:1;
    text-align:left;
    color:#030c17
}
.v45_22{
    position:relative;
     top:-200px;
    left:70%;
    max-width: 50px;
    max-height: 50px;
   /* size:10px*/
}
</style>