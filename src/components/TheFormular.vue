<script setup lang="ts">
import { computed, ref } from 'vue'
import TheButton from '@/components/TheButton.vue'
import { getWeatherByCity, type WeatherData } from '@/composables/getWeatherByCity.ts'
import TheDialogWindow from '@/components/TheDialogWindow.vue'
import TheWeatherCard from '@/components/TheWeatherCard.vue'
import { citiesData } from '@/data/citiesData.ts'

const mesto = ref('')
const pocasieData = ref<WeatherData | string>('')
const showAlert = ref(false)
const showWeatherCard = ref(false)
const showForm = ref(true)
const cities = ref(removeDuplicates(citiesData().data))
const openSuggestionBox = ref(false)

function removeDuplicates(arr: string[]) {
  return [...new Set(arr)]
}

const submitForm = async () => {
  if (!mesto.value) {
    showAlert.value = true
    document.getElementById('cityTextField')?.classList.add('inputBorderError')
    return
  }
  showWeatherCard.value = false
  const { data: pocasieResponse } = await getWeatherByCity(mesto.value)
  pocasieData.value = pocasieResponse

  const okCity = document.getElementById('cityTextField')
  if (okCity && typeof pocasieData.value !== 'string') {
    okCity.classList.remove('inputBorderError')
    okCity.classList.add('inputBorderOk')
    showWeatherCard.value = true
    showForm.value = false
  }
}

const clearMesto = () => {
  mesto.value = ''
}

const computedFilteredCities = computed(() => {
  if (!mesto.value) return []
  return cities.value.filter((city) => city.toLowerCase().includes(mesto.value.toLowerCase()))
})

const selectCity = (city: string) => {
  mesto.value = city
  openSuggestionBox.value = false
}
</script>

<template>
  <TheDialogWindow
    alert-message="Nezadali ste mesto do vyhľadávacieho poľa ..."
    :show-alert="showAlert"
    @closeDialogWindow="(n) => (showAlert = n)"
  />

  <div class="centerForm">
    <div class="mainHeader">
      <h1>Aktuálne počasie v mestách</h1>
    </div>
    <div v-if="showWeatherCard && typeof pocasieData === 'object'">
      <TheWeatherCard
        :data="pocasieData"
        @closeWeatherCard="
          (n) => {
            showWeatherCard = n
            showForm = true
          }
        "
      />
    </div>
    <form v-if="showForm" @submit.prevent="submitForm" autocomplete="off">
      <div v-if="typeof pocasieData === 'string'">
        <h1>{{ pocasieData }}</h1>
      </div>
      <div v-else>
        <h1></h1>
      </div>
      <div class="inputWithX">
        <input
          autofocus
          type="text"
          id="cityTextField"
          name="mesto"
          v-model="mesto"
          @click="openSuggestionBox = true"
          placeholder="Zadaj mesto ..."
        />
        <span class="xIcon" @click="clearMesto">&#x2715;</span>
        <ul v-if="computedFilteredCities.length > 0 && openSuggestionBox" class="autocomplete-list">
          <li
            v-for="city in computedFilteredCities"
            :key="city"
            @mousedown.prevent="selectCity(city)"
          >
            {{ city }}
          </li>
        </ul>
      </div>
      <TheButton id="SendBtn" msg="Odoslať" @keyup.enter="submitForm" type="submit" />
    </form>
  </div>
</template>

<style scoped>
.mainHeader {
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  color: white;
  padding: 20px 0;
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
  font-size: 24px;
}
.centerForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  background-image: url('src/assets/9011110.jpg');
  background-size: cover;
  background-position: center;
}

form {
  padding: 20px;
  width: 320px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.inputBorderOk {
  border: 2px solid #4caf50;
}

.inputBorderError {
  border: 2px solid #f44336;
}

.inputWithX {
  position: relative;
  display: inline-block;
  width: 100%;
}

.xIcon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-weight: bold;
  color: #999;
}

input {
  width: 100%;
  padding: 12px 40px 12px 10px;
  font-size: 16px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #4caf50;
}

input[type='submit'] {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background: linear-gradient(to right, #4caf50, #81c784);
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

input[type='submit']:hover {
  background: linear-gradient(to right, #388e3c, #66bb6a);
}

.autocomplete-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
  width: 100%;
  position: absolute;
  z-index: 1000;
  top: 100%;
  left: 0;
}

.autocomplete-list li {
  padding: 10px;
  cursor: pointer;
}

.autocomplete-list li:hover {
  background-color: #f0f0f0;
}
</style>
