<script setup>
import {onBeforeUnmount} from 'vue'
import ValidationError from '@/components/ValidationError.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import {useParking} from "@/stores/parking";
import {useVehicle} from "@/stores/vehicles";

const store = useParking()
const storeVehicle = useVehicle()
onBeforeUnmount(store.resetForm)

storeVehicle.getlistVehicles().then((response) => {
  if (response?.data.length > 0) {
    console.log(response)
    store.form.vehicle_id = response.data.data.data[0].id;
  }
});

store.getZoneList().then((response) => {
  if (response?.data.length > 0) {
    console.log(response)
    store.form.zone_id = response.data.data.data[0].id;
  }
});
</script>

<template>
  <form @submit.prevent="store.handleSubmit" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Order parking</h1>
      <div
          v-if="store.message"
          class="border-green-500 p-2 text-green-500 bg-green-200 font-semibold"
      >
        {{ store.message }}
      </div>
      <div class="flex flex-col gap-2 mb-4 mt-2">
        <label for="vehicle_id" class="required">Vehicle</label>
        <select :disabled="store.isLoading"
                id="vehicle_id"
                name="vehicle_id"
                v-model="store.form.vehicle_id"
                class="form-input plate"
                autocomplete="vehicle_id"
                required>
          <option value="">Select vehicle</option>
          <option :value="vehicle.id" v-for="vehicle in storeVehicle.vehicleList" :key="vehicle.id">
            {{vehicle.plate_number.toUpperCase()}} ({{vehicle.description}})
          </option>
        </select>
        <ValidationError :errors="store.errors" field="vehicle_id"></ValidationError>
      </div>

      <div class="flex flex-col gap-2 mb-4 mt-2">
        <label for="zone_id" class="required">Zone</label>
        <select :disabled="store.isLoading"
                id="zone_id"
                name="zone_id"
                v-model="store.form.zone_id"
                class="form-input plate"
                autocomplete="zone_id"
                required>
          <option value="">Select Zone</option>
          <option :value="zone.id" v-for="zone in store.zoneList" :key="zone.id">
            {{zone.name}} ({{ (zone.price_per_hour / 100).toFixed(2) }} &euro;/h)
          </option>
        </select>
        <ValidationError :errors="store.errors" field="zone_id"></ValidationError>
      </div>

      <ValidationError :errors="store.errors" field="general" />

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex space-x-2">
        <button
            type="submit"
            class="btn btn-primary w-3/4"
            :class="[store.isLoading ? 'cursor-not-allowed' : '']"
        >
          <div v-if="store.isLoading" class="flex space-x-4 items-center">
            <LoadingCircle />
            <span class="inline-block"> Processing... </span>
          </div>
          <div v-else>Start parking</div>
        </button>
        <RouterLink :to="{ name: 'parking.index' }" v-slot="{ navigate }">
          <button
              @click="navigate"
              :disabled="store.isLoading"
              class="btn btn-secondary"
          >
            Cancel
          </button>
        </RouterLink>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
