<template>
  <div>
    <div class="flex flex-row">
      <div class="w-100">
        <PrimeSelect v-model="selectedUser1" :options="users" optionLabel="Name" optionValue="id" />
        <TaskList :assignee="String(selectedUser1)" v-if="selectedUser1" />
        <div v-if="!editMode1">
          <PrimeButton v-if="selectedUser1" type="button" @click="editToggle1">+</PrimeButton>
        </div>
        <div v-else>
          <input type="text" v-model="newTaskTitle" />
          <PrimeButton v-if="selectedUser1" type="button" @click="newTask(newTaskTitle, Number(selectedUser1))">Submit
          </PrimeButton>
        </div>
      </div>
      <div class="w-100">
        <PrimeSelect v-model="selectedUser2" :options="users" optionLabel="Name" optionValue="id" />
        <TaskList :assignee="String(selectedUser2)" v-if="selectedUser2" />
        <div v-if="!editMode2">
          <PrimeButton v-if="selectedUser2" type="button" @click="editToggle2">+</PrimeButton>
        </div>
        <div v-else>
          <input type="text" v-model="newTaskTitle" />
          <PrimeButton v-if="selectedUser2" type="button" @click="newTask(newTaskTitle, Number(selectedUser2))">Submit
          </PrimeButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TaskList from '@/components/TaskList.vue';
import { getUserList, addTask } from '@/services/directus';
import type { UserList } from '@/services/directus';
import PrimeSelect from 'primevue/select';
import PrimeButton from 'primevue/button';

const users = ref<UserList[]>([]);
const error = ref<string | null>(null);
const selectedUser1 = ref<string | null>(null);
const selectedUser2 = ref<string | null>(null);
const editMode1 = ref<boolean>(false);
const editMode2 = ref<boolean>(false);
const newTaskTitle = ref<string>('');

const loadUsers = async () => {
  try {
    users.value = await getUserList();
  } catch (err) {
    error.value = 'Failed to load users';
    console.error(err);
  }
};

const newTask = async (title: string, selectedUser: number) => {
  try {
    await addTask(title, selectedUser);
    editToggle1();
    editToggle2();
  } catch (error) {
    console.error("Failed to add task: ", error);

  }
};

const editToggle1 = () => {
  editMode1.value = !editMode1.value;
};
const editToggle2 = () => {
  editMode2.value = !editMode2.value;
};
onMounted(loadUsers);



</script>
