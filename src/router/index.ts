import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/tree',
      name: 'tree',
      component: () => import('../components/TreeGenerique.vue'),
    },
    {
      path: '/treeitem',
      name: 'treeItem',
      component: () => import('../components/TreeItem.vue'),
    },
    {
      path: '/treedim',
      name: 'treeDim',
      component: () => import('../components/TreeDim.vue'),
    },
     {
      path: '/treeview',
      name: 'treeView',
      component: () => import('../components/TreeViewTest.vue'),
    }
  ]
})

export default router
