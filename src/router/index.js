import {createRouter, createWebHistory} from 'vue-router'
import RegisterView from '@/views/Auth/RegisterView.vue'
import IndexView from '@/views/Vehicles/IndexView.vue'
import Login from '@/views/Auth/Login.vue'
import HomeView from '@/views/HomeView.vue'
import ProfileEdit from '@/views/Profile/ProfileEdit.vue'
import ChangePassword from "@/views/Profile/ChangePassword.vue";
import AddVehicle from "@/views/Vehicles/AddVehicle.vue";
import EditVehicle from "@/views/Vehicles/EditVehicle.vue";
import OrderParking from "@/views/Parking/OrderParking.vue";
import IndexParking from "@/views/Parking/IndexParking.vue";

function auth(to, from, next) {
  if (!localStorage.getItem('access_token')) {
    return next({ name: 'login' })
  }
  next()
}

function guest(to, from, next) {
  if (localStorage.getItem('access_token')) {
    return next({ name: 'vehicles.index' })
  }
  next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      beforeEnter: guest,
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: guest,
      component: Login
    },
    {
      path: '/vehicles',
      name: 'vehicles.index',
      beforeEnter: auth,
      component: IndexView
    },
    {
      path: '/profile',
      name: 'profile.edit',
      beforeEnter: auth,
      component: ProfileEdit
    },
    {
      path: '/update-password',
      name: 'profile.update-password',
      beforeEnter: auth,
      component: ChangePassword
    },
    {
      path: '/add-vehicle',
      name: 'vehicles.create',
      beforeEnter: auth,
      component: AddVehicle
    },
    {
      path: '/edit-vehicle/:id',
      name: 'vehicles.edit',
      beforeEnter: auth,
      component: EditVehicle
    },
    {
      path: '/parking/start',
      name: 'parking.start',
      beforeEnter: auth,
      component: OrderParking
    },
    {
      path: '/parking',
      name: 'parking.index',
      beforeEnter: auth,
      component: IndexParking
    }
  ]
})

export default router
