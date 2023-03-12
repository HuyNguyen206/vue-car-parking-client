<script setup>
import {useParking} from "@/stores/parking";
import {onBeforeUnmount, onMounted} from "vue";
import ParkingActiveDetail from "@/views/Parking/ParkingActiveDetail.vue";


const store = useParking()
function poll(callback) {
  return setInterval(callback, 3000);
}
const interval = poll(store.getActiveParkings)
onMounted(store.getActiveParkings)
onBeforeUnmount(() => clearInterval(interval))
</script>

<template>
  <div class="flex flex-col mx-auto md:w-96 w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">Active parkings</h1>

    <RouterLink
        :to="{ name: 'parking.start' }"
        class="btn btn-primary w-full"
    >
      Order parking
    </RouterLink>

    <div class="border-t h-[1px] my-6"></div>

    <ParkingActiveDetail @stoppedParking="store.getActiveParkings()" v-for="parking in store.activeParkings" :key="parking.id" :parking="parking"></ParkingActiveDetail>
  </div>
</template>