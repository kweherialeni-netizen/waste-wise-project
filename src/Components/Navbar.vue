<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <v-app-bar color="teal-darken-3">
    <v-app-bar-title>Waste Wise</v-app-bar-title>

    <!-- Navigation Links -->
    <v-btn to="/">Home</v-btn>
    <v-btn to="/Recycle">Recycle</v-btn>
    <v-btn to="/Dashboard">Dashboard</v-btn>

    <!-- Admin only when logged in -->
    <v-btn v-if="auth.isLoggedIn" to="/admin">Admin</v-btn>

    <!-- Spacer pushes login/avatar to right -->
    <v-spacer></v-spacer>

    <!-- NOT LOGGED IN -->
    <template v-if="!auth.isLoggedIn">
      <v-btn to="/Signup">Sign Up</v-btn>
      <v-btn to="/login">Log In</v-btn>
    </template>

    <!-- LOGGED IN -->
    <template v-else>
      <!-- User avatar -->
      <router-link to="/Profile">
        <v-avatar class="mr-4" color="white">
          <span class="text-h5 text-teal-darken-3">
            {{ auth.user?.name?.charAt(0).toUpperCase() || 'U' }}
          </span>
        </v-avatar>
      </router-link>

      <!-- Logout button -->
      <v-btn @click="logout">Logout</v-btn>
    </template>
  </v-app-bar>
</template>
