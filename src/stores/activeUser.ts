import {defineStore} from 'pinia'

export const useActiveUserStore = defineStore({
  id: 'activeUser',
  state: () => ({
    id : '',
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
    editable: false,
    isManager: false
  }),


})
