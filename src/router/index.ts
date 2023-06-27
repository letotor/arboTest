import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/treeview',
      name: 'treeView',
      component: () => import('../components/TreeViewRoot.vue')
    }
  ]
})

export default router
