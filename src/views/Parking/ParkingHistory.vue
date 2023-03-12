<script setup>
import {useParking} from "@/stores/parking";
import {onBeforeUnmount, onMounted} from "vue";

const store = useParking()
function poll(callback) {
  return setInterval(callback, 3000);
}
const interval = poll(store.getParkingHistory)
onMounted(store.getParkingHistory)
onBeforeUnmount(() => clearInterval(interval))
</script>

<template>
  <div class="flex flex-col mx-auto md:w-96 w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">Parking History</h1>

    <div class="border-t h-[1px] my-6"></div>
    <div  v-for="parking in store.parkingHistory" :key="parking.id" class="mt-2 border-2 border-gray-300 shadow-gray-400 p-2">
      <h2 class="text-2xl font-bold uppercase">{{parking.vehicle.plate_number}}</h2>
      <span class="text-gray-400">{{parking.vehicle.description}}</span>
      <div class="bg-gray-200 p-2">
        {{parking.zone.name}}
      </div>
      <div class="uppercase text-2xl font-bold">from</div>
      <div>
        {{parking.start_time}}
      </div>
      <div class="uppercase text-2xl font-bold">to</div>
      <div>
        {{parking.stop_time}}
      </div>
      <div class="text-blue-600 font-bold text-xl text-left">
        <div class="float-right">
          {{(parking.total_price / 100).toFixed(2)}} <sup>&epsi;</sup>
        </div>
      </div>
      <RouterLink
          class="btn btn-secondary block text-center clear-both"
          :to="{name: 'parking.history-detail', params: {id: parking.id}}"
      >
        View details
      </RouterLink>
    </div>
  </div>
</template>