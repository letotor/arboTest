<template>
  <div>
    <h1 class="text-2xl font-bold">Tree View</h1>
    <tree-view v-for="node in treeData" :key="node.id"
      :node="node" 
    >
    </tree-view>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import TreeView from './TreeView.vue'
import type NodeTree from '../interfaces/nodeTree.interface'
import { useTreeStore } from '../stores/treeStore'

const treeData = reactive<NodeTree[]>([])
const treeStore = useTreeStore()
const node =  reactive<NodeTree[]>(treeStore.tree)


watchEffect(async () => {
  try {
    const response = await fetch('src/data/dataTree.json')
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du fichier JSON')
    }
    const jsonData = await response.json()
    Object.assign(treeData, jsonData) // Met à jour les propriétés de l'objet réactif sans rompre la réactivité
    console.debug('testtreedata',treeData)
    treeStore.setTree(treeData)
    console.log('data', treeData)
  } catch (error) {
    console.error('Erreur :', error)
  }
})

</script>
