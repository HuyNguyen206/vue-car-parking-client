<script setup>

import {onBeforeUnmount, onMounted} from "vue";
import ValidationError from "@/components/ValidationError.vue";
import LoadingCircle from "@/components/LoadingCircle.vue";
import {useProfile} from "@/stores/profile";

const store = useProfile();
onBeforeUnmount(store.resetForm)
onMounted(store.getProfile)
</script>

<template>
  <form @submit.prevent="store.handleSubmit" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Edit profile</h1>
      <div v-if="store.message" class="border-green-500 p-2 text-green-500 bg-green-200 font-semibold">
        {{store.message}}
      </div>
      <div class="flex flex-col gap-2 mb-4 mt-2">
        <label for="name" class="required">Name</label>
        <input :disabled="store.isLoading"
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
            Update profie
          </div>
        </button>
      </div>
    </div>
  </form>
</template>


<style scoped>

</style>