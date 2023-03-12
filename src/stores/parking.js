import {reactive, ref} from 'vue'
import {defineStore} from 'pinia'
import {useRouter} from "vue-router";

export const useParking = defineStore('parking', () => {
  const errors = reactive({})
  const isLoading = ref(false)
  const form = reactive({
    vehicle_id: '',
    zone_id: '',
  })
  const zoneList = ref([])
  const parkingDetail = ref({})
  const activeParkings = ref([])
  const parkingHistory = ref([])
  const router = useRouter()

  function resetForm() {
    form.vehicle_id = ''
    form.zone_id = ''
  }
  function resetParkingDetail() {
    parkingDetail.value = {}
  }

  async function getZoneList() {
    return window.axios
        .get('zones')
        .then((res) => {
          zoneList.value = res.data.data.data
        })
  }
  async function getActiveParkings() {
    return window.axios
        .get('parkings')
        .then((res) => {
          activeParkings.value = res.data.data.data
        })
  }

  async function getParkingHistory() {
    return window.axios
        .get('parkings/history')
        .then((res) => {
          parkingHistory.value = res.data.data.data
        })
  }

   function getParkingHistoryDetail(id) {
    return window.axios
        .get(`parkings/${id}`)
        .then((res) => {
          parkingDetail.value = res.data.data
        })
  }

  async function handleSubmit() {
    if (isLoading.value) {
      return
    }

    isLoading.value = true
    errors.value = {}
    return window.axios
      .post('parkings/start', form)
      .then(() => {
        router.push({name: 'parking.index'})
      })
      .catch((res) => {
        if (res.response.status == 422) {
          errors.value = res.response.data.errors
        }
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  return { form, resetForm, handleSubmit, errors,
    isLoading, getZoneList, zoneList, getActiveParkings,
    activeParkings, getParkingHistory, parkingHistory,
    getParkingHistoryDetail, parkingDetail, resetParkingDetail
    }
})
