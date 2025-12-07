<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const name = ref("");
const emailAddress = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const router = useRouter();
const auth = useAuthStore();

// Updated signup function to call backend
async function signup() {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  try {
    // Call backend via auth store
    await auth.register(name.value, emailAddress.value, password.value);

    if (auth.isLoggedIn) {
      router.push("/"); // Redirect to Home if registration successful
      alert("Registration successful!");
    } else {
      console.log("Registration failed");
      alert("Registration failed");
    }
  } catch (err) {
    console.error("Registration failed", err.response?.data || err);
    alert("Registration failed: " + (err.response?.data?.message || err.message));
  }
}
</script>

<template>
  <v-container align="center">
    <v-row>
      <v-col>
        <v-card class="pa-6" width="600" color="teal">
          <v-card-title>Sign Up</v-card-title>

          <!-- Name -->
          <v-text-field
            v-model="name"
            label="Name"
            :rules="[(v) => !!v || 'Name is required']"
          />

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

          <!-- Confirm Password -->
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
            required
          />

          <!-- Link + Button -->
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
