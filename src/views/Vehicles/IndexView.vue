<script setup>
import {onMounted} from "vue";
import {useVehicle} from "@/stores/vehicles";
import LoadingCircle from "@/components/LoadingCircle.vue";

const store = useVehicle()
onMounted(store.getlistVehicles)
console.log(store.vehicleList)
</script>
<template>
  <div class="flex flex-col justify-center md:w-96 w-full mx-auto">
    <h1 class="font-bold text-xl text-center">
      My vehicles
    </h1>
    <RouterLink
        type="submit"
        class="router-link btn btn-primary text-white mt-2 hover:no-underline"
        :to="{name: 'vehicles.create'}"
    >
      Add vehicles
    </RouterLink>
    <div class="border-t h-[1px] my-6"></div>
    <div v-if="store.isLoadingVehicleList" class="bg-gray-500 p-2 text-center mx-auto">
      <LoadingCircle/>
    </div>
    <div v-else>
      <ul v-if="store.vehicleList">
        <li v-for="vehicle in store.vehicleList" :key="vehicle.id"
            class="flex justify-between items-center mt-2 p-2 bg-gray-100 rounded">
          <div>
            <span class="plate mr-4">{{ vehicle.plate_number }}</span>
            <span>{{ vehicle.description }}</span>
          </div>
          <div class="flex">
            <RouterLink :to="{name: 'vehicles.edit', params:{id: vehicle.id}}" class="btn btn-primary mr-2">Edit
            </RouterLink>
            <button class="btn btn-danger" @click.prevent="store.deleteVehicle(vehicle.id)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </li>
      </ul>
      <span v-else>There aren't vehicle yet</span>
    </div>
  </div>
</template>

<style scoped></style>
