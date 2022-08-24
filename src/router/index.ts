import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import v_Dashboard from "@/pages/Dashboard.vue"
import v_Users from "@/pages/users/Users.vue"
import v_Register from "@/pages/Register.vue"
import v_Wrapper from "@/pages/Wrapper.vue"
import v_Login from "@/pages/Login.vue"
import v_UserCreate from "@/pages/users/UserCreate.vue"
import v_UserEdit from "@/pages/users/UserEdit.vue";

const routes: Array<RouteRecordRaw> = [
  {path:'/register', component: v_Register},
  {path:'/login', component: v_Login},
  { path:'', 
    component: v_Wrapper,
    children:[
      {path:'', component: v_Dashboard},
      {path:'/users', component: v_Users},
      {path:'/users/create', component: v_UserCreate},
      {path:'/users/:id/edit', component: v_UserEdit},
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
