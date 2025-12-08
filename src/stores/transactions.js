import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTransactionsStore = defineStore('transactions', () => {
  const transactions = ref([
    { id: 1, employee: 'Alice Johnson', bottle: 'Sprite Bottle', points: 5, date: '2025-12-02' },
    { id: 2, employee: 'Bob Smith', bottle: 'Mountain Dew Bottle', points: 8, date: '2025-12-02' }
  ])

  return {
    transactions
  }
})
