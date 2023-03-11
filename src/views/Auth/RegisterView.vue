<script setup>
import {useRegister} from '@/stores/register'
import {onBeforeUnmount} from 'vue'
import ValidationError from '@/components/ValidationError.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'

const store = useRegister()
onBeforeUnmount(store.resetForm)
</script>

<template>
  <form @submit.prevent="store.handleSubmit" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Register</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="name" class="required">Name</label>
        <input
          :disabled="store.isLoading"
          id="name"
          name="name"
          v-model="store.form.name"
          type="text"
          class="form-input"
          autocomplete="name"
          required
        />
        <ValidationError :errors="store.errors" field="name"></ValidationError>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="email" class="required">Email</label>
        <input
          :disabled="store.isLoading"
          id="email"
          name="email"
          v-model="store.form.email"
          type="email"
          class="form-input"
          autocomplete="email"
          required
        />
        <ValidationError :errors="store.errors" field="email"></ValidationError>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="password" class="required">Password</label>
        <input
          :disabled="store.isLoading"
          id="password"
          name="password"
          v-model="store.form.password"
          type="password"
          class="form-input"
          autocomplete="new-password"
          required
        />
        <ValidationError :errors="store.errors" field="password"></ValidationError>
      </div>

      <div class="flex flex-col gap-2">
        <label for="password_confirmation" class="required"> Confirm password </label>
        <input
          :disabled="store.isLoading"
          id="password_confirmation"
          name="password_confirmation"
          v-model="store.form.password_confirmation"
          type="password"
          class="form-input"
          autocomplete="new-password"
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
            <span class="inline-block"> Registering... </span>
          </div>
          <div v-else>Register</div>
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
