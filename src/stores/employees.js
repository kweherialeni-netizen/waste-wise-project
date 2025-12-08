import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEmployeesStore = defineStore('employees', () => {
  const employees = ref([
    { id: 1, name: 'Alice Johnson', role: 'Cashier', points: 50, active: true },
    { id: 2, name: 'Bob Smith', role: 'Supervisor', points: 120, active: true }
  ])

  function addEmployee(emp) {
    employees.value.push({
      id: employees.value.length + 1,
      name: emp.name,
      role: emp.role,
      points: 0,
      active: true
    })
  }

  function toggleEmployee(emp) {
    emp.active = !emp.active
  }

  return {
    employees,
    addEmployee,
    toggleEmployee
  }
})
