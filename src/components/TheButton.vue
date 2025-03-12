<script setup lang="ts">
const props = defineProps<{
  msg: string
}>()
</script>

<template>
  <button type="button">{{ props.msg }}</button>
</template>

<style scoped>
button {
  width: 120px;
  font-size: 15px;
  height: 50px;
  background-color: #af35e0;
  color: #ffffff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>
