import Vue from 'vue'
import VueRouter from 'vue-router'
const Login=()=>import('views/login/Login')
const Home=()=>import('views/home/Home')
Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/Login'
  },
  {
    path:'/Login',
    component:Login
  },
  {
    path:'/Home',
    component:Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
if(to.path==='/login')return next();
const token=window.sessionStorage.getItem('token')
if(!token)return next('/login')
next()
})
export default router
