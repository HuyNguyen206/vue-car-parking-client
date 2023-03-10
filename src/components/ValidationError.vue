<template>
  <span v-if="props.errors.value?.[props.field]" class="mt-2 text-red-600"> {{props.errors.value?.[props.field][0]}}</span>
</template>

<script setup>
const props = defineProps(['errors', 'field'])
</script>

<style scoped>

</style>