<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  getWeatherDataFromDB,
  type WeatherData,
  type WeatherResponse,
} from '@/composables/getWeatherDataFromDB.ts'
import { deleteWeatherRecordFromDb } from '@/composables/deleteWeatherDataFromDB.ts'
import { convertDate } from '../composables/convertDate.ts'

const weatherData = ref<WeatherResponse>()
const paginationData = ref<WeatherData[]>([])
const currentPage = ref<number>(1)

const data = ref<WeatherData[]>()
const isLoading = ref<boolean>(true)
const itemsPerPage = 10
let pageCount: number

onMounted(async () => {
  weatherData.value = await getWeatherDataFromDB()
  if (weatherData.value) {
    data.value = sortDataByDate(weatherData.value.data)
  }
  pagination()
  displayPage(currentPage.value)
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})

const sortDataByDate = (data: WeatherData[]) => {
  return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

const deleteCity = async (id: number) => {
  await deleteWeatherRecordFromDb(id)
  if (paginationData.value) {
    paginationData.value = paginationData.value.filter((city) => city.id !== id)
  }
  if (data.value) {
    data.value = data.value.filter((city) => city.id !== id)
  }
  pagination()
}
function displayPage(page: number) {
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  if (data.value) {
    paginationData.value = data.value.slice(start, end)
  }
  pagination()
}
function pagination() {
  if (data.value) {
    pageCount = Math.ceil(data.value.length / itemsPerPage)
  }
}
function changePage(page: number) {
  currentPage.value = page
  displayPage(page)
}
</script>

<template>
  <div class="centerLoader">
    <div v-if="isLoading" class="lds-heart centerLoader"><div></div></div>

    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th>Mesto</th>
            <th>Teplota [&deg;C]</th>
            <th>Dátum</th>
            <th>Akcia</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="city in paginationData" :key="city.id">
            <td>{{ city.city }}</td>
            <td>{{ city.temperature }}</td>
            <td>
              {{ convertDate(city.date) }}
            </td>
            <td>
              <button class="closeButton" @click="deleteCity(city.id)">Vymazať</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <a
        v-for="n in pageCount"
        :key="n"
        :class="[n === currentPage ? 'active' : '']"
        @click="changePage(n)"
        >{{ n }}</a
      >
    </div>
  </div>
</template>

<style scoped>
.centerLoader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.table-container {
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
table {
  border-collapse: collapse;
  width: 30%;
  text-align: left;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
td,
th {
  border: none;
  padding: 12px 16px;
}
th {
  background: #af35e0;
  color: white;
  font-weight: bold;
}
tr {
  background-color: #b2b9ee;
  height: 40px;
  border-bottom: 1px solid #ccc;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
tr:hover {
  background-color: #42a7fd;
}
.closeButton {
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: #52b0fe;
  color: black;
  border: none;
  transition: background-color 0.3s;
}
.closeButton:hover {
  background-color: #ffa33e;
}
.pagination {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 10px 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
.pagination a {
  color: black;
  padding: 8px 16px;
  text-decoration: none;
  margin: 0 4px;
  border-radius: 4px;
  transition: background-color 0.3s;
}
.pagination a.active {
  background-color: #af35e0;
  color: white;
}
.pagination a:hover:not(.active) {
  background-color: #ddd;
}
.lds-heart,
.lds-heart div,
.lds-heart div:after,
.lds-heart div:before {
  box-sizing: border-box;
}
.lds-heart {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  transform: rotate(45deg);
  transform-origin: 40px 40px;
}
.lds-heart div {
  top: 28px;
  left: 28px;
  position: absolute;
  width: 32px;
  height: 32px;
  background: currentColor;
  animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}
.lds-heart div:after,
.lds-heart div:before {
  content: ' ';
  position: absolute;
  display: block;
  width: 32px;
  height: 32px;
  background: currentColor;
}
.lds-heart div:before {
  left: -24px;
  border-radius: 50% 0 0 50%;
}
.lds-heart div:after {
  top: -24px;
  border-radius: 50% 50% 0 0;
}
@keyframes lds-heart {
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>
