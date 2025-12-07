<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const emailAddress = ref("");
const password = ref("");
const showPassword = ref(false);

const router = useRouter();
const auth = useAuthStore(); // Pinia auth store

// Updated login function to call backend
async function login() {
  try {
    // Call backend via auth store
    await auth.login(emailAddress.value, password.value);

    if (auth.isLoggedIn) {
      router.push("/"); // Redirect to Home if login successful
    } else {
      console.log("Invalid credentials");
      alert("Login failed: Invalid credentials");
    }
  } catch (err) {
    console.error("Login failed", err.response?.data || err);
    alert("Login failed: " + (err.response?.data?.message || err.message));
  }
}
</script>

<template>
  <v-container align="center">
    <v-row>
      <v-col>
        <v-card class="pa-6" width="600" color="teal">
          <v-card-title>Log In</v-card-title>

          <!-- Email -->
          <v-text-field
            v-model="emailAddress"
            label="Email Address"
            :rules="[
              (v) => !!v || 'Email is required',
              (v) => /.+@.+\..+/.test(v) || 'Email must be valid'
            ]"
          />

          <!-- Password -->
          <v-text-field
            v-model="password"
            label="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            :rules="[
              (v) => !!v || 'Password is required',
              (v) => v.length >= 8 || 'Password must be at least 8 characters'
            ]"
            required
          />

          <v-card-text>
            Do not have an account?
            <router-link to="/signUp">Sign up</router-link>
          </v-card-text>

          <!-- Login Button -->
          <v-card-actions>
            <v-btn color="white" variant="elevated" @click="login">
              Log in
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
