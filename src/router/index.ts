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
    },
    // {
    //   path: '/treeview2',
    //   name: 'treeView2',
    //   component: () => import('../components/recursiveCheck.vue')
    // },
  ]
})

export default router
