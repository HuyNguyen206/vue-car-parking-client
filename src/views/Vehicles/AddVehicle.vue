<script setup>
import {onBeforeUnmount} from 'vue'
import ValidationError from '@/components/ValidationError.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import {useVehicle} from "@/stores/vehicles";

const store = useVehicle()
onBeforeUnmount(store.resetForm)
</script>

<template>
  <form @submit.prevent="store.handleSubmit" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Add vehicle</h1>
      <div
        v-if="store.message"
        class="border-green-500 p-2 text-green-500 bg-green-200 font-semibold"
      >
        {{ store.message }}
      </div>
      <div class="flex flex-col gap-2 mb-4 mt-2">
        <label for="plate_number" class="required">License plate</label>
        <input
          :disabled="store.isLoading"
          id="plate_number"
          name="plate_number"
          v-model="store.form.plate_number"
          type="text"
          class="form-input plate"
          autocomplete="plate_number"
          required
        />
        <ValidationError :errors="store.errors" field="plate_number"></ValidationError>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="email" class="required">Description</label>
        <textarea
            rows="5"
          :disabled="store.isLoading"
          id="description"
          name="description"
          v-model="store.form.description"
          type="text"
          class="form-input"
          autocomplete="description"
          required
        />
        <ValidationError :errors="store.errors" field="description"></ValidationError>
      </div>

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
          <div v-else>Save vehicle</div>
        </button>
        <RouterLink
            class="btn btn-secondary w-1/4"
            :to="{name: 'vehicles.index'}"
        >
         Cancel
        </RouterLink>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
