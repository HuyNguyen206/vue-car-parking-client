<script setup>
import {useLogin} from "@/stores/login";
import {onBeforeUnmount} from "vue";
import ValidationError from "@/components/ValidationError.vue";
import LoadingCircle from "@/components/LoadingCircle.vue";

const store = useLogin();
onBeforeUnmount(store.resetForm)
</script>

<template>
  <form @submit.prevent="store.handleSubmit" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Register</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="email" class="required">Email</label>
        <input :disabled="store.isLoading"
            id="email"
            name="email"
            v-model="store.form.email"
            type="text"
            class="form-input"
            autocomplete="email"
            required
        />
        <ValidationError :errors="store.errors" field="email"></ValidationError>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="password" class="required">Password</label>
        <input :disabled="store.isLoading"
            id="password"
            name="email"
            v-model="store.form.password"
            type="password"
            class="form-input"
            autocomplete="password"
            required
        />
        <ValidationError :errors="store.errors" field="password"></ValidationError>
      </div>

      <div class="flex flex gap-2 mb-4">
        <input :disabled="store.isLoading"
               id="remember"
               name="remember"
               v-model="store.form.remember"
               type="checkbox"
               class="form-input"
               required
        />
        <label for="remember" >Remember me</label>
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex flex-col gap-2">
        <button type="submit" class="btn btn-primary " :class="[store.isLoading ? 'cursor-not-allowed' : '']">
          <div v-if="store.isLoading" class="flex space-x-4 items-center">
          <LoadingCircle/>
            <span class="inline-block">
               Processing...
            </span>
          </div>
          <div v-else>
            Login
          </div>
        </button>
      </div>
    </div>
  </form>
</template>


<style scoped>

</style>