<template>
  <div class="page">
    <div class="container">
      <div class="header">
        <img src="../../assets/logo2.png" alt="this logo " />
      </div>
      <div class="v80-12">
        <img src="../../assets/check.png" alt="check circle" />
      </div>
      <form>
        <h1>Mot de passe réinitialisé</h1>
        <br />
        <span>votre mot de passe a été réinitialisé avec succé,</span>
        <span>cliquez ci-dessous pour vous connecter à votre compte</span><br />
        <button disabled @click="handleclick">Continuez</button>
      </form>
      <div class="v45_20">
        <a href="login.html">
          <img
            src="../../assets/arrow.png"
            alt="click here to get back to login_page"
          />
        </a>
        <span class="v45_21">retour à connextion</span>
      </div>
    </div>

    <div class="container">
      <div class="v80-12">
        <img
          src="../../assets/check.png"
          alt="check circle"
          width="50px"
          height="50px"
        />
      </div>
      <form action="#">
        <h1>mot de passe réinitialisé</h1>
        <span>votre mot de passe a été réinitialisé avec succé,</span>
        <span>cliquez ci-dessous pour vous connecter à votre compte</span>
        <button @click="goToLogin">Continuez</button>
      </form>
    </div>
    <div class="v45_20">
      <a href="login.html">
        <img
          src="../../assets/arrow.png"
          alt="click here to get back to login_page"
        />
      </a>
    </div>
    <div>
      <span class="v45_21">retour à connextion</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push("/login/login");
    },
  },
};
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
* {
  box-sizing: border-box;
}
body {
  background: #fefefe;
  display: flex;
  justify-content: center;
  /*align-items:center;*/
  flex-direction: column;
  font-family: "Poppins", sans-serif;
  height: 100vh;
}
.page {
  margin-left: auto;
  margin-right: auto;
}
.header img {
  position: relative;
  left: 80%;
  width: 80px;
  height: 80px;
  /*height:-5%;*/
  /* width: 5%;*/
  /* top:10%*/
}
h1 {
  font-weight: bolder;
  font-size: 35px;
  padding: 2px;
}
span {
  font-size: 12.30769px;
  color: #6d6e6e;
  padding: 9.6px;
}
.container {
  background-color: #fefefe; /*#fefefe*/
  border-radius: 9.6px;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  min-height: 570px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  /*margin-bottom: auto;*/
}
form {
  background-color: #fefefe;
  display: flex;
  align-items: center;
  /*justify-content:center;*/
  flex-direction: column;
  /* padding:0 48px;*/
  height: 300px;
  text-align: center;
  margin-top: 120px;
}
.v80-12 {
  top: 2%;
  left: -5%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  color: #005d93;
  /*margin-top: 30px;*/
  width: 2px;
  height: 2px;
}
button {
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

.v45_20 img {
  /*  width:2%;*/
  position: absolute;
  top: 597px;
  left: 30px;
  width: 27px;
  height: 27px;
}
.v45_21 {
  width: 220px;
  position: absolute;
  top: 587px;
  left: 45px;
  font-family: Poppins;
  font-weight: Regular;
  font-size: 16px;
  opacity: 1;
  text-align: left;
  color: #030c17;
}
</style>