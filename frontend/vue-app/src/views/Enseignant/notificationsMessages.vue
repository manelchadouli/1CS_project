<template>
  <div class="toast">
    <div class="toast-content">
      <i class="fas fa-solid fa-check check"></i>
      <div class="message">
        <span class="text text-1">chetoui houssem</span>
         <span class="text text-2">votre thème proposé a été refusé</span>
      </div>
     
    </div>
    <i button class="fa-solid fa-xmark close" @click="closeModal"></i>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"

export default  defineComponent({
name:'notificationsMessages',
  
   
  methods: {
   closeModal(){
     this.$emit('close')
   },

   
    
 }
})
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
body{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
}
.toast{
  background: #fff;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  border-radius: 12px;
  padding: 20px 10px 50px 10px;
  position: absolute;
  top: 80px;
  right: 10px;
  border-left: 0 6px solid #d3131d;
  overflow: hidden;
}
.toast .toast-content{
  display: flex;
  align-items: center;


}
.toast-content .check{
    height: 25px;
    width: 25px;
    background-color: #4070f4;
    color: #fff;
    font-size: 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.message .text{
  font-size: 15px;
  font-weight: 400;
  color: #666666;
 
}
.message .text.text-1{
  font-weight: 600;
  color: #333;

}
.toast-content .message{
     display: flex;
     flex-direction: column;
     
     margin-right: -85px;


}
.toast .close{
  position:absolute;
  top: 10px;
  right: 15px;
  padding: 5px;
  cursor: pointer;
  opacity: 0.7;
}
.toast .close:hover{
  opacity: 1;
}






</style>