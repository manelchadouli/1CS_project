<template>
  <nav>
    <ul>
      <li>
        <img src="./../assets/logo.svg" alt="people planning" />
      </li>
      <li><a href="/">Features</a></li>
      <li><a href="/">A propos</a></li>
      <li><a href="/">Contact</a></li>
      <li><button @click="goToLogin">Se connecter</button></li>
    </ul>
  </nav>

  <div class="mainPage">
    <div>
      <p>
        Un seul endroit pour créer, gérer <br />
        et collaborer
      </p>
      <img src="./../assets/images/people.jpg" alt="people planning" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      user: null,
    };
  },
  async created() {
    const response = await axios.get("http://localhost:5000/verifyToken", 
    
    {
      
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    this.user = response.data;
  },
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
nav {
  text-align: right;
}
nav > ul {
  display: flex;
}
nav > ul li {
  list-style-type: none;
  margin-right: 108px;
}
nav > ul li * {
  display: block;
}
nav > ul li a {
  font-size: large;
  text-decoration: none;
  color: #030c17;
  margin: 24px;
  transition: ease-in 200ms;
}
nav > ul li a:hover {
  color: #51a6dd;
}
nav > ul li button {
  transition: ease-in 200ms;
  background-color: #fefefe;
  border: 2px solid #51a6dd;
  color: #51a6dd;
  padding: 9.6px 36px;
  margin: 16px 0px;
  border-radius: 16px;
}
nav > ul li button:hover {
  border: 2px solid #ff7f22;
  color: #ff7f22;
  cursor: pointer;
}
nav > ul > *:last-child {
  margin-right: 36px;
}
nav > ul > li > img {
  margin-left: 36px;
  height: 36px;
  width: auto;
  padding: 16px;
}
nav > ul > li > img:hover {
  animation: animate-logo 3s infinite 0s;
}
nav > ul *:nth-child(2) {
  text-align: right;
  margin-left: auto;
}
.mainPage div {
  max-width: 936px;
  display: grid;
  grid-template-columns: 5fr 2fr;
  height: 70vh;
  margin-left: auto;
  margin-right: auto;
  margin-top: 96px;
}
.mainPage div > p {
  display: inline;
  max-width: 366px;
  text-align: center;
  font-size: 48px;
  padding: 36px;
  margin-left: 24px;
  line-height: 1.2;
}
.mainPage div > img {
  width: 432px;
  height: auto;
}
* {
  font-weight: 600;
}
@keyframes animate-logo {
  25% {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
    -webkit-transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}
</style>