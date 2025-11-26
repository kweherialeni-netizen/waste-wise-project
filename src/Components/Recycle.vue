<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const bottles = [
      {
        id: 1,
        name: "Sprite Energy Drink",
        desc: "Bottle available for recycling and points",
        img: "images/bottles/derrick-payton-s6xYsISI9Zk-unsplash.jpg"
      },
      {
        id: 2,
        name: "Coca-Cola",
        desc: "Bottle available for recycling",
        img: "images/bottles/easylife-designs-IJlyaf4q0_s-unsplash.jpg"
      },
      {
        id: 3,
        name: "Mountain Dew",
        desc: "Bottle available for recycling",
        img: "images/bottles/erik-mclean-5JdKoyIKWW4-unsplash.jpg"
      },
      {
        id: 4,
        name: "Wisers Beer",
        desc: "Bottle available for recycling",
        img: "images/bottles/shen-liu-J-UKLgHEotw-unsplash.jpg"
      },
      {
        id: 5,
        name: "Pepsi",
        desc: "Bottle available for recycling",
        img: "public/images/nikhil-82LJQZGwW5o-unsplash.jpg"
      }
    ]

    // Navigation function (click card → go to details page)
    function openDetails(id) {
      router.push(`/bottle/${id}`)
    }

    return { bottles, openDetails }
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

          <v-card-text class="white--text">
            {{ bottle.desc }}
          </v-card-text>
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
  box-shadow: 0px 8px 2
}
</style>