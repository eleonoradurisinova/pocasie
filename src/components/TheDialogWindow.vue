<script setup lang="ts">
import TheButton from '@/components/TheButton.vue'

const props = defineProps<{ alertMessage: string; showAlert: boolean }>()
const emit = defineEmits<{ closeDialogWindow: [n: boolean] }>()

const closeAlert = () => {
  return emit('closeDialogWindow', false)
}
</script>

<template>
  <div v-if="props.showAlert" class="custom-alert">
    <div class="custom-alert-content">
      <h2>{{ props.alertMessage }}</h2>
      <TheButton id="closeAlertWindow" msg="Zavrieť" @click="closeAlert()" />
    </div>
  </div>
</template>

<style scoped>
.custom-alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}
.custom-alert-content {
  background-color: #fff;
  padding: 40px;
  border-radius: 5px;
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
