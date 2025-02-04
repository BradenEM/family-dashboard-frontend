<template>
  <div>
    <h1>Dashboard</h1>
    <h2>User1</h2>
    <TaskList :assignee="String(1)" />
    <h2>User2</h2>
    <TaskList :assignee="String(2)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskList from '@/components/TaskList.vue';


export default defineComponent({
  name: 'DashboardView',
  components: { TaskList },
  data() {
    return {
      assignee: '',
    };
  },
});
</script>
