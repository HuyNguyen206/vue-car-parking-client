<script setup>
import {onBeforeUnmount, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {useParking} from "@/stores/parking";

const store = useParking();
const router = useRoute();
watchEffect(async () => {
  store.getParkingHistoryDetail(router.params.id)
})
onBeforeUnmount(store.resetParkingDetail)
</script>

<template v-if="store.parkingDetail.id !== undefined">
  <div class="flex flex-col mx-auto md:w-96 w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">Parking order detail</h1>
    <div class="mt-2 border-2 border-gray-300 shadow-gray-400 p-2">
      <h2 class="uppercase font-bold">parking order #{{store.parkingDetail.id}}</h2>
      <h2 class="mt-4 upper-case font-bold">License plate</h2>
      <h2 class="text-2xl font-bold uppercase">{{store.parkingDetail.vehicle?.plate_number }}</h2>
      <h2 class="upper-case font-bold">Description</h2>
      <span>{{store.parkingDetail.vehicle?.description }}</span>
      <h2 class="upper-case font-bold">Zone</h2>
      <div class="bg-gray-200 p-2">
        {{store.parkingDetail?.zone.name }}
      </div>
      <h2 class="upper-case font-bold">Price</h2>
      <span>{{store.parkingDetail?.zone.price_per_hour }} &epsi; per hour</span>
      <div class="uppercase text-2xl font-bold">from</div>
      <div>
        {{store.parkingDetail.start_time }}
      </div>
      <div class="uppercase text-2xl font-bold">to</div>
      <div>
        {{store.parkingDetail.stop_time }}
      </div>
      <div class="uppercase text-2xl font-bold">total</div>
      <div class="text-blue-600 font-bold text-xl">
        {{ (store.parkingDetail.total_price / 100).toFixed(2) }} <sup>&epsi;</sup>
      </div>
    </div>
    <div class="border-t h-[1px] my-6"></div>
    <RouterLink
        class="btn btn-secondary block text-center"
        :to="{name: 'parking.history'}"
    >
     Return
    </RouterLink>
  </div>
</template>

<style scoped>

</style>