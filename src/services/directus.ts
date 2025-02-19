import { createDirectus, authentication, rest, readMe, readItems,  createItem, readUsers, readUser } from '@directus/sdk';
import type { UUID } from 'crypto';

const directus_url = import.meta.env.VITE_DIRECTUS_URL;

export interface AuthResponse {
  access_token: string | null;
  refresh_token: string | null;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: UUID;
  editable: boolean;
  isManager: boolean;
}


// TODO: look into editing state in the declaration above.
// TODO: Need to really look at the types that are declared here. Not sure I'm doing it right but it works atm :)
// TODO: fix your collections in Directus
export interface Task {
  id: string;
  status: string;
  Assignee: UUID;
  Title: string;
}



const loginClient = createDirectus(directus_url).with(authentication('json')).with(rest()); // Replace with your Directus instance URL
const authenticatedClient = createDirectus(directus_url).with(authentication()).with(rest()); // Replace with your Directus instance URL


export const loginFunction = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const result = await loginClient.login(email, password);

    if (result.access_token) {
      localStorage.setItem('access_token', result.access_token);
    }
    if (result.refresh_token) {
      localStorage.setItem('refresh_token', result.refresh_token);
    }

    return result;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}


export const logoutFunction = async (): Promise<void> => {
  try {
    const result = await authenticatedClient.logout();


    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');


    return result;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
}

export const getCurrentUser = async (): Promise<User> => {
  try {
    const result = await authenticatedClient.request(readMe({ fields: ['*'] })) as User;

    return result;
  } catch (error) {
    console.error('Get current user failed:', error);
    throw error;
  }
}

export const getTaskList = async (assignee: string): Promise<Task[]> => {
  try {
    const result = await authenticatedClient.request(readItems('tasks', { filter: { Assignee: { _eq: assignee } } })) as Task[];
    return result;
  } catch (error) {
    console.error('Get task list failed:', error);
    throw error;
  }
}

export const getUserList = async (): Promise<User[]> => {
  try {
    const result = await authenticatedClient.request(readUsers({fields: ['*']})) as User[];
    return result;
  } catch (error) {
    console.error('Get user list failed:', error);
    throw error;
  }
}

export const getUser = async (userId: string): Promise<User> => {
  try {
    const result = await authenticatedClient.request(readUser(userId, { fields: ['*'] })) as User;
    return result;
  } catch (error) {
    console.error('Get user failed:', error);
    throw error;
  }
}



export const addTask = async (title: string, assignee: number): Promise<Task> => {
  try {
    const result = await authenticatedClient.request(createItem('Tasks', { Title: title, Assignee: assignee })) as Task;
    return result;
  } catch (error) {
    console.error('Add task failed:', error);
    throw error;
  }
}
