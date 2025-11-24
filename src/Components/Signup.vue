<script setup>

import {ref} from 'vue'

// models ref=refrence null means it is empty by default
const name=ref(null)
const emailAddress=ref(null)
const phoneNumber=ref(null)
const deliveryAddress=ref(null)
const password=ref(null)

// user interface models
const showPassword=ref(false)
const showConfirmPassword=ref(false)


function signup(){
    const signUpData ={
    'name':name.value,
     'email':emailAddress.value,
      'phone':phoneNumber.value,
       'deliveryAddress':deliveryAddress.value,
        'password':password.value,
}
try{
    // save data on browser
    localStorage.setItem(
        "signUpData",
        JSON.stringify(signUpData)

    );
    // to do send data to backend
} catch (err) {
    console.error('sign up process failed',err)
}
}

</script>

<template>
<v-container align="center">
    <v-row>
        <v-col>
            <v-card class="pa-6" width="600" color="teal">
<v-card-title>Sign up</v-card-title>
<v-text-field v-model="name" label="Name" :rules="[(v) => !!v || 'Name is required']"></v-text-field>
<v-text-field v-model="emailAddress" label="Email Address"   :rules="[
                            (v) => !!v || 'Email is required',
                            (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
                        ]">
                        </v-text-field>



<v-text-field v-model="password" label="Password"  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                        :rules="[
                            (v) => !!v || 'Password is required',
                            (v) => v.length >= 8 || 'Password must be at least 8 characters',
                        ]"
                        required ></v-text-field>
                    
<v-text-field  label="Confirm Password"       :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showConfirmPassword ? 'text' : 'password'"
                        @click:append="showConfirmPassword = !showConfirmPassword"
                        :rules="[
                            (v) => !!v || 'Please confirm your password',
                            (v) => v === password || 'Passwords must match',
                        ]"
                        required></v-text-field>
<v-card-text>Already registered
    <router-link to="/Login">Back to Login</router-link>
    <v-card-actions>
         <v-btn color="white" variant="elevated" @click="signup()">Sign Up</v-btn> 
    </v-card-actions>
</v-card-text>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>