<template>
  <v-container fluid class="d-flex align-center justify-center login-page" style="height: 100vh">
    <v-card class="pa-6" width="400">
      <v-card-title class="text-center"> Login </v-card-title>
      <v-card-text>
        <v-form ref="loginForm" v-model="valid">
          <v-text-field label="Email" type="email" v-model="email"  :rules="emailRule"> </v-text-field>
          <v-text-field label="Password" type="password" v-model="password"  :rules="passwordRule"> </v-text-field>
          <v-btn
            :disabled="!valid"
            color="primary"
            class="mt-4"
            block
            @click="submitForm"
          >
            Login
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { noteAppStore } from '@/main';
import { useRouter } from 'vue-router';

const store =    noteAppStore()

const route = useRouter();

const valid = ref(false);
const email = ref('');
const password = ref('')
const loginForm = ref(null)

const emailRule = [ 
(v) => (!!v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) || 'A valid email is required'

]

const passwordRule = [
(v) => (!!v && v.length >= 8 && /[A-Z]/.test(v) && /[0-9]/.test(v)) || 'Password must be at least 8 characters long and contain at least one uppercase letter and one number'
]

const submitForm = () => {
        const loginData = {
            email: email.value
        }
        store.submitLoginForm(loginData)
        route.push('/create')
        
}

</script>

<style lang="css">
.login-page{
    background: #083e69;
}
</style>
