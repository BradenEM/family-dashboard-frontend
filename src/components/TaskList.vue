<template>
  <div>
    <div v-if="loading">Loading tasks...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <img class="profile" v-if="user" :src="url + user.avatar" />
      <li v-for="task in tasks" :key="task.id">
        <strong>{{ task.Title }}</strong> - {{ task.status }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { getTaskList, getUser } from '../services/directus';
import type { User, Task } from '../services/directus';
// import type { UUID } from 'crypto';

const url = import.meta.env.VITE_DIRECTUS_URL + '/assets/';


const props = defineProps<{
  assignee: string;
}>();
const tasks = ref<Task[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const user = ref<User>();



const loadTasks = async () => {
  try {
    tasks.value = await getTaskList(props.assignee);
    console.log(tasks)
  } catch (err) {
    error.value = 'Failed to load tasks';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const loadUser = async () => {
  try {
    user.value = await getUser(props.assignee);
    console.log(user)
  } catch (error) {
    console.error("Failed to load user: ", error);
  }
}



onMounted(loadTasks);
onMounted(loadUser);

watchEffect(async () => {
  if (props.assignee) {
    loading.value = true;
    await loadUser();
    await loadTasks();
  }
});

</script>
