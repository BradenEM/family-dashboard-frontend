import {defineStore} from 'pinia'
import type {User} from '@/services/directus'

export const useActiveUserStore = defineStore({
  id: 'activeUser',
  state: () => ({
    user: null as User | null
  }),
  actions: {
    setUser(user: User) {
      this.user = user
    },
    clearUser() {
      this.user = null
    }
  }
})
