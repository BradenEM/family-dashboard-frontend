<template>
  <div>
    <h1>Dashboard</h1>
    <PrimeSelect v-model="users.values" :options="Name" optionLabel="name" />
    <TaskList :assignee="String(users.values.name)" v-if="users" />
    <h2>User2</h2>
    <TaskList :assignee="String(2)" />
    <h1 v-for="user in users" :key="user.id">{{ user.Name }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import TaskList from '@/components/TaskList.vue';
import { getUserList } from '@/services/directus';
import type { UserList } from '@/services/directus';
import PrimeSelect from 'primevue/select';





export default defineComponent({
  name: 'DashboardView',
  components: { TaskList, PrimeSelect },
  data() {
    return {
      assignee: '',
      users: [],
    };
  },
  setup() {
    const users = ref<UserList[]>([]);
    const error = ref<string | null>(null);

    const loadUsers = async () => {
      try {
        users.value = await getUserList();
        console.log(users.value[0]);
      } catch (err) {
        error.value = 'Failed to load users';
        console.error(err);
      }
    };
    onMounted(loadUsers);

    return { error };
  },
});
</script>
