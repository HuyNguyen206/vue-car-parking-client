import {reactive, ref} from 'vue'
import {defineStore} from 'pinia'
import {useRouter} from "vue-router";

export const useVehicle = defineStore('vehicle', () => {
  const errors = reactive({})
  const isLoading = ref(false)
  const isLoadingVehicleList = ref(true)
  const form = reactive({
    plate_number: '',
    description: '',
  })
  const vehicleList = ref([])
  const router = useRouter()

  function resetForm() {
    form.plate_number = ''
    form.description = ''
  }

  async function getlistVehicles() {
    return window.axios
        .get('vehicles')
        .then((res) => {
          vehicleList.value = res.data.data.data
        })
        .finally(() => {
          isLoadingVehicleList.value = false
        })

  }

  async function getVehicleDetail(id) {
    return window.axios
        .get(`vehicles/${id}`)
        .then((res) => {
          form.plate_number = res.data.data.plate_number
          form.description = res.data.data.description
        })

  }

  async function deleteVehicle(id) {
    if (window.confirm('Are you sure to delete?')) {
      return window.axios
          .delete(`vehicles/${id}`)
          .then(() => {
            getlistVehicles()
          })
    }
  }

  async function handleSubmit() {
    if (isLoading.value) {
      return
    }

    isLoading.value = true
    errors.value = {}
    return window.axios
      .post('vehicles', form)
      .then(() => {
        router.push({name: 'vehicles.index'})
      })
      .catch((res) => {
        if (res.response.status == 422) {
          errors.value = res.response.data.errors
        }
      })
      .finally(() => {
        form.password = ''
        isLoading.value = false
      })
  }

  async function handleUpdate(id) {
    if (isLoading.value) {
      return
    }

    isLoading.value = true
    errors.value = {}
    return window.axios
      .put(`vehicles/${id}`, form)
      .then(() => {
        router.push({name: 'vehicles.index'})
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
    isLoading, vehicleList, getlistVehicles,
    getVehicleDetail, handleUpdate, deleteVehicle, isLoadingVehicleList }
})
