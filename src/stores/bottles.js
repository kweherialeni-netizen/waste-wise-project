import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBottlesStore = defineStore('bottles', () => {
  const bottles = ref([
    { id: 1, name: 'Sprite Bottle', type: 'metalic', points: 5, active: true },
    { id: 2, name: 'Mountain Dew Bottle', type: 'metalic', points: 8, active: true }
    
  ])

  function addBottle(b) {
    bottles.value.push({
      id: bottles.value.length + 1,
      name: b.name,
      type: b.type,
      points: b.points,
      active: true
    })
  }

  function toggleBottle(bottle) {
    bottle.active = !bottle.active
  }

  return {
    bottles,
    addBottle,
    toggleBottle
  }
})
