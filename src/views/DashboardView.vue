<template>
  <div>
    <div class="flex flex-row">
      <div>
        <PrimeSelect v-model="selectedUser1" :options="users" optionLabel="Name" optionValue="id" />
        <TaskList :assignee="String(selectedUser1)" v-if="selectedUser1" />
      </div>
      <div>
        <PrimeSelect v-model="selectedUser2" :options="users" optionLabel="Name" optionValue="id" />
        <TaskList :assignee="String(selectedUser2)" v-if="selectedUser2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TaskList from '@/components/TaskList.vue';
import { getUserList } from '@/services/directus';
import type { UserList } from '@/services/directus';
import PrimeSelect from 'primevue/select';

const users = ref<UserList[]>([]);
const error = ref<string | null>(null);
const selectedUser1 = ref<string | null>(null);
const selectedUser2 = ref<string | null>(null);

const loadUsers = async () => {
  try {
    users.value = await getUserList();
  } catch (err) {
    error.value = 'Failed to load users';
    console.error(err);
  }
};
onMounted(loadUsers);



</script>
