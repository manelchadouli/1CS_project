<template>
<div class="page">
    <select name="year" @select="RoleSelected">
        <option v-for="role in Roles" value="">{{role}}</option>
    </select>   
</div>
</template>

<script>
import axios from "axios"

export default ( {
    name:'email_validation',
    data() {
        return {
             Roles:"hyhh"
        }
    },
    methods: {}});
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

</style>