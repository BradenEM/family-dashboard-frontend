<template>
  <div>
    <form @submit.prevent="handleLogin">
      <InputGroup class="pb-5">
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText v-model="email" type="email" placeholder="Email" required />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-lock"></i>
        </InputGroupAddon>
        <InputText v-model="password" type="password" placeholder="Password" required />
      </InputGroup>
      <PrimeButton type="submit">Login</PrimeButton>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { loginFunction } from '@/services/directus.js';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import PrimeButton from 'primevue/button';
import InputText from 'primevue/inputtext';

export default defineComponent({
  name: 'LoginView',
  components: { InputGroup, InputGroupAddon, PrimeButton, InputText },
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
});
</script>
