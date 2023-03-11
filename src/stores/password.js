import {reactive, ref} from 'vue'
import {defineStore} from 'pinia'

export const usePassword = defineStore('password', () => {
  const errors = reactive({})
  const isLoading = ref(false)
  const message = ref('')
  const form = reactive({
    current_password: '',
    password: '',
    password_confirmation: ''
  })

  function resetForm() {
    form.current_password = ''
    form.password = ''
    form.password_confirmation = ''
  }

  async function handleSubmit() {
    if (isLoading.value) {
      return
    }
    message.value = ''
    isLoading.value = true
    errors.value = {}
    return window.axios
      .put('change-password', form)
      .then((res) => {
        message.value = 'Password has been updated'
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

  return { form, handleSubmit, errors, isLoading, message, resetForm }
})
