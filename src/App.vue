<script setup>
import {RouterView} from 'vue-router';
import Navbar from './Components/Navbar.vue';
// import Footer from './Components/footer.vue';

</script>
<template>
  <v-app>
 <v-main>
    <Navbar/>
  <RouterView/>
  <Footer></Footer>
 </v-main>
 </v-app>
</template>

<style scoped></style>
