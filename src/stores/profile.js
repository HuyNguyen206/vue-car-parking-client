import {reactive, ref} from 'vue'
import {defineStore} from 'pinia'

export const useProfile = defineStore('profile', () => {
  const errors = reactive({})
  const isLoading = ref(false)
  const message = ref('')
  const form = reactive({
    email: '',
    name: ''
  })

  function resetForm() {
    form.email = ''
    form.name = ''
  }

  async function handleSubmit() {
    if (isLoading.value) {
      return
    }
    message.value = ''
    isLoading.value = true
    errors.value = {}
    return window.axios
      .put('profile', form)
      .then((res) => {
        message.value = 'Profile has been updated'
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
  async function getProfile() {
    return window.axios
      .get('profile')
      .then((res) => {
        form.email = res.data.email
        form.name = res.data.name
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

  return { form, resetForm, handleSubmit, errors, isLoading, message, getProfile }
})
