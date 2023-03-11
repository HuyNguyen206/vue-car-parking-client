<script setup>
import {onBeforeUnmount} from 'vue'
import ValidationError from '@/components/ValidationError.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import {usePassword} from "@/stores/password";

const store = usePassword()
onBeforeUnmount(store.resetForm)
</script>

<template>
  <form @submit.prevent="store.handleSubmit" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Edit profile</h1>
      <div
        v-if="store.message"
        class="border-green-500 p-2 text-green-500 bg-green-200 font-semibold"
      >
        {{ store.message }}
      </div>
      <div class="flex flex-col gap-2 mb-4 mt-2">
        <label for="current_password" class="required">Current password</label>
        <input
          :disabled="store.isLoading"
          id="current_password"
          name="current_password"
          v-model="store.form.current_password"
          type="password"
          class="form-input"
          autocomplete="current_password"
          required
        />
        <ValidationError :errors="store.errors" field="current_password"></ValidationError>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="password" class="required">New password</label>
        <input
          :disabled="store.isLoading"
          id="password"
          name="password"
          v-model="store.form.password"
          type="password"
          class="form-input"
          autocomplete="password"
          required
        />
        <ValidationError :errors="store.errors" field="password"></ValidationError>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="password_confirmation" class="required">Confirmation password</label>
        <input
            :disabled="store.isLoading"
            id="password_confirmation"
            name="password_confirmation"
            v-model="store.form.password_confirmation"
            type="password"
            class="form-input"
            autocomplete="password_confirmation"
            required
        />
        <ValidationError :errors="store.errors" field="password_confirmation"></ValidationError>
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex flex-col gap-2">
        <button
          type="submit"
          class="btn btn-primary"
          :class="[store.isLoading ? 'cursor-not-allowed' : '']"
        >
          <div v-if="store.isLoading" class="flex space-x-4 items-center">
            <LoadingCircle />
            <span class="inline-block"> Processing... </span>
          </div>
          <div v-else>Update password</div>
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
