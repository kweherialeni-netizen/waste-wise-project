<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const router = useRouter()
    const bottles = ref([])
    const loading = ref(true)

    // Fetch bottles from backend
    const fetchBottles = async () => {
      loading.value = true
      try {
        const response = await axios.get('http://localhost:8000/api/items')
        bottles.value = response.data.data  // backend returns {data: [...]}
      } catch (err) {
        console.error('Failed to fetch bottles:', err)
      } finally {
        loading.value = false
      }
    }

    // Navigate to bottle details page
    const openDetails = (id) => {
      if (!id) return
      router.push(`/bottle_details/${id}`)
    }

    onMounted(fetchBottles)

    return { bottles, openDetails, loading }
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="bottle in bottles"
        :key="bottle.id"
        md="4"
        class="d-flex"
      >
        <v-card
          color="teal"
          class="pa-2 hover-card"
          elevation="6"
          @click="openDetails(bottle.id)"
        >
          <v-img
            :src="bottle.img"
            height="200px"
            cover
          ></v-img>

          <v-card-title class="white--text">
            {{ bottle.name }}
          </v-card-title>

          <v-card-subtitle class="white--text">
            {{ bottle.type }} • {{ bottle.points }} Points
          </v-card-subtitle>

          <v-card-text class="white--text">
            {{ bottle.desc }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col>
        <v-card class="pa-4" elevation="6">
          Loading bottles...
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.hover-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-card:hover {
  transform: scale(1.03);
  box-shadow: 0px 8px 20px rgba(0,0,0,0.3);
}
</style>
