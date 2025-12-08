import { defineStore } from 'pinia'
import api from '@/services/api' // your axios instance

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    // Login user
    async login(email, password) {
      try {
        const response = await api.post('/login', { email, password })
        this.user = response.data.user
        this.token = response.data.token

        // Persist data
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('token', this.token)
      } catch (error) {
        console.error('Login failed:', error.response?.data || error)
        throw error
      }
    },

    // Register user with password confirmation
    async register(name, email, password, password_confirmation = null) {
      try {
        const response = await api.post('/register', {
          name,
          email,
          password,
          password_confirmation: password_confirmation || password, // auto-match if not provided
        })

        this.user = response.data.user
        this.token = response.data.token

        // Persist data
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('token', this.token)
      } catch (error) {
        console.error('Registration failed:', error.response?.data || error)
        throw error
      }
    },

    // Logout user
    async logout() {
      try {
        await api.post('/logout')
      } catch (error) {
        console.warn('Logout error:', error.response?.data || error)
      }

      this.user = null
      this.token = null

      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
  },
})
