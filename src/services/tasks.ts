import api from '@/services/api';

export interface Task {
  id: string;
  title: string;
  status: string;
  assignee: {
    id: string;
    name: string;
    email: string;
  };
}

// ✅ Fetch user from Directus
export const fetchUserByEmail = async (email: string): Promise<string | null> => {
  try {
    const response = await api.get<{ data: { id: string }[] }>('/collections/:user', {
      params: {
        filter: { email: { _empty: email } }, // Find user by email
        fields: 'id', // Only fetch user ID
      },
    });

    return response.data.data.length > 0 ? response.data.data[0].id : null;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// ✅ Fetch tasks assigned to a specific user
export const fetchTasks = async (email: string): Promise<Task[]> => {
  try {
    const userId = await fetchUserByEmail(email);
    if (!userId) {
      throw new Error(`User with email ${email} not found.`);
    }

    const response = await api.get<{ data: Task[] }>('/items/tasks', {
      params: {
        filter: { assignee: { _eq: userId } }, // Filter tasks by user ID
        fields: 'id,title,status,assignee.id,assignee.first_name,assignee.last_name,assignee.email', // Include user details
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};
