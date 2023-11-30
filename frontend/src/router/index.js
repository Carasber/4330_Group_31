//We had to be creative in order to log in copy and paste these routes in the url to move around from page to pages

//These are all the imports provided after being a login
import { createRouter, createWebHistory } from 'vue-router'
import { useLoggedInUserStore } from '../store/loggedInUser'

// make sure to copy in paste the 'path' section and to not include the single quotations marks (These ---> ' ')
// make all paths and names lowercase for consistency
const routes = [
  {
    path: '/',
    component: () => import('../views/home.vue') // This is just '/' to give home
  },
  {
    path: "/login",
    name: "login",
    component: () => import('../views/login.vue') // This is the login page section
  },
  {
    path: '/clientform',
    name: 'clientform',
    // only authenticated users can create clients
    meta: { requiresAuth: true },
    component: () => import('../views/clientform.vue') //This is the client form section
  },
  {
    path: '/findclient',
    name: 'findclient',
    meta: { requiresAuth: true },
    component: () => import('../views/findclient.vue') //This is the find client
  },
  {
    path: '/clientdetails/:id',
    name: 'clientdetails',
    meta: { requiresAuth: true },
    component: () => import('../views/clientdetails.vue') //This is clientdetails by id
  },
  {
    path: '/eventform',
    name: 'eventform',
    meta: { requiresAuth: true },
    component: () => import('../views/eventform.vue') //This is event form
  },
  {
    path: '/findevents',
    name: 'findevents',
    meta: { requiresAuth: true },
    component: () => import('../views/findevents.vue') //This is the find events
  },
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    meta: { requiresAuth: true },
    component: () => import('../views/eventdetails.vue') //This is the eventdetails by id
  },
  {
    path: '/serviceform',
    name: 'serviceform',
    meta: { requiresAuth: true },
    component: () => import('../views/serviceform.vue') //This is the service form
  },
  {
    path: '/findservice',
    name: 'findservice',
    meta: { requiresAuth: true },
    component: () => import('../views/findservice.vue') // This is the find service
  },
  {
    path: '/servicedetails/:id',
    name: 'servicedetails',
    meta: { requiresAuth: true },
    component: () => import('../views/servicedetails.vue') //This is the service details by id
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

// protecting the routes
router.beforeEach((to) => {
  const store = useLoggedInUserStore()
  if (to.meta.requiresAuth && !store.isLoggedIn) {
    return {
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
})

export default router
