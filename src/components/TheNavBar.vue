<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const router = useRouter()
const currentRoute = ref(router.currentRoute.value.fullPath)

watch(router.currentRoute, (newRoute) => {
  currentRoute.value = newRoute.path
})
</script>

<template>
  <div>
    <ul>
      <li
        v-for="page in router.getRoutes()"
        :key="page.path"
        :class="[currentRoute === page.path ? 'active' : '']"
      >
        <router-link :to="page.path">{{ page.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #8e24b6;
}

.active {
  background-color: #af35e0;
}
</style>
