<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { loginFunction } from '@/services/directus.js';


export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        await loginFunction(this.email, this.password);
        this.$router.push('/dashboard'); // Redirect after login
      } catch (error) {
        this.errorMessage = 'Invalid login credentials';
        console.log(error)
      }
    },
  },
};
</script>
