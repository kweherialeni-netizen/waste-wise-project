import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  const auth = useAuthStore()

  // Fetch all users (for admin)
  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get('http://localhost:8000/api/users', {
        headers: { Authorization: `Bearer ${auth.token}` }
      })
      users.value = res.data.data || []
    } catch (err) {
      console.error('Failed to fetch users:', err)
      error.value = 'Failed to load users.'
    } finally {
      loading.value = false
    }
  }

  // Optionally: Add a new user
  const addUser = async (userData) => {
    try {
      const res = await axios.post('http://localhost:8000/api/users', userData, {
        headers: { Authorization: `Bearer ${auth.token}` }
      })
      users.value.unshift(res.data.data)
    } catch (err) {
      console.error('Failed to add user:', err)
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser
  }
})
