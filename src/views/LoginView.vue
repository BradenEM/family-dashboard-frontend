<template>
  <div class="content-center">
    <div>
      <h1 class="content-center text-7xl p-20">Mason Family Dashboard</h1>
    </div>
    <form @submit.prevent="handleLogin" class="flex flex-col items-center justify-center">
      <div class="content-center">
        <InputGroup class="pb-6">
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <FloatLabel variant="in">
            <InputText v-model="email" type="email" id="in_label" required />
            <label for="in_label">Email</label>
          </FloatLabel>
        </InputGroup>
      </div>
      <div class="content-center">
        <InputGroup class="pb-6">
          <InputGroupAddon>
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <FloatLabel variant="in">
            <InputText v-model="password" type="password" id="in_label" required />
            <label for="in_label">Password</label>
          </FloatLabel>
        </InputGroup>
      </div>
      <div class="flex flex-col justify-between w-50">
        <PrimeButton type="submit">Login</PrimeButton>
      </div>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { loginFunction, logoutFunction } from '@/services/directus.js';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import PrimeButton from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';

export default defineComponent({
  name: 'LoginView',
  components: { InputGroup, InputGroupAddon, PrimeButton, InputText, FloatLabel },
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
    async handleLogout() {
      try {
        await logoutFunction();
        this.$router.push('/login'); // Redirect after logout
      } catch (error) {
        console.log(error)
      }
    },
  },
});
</script>
