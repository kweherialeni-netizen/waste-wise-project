<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const router = useRouter();
const auth = useAuthStore();

async function signup() {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  try {
    // Only pass name, email, password, and password_confirmation
    await auth.register(name.value, email.value, password.value, confirmPassword.value);

    if (auth.isLoggedIn) {
      alert("Registration successful!");
      router.push("/"); // Redirect to Home
    } else {
      alert("Registration failed.");
    }
  } catch (err) {
    console.error("Registration failed", err.response?.data || err);

    // Collect all validation errors
    let message = "Registration failed.";
    if (err.response?.data?.errors) {
      message = Object.values(err.response.data.errors)
        .flat()
        .join("\n");
    } else if (err.response?.data?.message) {
      message = err.response.data.message;
    }

    alert(message);
  }
}
</script>

<template>
  <v-container align="center">
    <v-row>
      <v-col>
        <v-card class="pa-6" width="600" color="teal">
          <v-card-title>Sign Up</v-card-title>

          <v-text-field
            v-model="name"
            label="Name"
            :rules="[(v) => !!v || 'Name is required']"
          />

          <v-text-field
            v-model="email"
            label="Email"
            :rules="[
              (v) => !!v || 'Email is required',
              (v) => /.+@.+\..+/.test(v) || 'Email must be valid'
            ]"
          />

          <v-text-field
            v-model="password"
            label="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            :rules="[
              (v) => !!v || 'Password is required',
              (v) => v.length >= 5 || 'Password must be at least 5 characters'
            ]"
          />

          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showConfirmPassword ? 'text' : 'password'"
            @click:append="showConfirmPassword = !showConfirmPassword"
            :rules="[
              (v) => !!v || 'Please confirm your password',
              (v) => v === password || 'Passwords must match'
            ]"
          />

          <v-card-text>
            Already registered?
            <router-link to="/login">Back to Login</router-link>
          </v-card-text>

          <v-card-actions>
            <v-btn color="white" variant="elevated" @click="signup">
              Sign Up
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
