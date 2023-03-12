import {reactive, ref} from 'vue'
import {defineStore} from 'pinia'
import {useAuth} from '@/stores/auth'

export const useRegister = defineStore('register', () => {
  const auth = useAuth()
  const errors = reactive({})
  const isLoading = ref(false)
  const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  function resetForm() {
    form.name = ''
    form.email = ''
    form.password = ''
    form.password_confirmation = ''
  }

  async function handleSubmit() {
    if (isLoading.value) {
      return
    }

    isLoading.value = true
    errors.value = {}
    return window.axios
      .post('auth/register', form)
      .then((response) => {
        console.log(response.data.data.access_token)
        auth.register(response.data.data.access_token)
      })
      .catch((res) => {
        if (res.response.status == 422) {
          errors.value = res.response.data.errors
        }
      })
      .finally(() => {
        form.password = ''
        form.password_confirmation = ''
        isLoading.value = false
      })
  }

  return { form, resetForm, handleSubmit, errors, isLoading }
})
