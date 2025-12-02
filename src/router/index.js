import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/Components/Home.vue'
import About from '@/Components/Aboutus.vue'
// import Contact from '@/Components/Contactus.vue'
// import Insights from '@/Components/Insights.vue'
import Login from '@/Components/Login.vue'
 import Recycle from '@/Components/Recycle.vue'
import Signup from '@/Components/Signup.vue'
 import Dashboard from '@/Components/Dashboard.vue'
import MyChart from '@/Components/myChart.vue'
// import Stats from '@/Components/Stats.vue'
// import Profile from '@/Components/Profile.vue'
 import Admin from '@/Components/Admin.vue'
import myChart from '@/Components/myChart.vue'
import bottle_details from '@/Components/bottle_details.vue'
import Employees from '@/Components/Employees.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {name: 'Home', path: '/', component: Home},
    {name: 'About', path: '/Aboutus', component: About},
    // {name: 'Contact', path: '/Contactus', component: Contact},
     {name: 'Dashboard', path:'/Dashboard',component:Dashboard},
    // {name: 'Insights', path:'/Insights',component:Insights},
    {name: 'Log in', path:'/Login',component:Login},
     {name: 'Recycle', path:'/Recycle',component:Recycle},
{name: 'Sign up', path:'/Signup',component:Signup},
// {name: 'Stats', path:'/Stats',component:Stats},
// {name: 'Profile', path:'/Profile',component:Profile},
{name: 'Admin', path:'/Admin',component:Admin},
{name:'MyChart' , path:'/myChart',component: myChart},
{name:'Bottle details' , path:'/bottle_details/:id',component: bottle_details},
{name:'Employees' , path:'/Employees',component: Employees},

  ],
})

export default router

