import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/Blog'),
  },
  {
    path: '/content/:id',
    props: true,
    name: 'blogContent',
    component: () => import('@/views/Blog/BlogContent.vue'),
  },
  {
    path: '/exam',
    name: 'Exam',
    component: () => import('@/views/Exam'),
  },

  {
    path: '/school',
    name: 'School',
    component: () => import('@/views/School'),
  },
  {
    path: '/film',
    name: 'Film',
    component: () => import('@/views/Film'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
