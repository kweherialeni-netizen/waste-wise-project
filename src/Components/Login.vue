<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const emailAddress = ref(null);
const password = ref(null);
const showPassword = ref(false);

const router = useRouter();

function login() {
  try {
    let user = JSON.parse(localStorage.getItem("signUpData"));

    if (
      user &&
      emailAddress.value === user.email &&
      password.value === user.password
    ) {
      localStorage.setItem("isLoggedIn", true);
      router.push("/");
    } else {
      console.log("Invalid credentials");
    }
  } catch (err) {
    console.error("Login process failed", err);
  }
}
</script>

<template>
  <v-container align="center">
    <v-row>
      <v-col>
        <v-card class="pa-6" width="600" color="teal">
          <v-card-title>Log in</v-card-title>

          <v-text-field
            v-model="emailAddress"
            label="Email Address"
            :rules="[
              (v) => !!v || 'Email is required',
              (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
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
              (v) => v.length >= 8 || 'Password must be at least 8 characters',
            ]"
            required
          />
          <v-text-field  label="Confirm Password"       :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showConfirmPassword ? 'text' : 'password'"
                        @click:append="showConfirmPassword = !showConfirmPassword"
                        :rules="[
                            (v) => !!v || 'Please confirm your password',
                            (v) => v === password || 'Passwords must match',
                        ]"
                        required></v-text-field>

          <v-card-text>
            Do not have an account?
            <router-link to="/signUp">Sign up</router-link>
          </v-card-text>

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
