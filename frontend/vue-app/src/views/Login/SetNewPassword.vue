<template>
<div class="page">
  <div class="header">
        <img src="../../assets/logo2.png" alt="this logo ">
    </div>
    <div class="container">
        <form >
            <h1>Nouveau mot de passe</h1>
            <span>votre nouveau mot de passe doit ètre different de mot passe que vous avez utilisé précédement</span>
            <div class="error-text">mot de passe ne correspond pas</div>
            <p>mot de passe </p>
            <div class="field">
                <input id="pswrd_1" type="password" placeholder="***********"  name="pswrd_1" v-model="pswrd_1">
            </div>
            <p>confirmer mot de passe </p>
            <div class="field">
                <input id="pswrd_2" type="password" placeholder="***********"  name="pswrd_2" v-model="pswrd_2">
                <div class="SHOW">SHOW</div>
            </div>
            <button @click.prevent="handleSubmit">réinitialiser</button>
        </form>
    </div>
    <div class="v45_20">
        <a href="login"><img src="../../assets/arrow.png" alt="this arrow"></a>
    </div>
    <span class="v45_21">retour à connextion</span>
</div>

</template>

<script>
import axios from 'axios';
export default {
     name:'SetNewPassword',
     props:['idCompte'],
    data() {
        return {
             pswrd_1:"",
            pswrd_2:""
        }
    },
methods:{
async handleSubmit(){
  const idCompte=this.$props.idCompte;
     let ps1=this.pswrd_1;
     let ps2=this.pswrd_2;
     let password={
         pass:ps2
     }
     if(ps1==ps2){

await axios.post(`http://localhost:5000/updatePassword/${idCompte}`,password).then((response)=>{
   if(response.status==200)
           this.$router.push('/Login/PasswordSet')
  })

     }

}
}
}
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
/*background-color: #51A6DD*/;
}
.header img{
    position:relative;
    left:90%;
   /* height:10%;
      ;
    top:10%;*/
     margin-top: 30px;
     width:80px; height:80px
}
.container{
    padding:20px 20px;
    background-color:#fefefe;                    /*#fefefe*/
    width:510px;
    position:relative;
    top:0%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
}
h1{
    font-weight:bolder;
   
    font-size:35px
}
span{
    padding-top:10px;
    color:#B1B2B2;
    top:120px;
    font-size:12.30769px;
    line-height:25px;
    font-weight: 500;
}
.container form{
    margin:3px 2px
}
.container form .error-text{
    background:#f8d7da;
    padding:15px 0;
    border-radius:5px;
    color:#8b3e46;
    border:1px solid  #f8d7da;
    display:none
}
.p{
    font-weight:500;
    left:0;
    margin:0
}
.container form .field{
    width:100%;
    height:45px;
    display:flex;
    margin:20px 0;
    position:relative;
    background-color:#fefefe
}
input{
    background-color:#e6eefa;
    border:none;
    padding:16px;
    margin:9.6px 0;
    width:100%;
    border-radius:5px;
    height:100%
}
form .field .SHOW{
    position:absolute;
    right:10px;
    top:50%;
    transform:translateY(-50%);
    font-size:14px;
    font-weight:600;
    user-select:none;
    cursor:pointer;
    display:none
}
form button{
    border-radius:9.6px;
    background-color:#005D93;
    color:#fefefe;
    font-size:16px;
    font-weight:600;
  
    text-transform:uppercase;
    transition:0.2s ease-in;
    width:100%;
    height:45px;
    margin:3px 0 10px 0;
    text-align:center
}
form button:hover{
    background-color:#51A6DD
}
.v45_20 img{
    width:2%;
    position:relative;
    top:25px;
    left:20px;
      width:27px ;height:27px
}
.v45_21{
    width:220px;
    position:relative;
    top:-10px;
    left:50px;
    font-family:Poppins;
    font-weight:Regular;
    font-size:16px;
    opacity:1;
    text-align:left;
    color:#030c17
}
</style>