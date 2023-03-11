import '@/bootstrap.js'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import ValidationError from '@/components/ValidationError.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'

const app = createApp(App)

app.component('ValidationError', ValidationError)
app.component('LoadingCircle', LoadingCircle)
app.use(createPinia())
app.use(router)

app.mount('#app')
