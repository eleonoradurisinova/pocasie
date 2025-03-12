<script setup lang="ts">
import ArrowBack from '@/components/icons/ArrowBack.vue'
import type { WeatherData } from '@/composables/getWeatherByCity.ts'
import { weatherIconsConfig } from '@/config/weatherIconsConfig.ts'
import { onMounted, ref } from 'vue'
import TheButton from '@/components/TheButton.vue'
import { saveWeatherToDB } from '@/composables/postSaveWeatherToDB.ts'
import TheDialogWindow from '@/components/TheDialogWindow.vue'
const props = defineProps<{ data: WeatherData }>()
defineEmits<{ closeWeatherCard: [n: boolean] }>()

const iconPicture = ref<string>('')
const loading = ref<boolean>(true)
const status = ref()
const showAlert = ref<boolean>(false)
const findIcon = (iconId: string) => {
  const icon = weatherIconsConfig().find((item) => item.id === iconId)
  return icon ? new URL('./icons/' + icon.icon, import.meta.url).href : ''
}

onMounted(() => {
  iconPicture.value = findIcon(props.data.weather[0].icon)
  loading.value = false
})

const saveWeather = async () => {
  status.value = await saveWeatherToDB(props.data)
  status.value = status.value.status
  showAlert.value = true
}
</script>

<template>
  <div class="container">
    <div class="weatherCard">
      <div class="centerBackText">
        <button
          class="centerBackText"
          @click="$emit('closeWeatherCard', false)"
          style="border: none; background-color: white; cursor: pointer"
        >
          <ArrowBack></ArrowBack>
          <span style="margin-left: 10px">Späť</span>
        </button>
      </div>
      <div class="line"></div>
      <div class="containerColumn">
        <img :src="iconPicture" alt="weatherIcon" />
        <span class="temperature">{{ Math.round(props.data.main.temp) }} &deg;C</span>
        <span
          >min/max: {{ Math.round(props.data.main.temp_min) }} /
          {{ Math.round(props.data.main.temp_max) }} &deg;C</span
        >
        <span class="text">{{
          props.data.weather[0].description.charAt(0).toUpperCase() +
          props.data.weather[0].description.slice(1)
        }}</span>
        <span class="text"
          ><img
            style="width: 24px; height: 24px; object-fit: cover; margin-right: 5px"
            src="./icons/location.png"
            alt="location"
          />{{ props.data.name }}, {{ props.data.sys.country }}
        </span>
      </div>
      <div class="container">
        <TheButton id="button" msg="Uložiť vyhľadávanie" @click="saveWeather"></TheButton>
        <TheDialogWindow
          alert-message="Uloženie prebehlo úspešne"
          :show-alert="showAlert"
          @closeDialogWindow="(n) => (showAlert = n)"
        ></TheDialogWindow>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.containerColumn {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.temperature {
  font-size: 50px;
  font-family: 'Open Sans', fantasy;
  font-weight: 600;
  margin-top: 20px;
}
.text {
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
}

.weatherCard {
  margin-top: 150px;
  width: 350px;
  height: 500px;
  background-color: #ffffff;
  border-radius: 10px;
}
.centerBackText {
  display: flex;
  align-items: center;
  margin: 10px;
  font-family: 'Open Sans', fantasy;
}
.centerBackText > button {
  margin-left: 10px;
  color: #af35e0;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #cfcfcf;
}
button {
  margin-top: 30px;
}
</style>
