<template>
  <div>
    <h1 class="text-2xl font-bold">Tree View</h1>
    <tree class="" v-for="node in treeStore.tree" :key="node.id" :node="node" />
    <pre><JSON class="stringify">{{treeStore.tree}}</JSON></pre>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect , watch } from 'vue'
import tree from './treeRecursive.vue'
import type NodeTree from '../interfaces/nodeTree.interface'
import { useTreeStore } from '../stores/treeStore'

const treeStore = useTreeStore()

watchEffect(async () => {
  try {
    const response = await fetch('src/data/dataTree.json')
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du fichier JSON')
    }
    const jsonData = await response.json()
    treeStore.setTree(jsonData)
  } catch (error) {
    console.error('Erreur :', error)
  }
})


</script>
