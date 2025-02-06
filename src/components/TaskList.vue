<template>
  <div>
    <h2>Task List</h2>
    <div v-if="loading">Loading tasks...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="task in task" :key="task.id">
        <strong>{{ task.Title }}</strong> - {{ task.status }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getTaskList } from '../services/directus';
import type { Tasks } from '../services/directus';

export default defineComponent({
  name: 'TaskList',
  props: {
    assignee: {
      type: String,
      required: true,
    },

  },
  setup(props) {
    const task = ref<Tasks[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    const loadTasks = async () => {
      try {
        task.value = await getTaskList(props.assignee);
      } catch (err) {
        error.value = 'Failed to load tasks';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(loadTasks);

    return { task, loading, error };
  },
});
</script>
