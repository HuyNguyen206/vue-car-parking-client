<script setup>
import {ref} from "vue";

const props = defineProps(['parking'])
const isStopping = ref(false)
const emit = defineEmits(['stoppedParking'])
async function stopParking(parkingId) {
  if (isStopping.value) {
    return
  }

  isStopping.value = true

  return window.axios
      .put(`parkings/stop/${parkingId}`)
      .then(() => {
        emit('stoppedParking')
      })
      .catch((res) => {
        // if (res.response.status == 422) {
        //   errors.value = res.response.data.errors
        // }
        alert(res.response.status)
      })
}

</script>

<template>
  <div class="mt-2 border-2 border-gray-300 shadow-gray-400 p-2">
    <h2 class="text-2xl font-bold uppercase">{{props.parking.vehicle.plate_number}}</h2>
    <span class="text-gray-400">{{props.parking.vehicle.description}}</span>
    <div class="bg-gray-200 p-2">
      {{props.parking.zone.name}}
    </div>
    <div class="uppercase text-2xl font-bold">from</div>
    <div>
      {{props.parking.start_time}}
    </div>
    <div class="text-blue-600 font-bold text-xl">
      {{(props.parking.total_price / 100).toFixed(2)}} <sup>&epsi;</sup>
    </div>
    <button
        @click.prevent="stopParking(props.parking.id)"
        class="btn btn-danger float-right"

        :class="[isStopping ? 'cursor-not-allowed' : '']"
    >
      <div v-if="isStopping" class="flex space-x-4 items-center">
        <LoadingCircle />
        <span class="inline-block"> Processing... </span>
      </div>
      <div v-else>Stop</div>
    </button>
  </div>
</template>

<style scoped>

</style>