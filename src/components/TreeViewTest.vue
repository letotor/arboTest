<template>
  <div>
    <h1 class="text-2xl font-bold">Tree View</h1>
    <tree-view
      :id="treeData.id"
      :nodes="treeData.nodes!"
      :name="treeData.name"
      :isGroupe="treeData.isGroupe"
      :isSelected="treeData.isSelected"
      :canSelected="treeData.canSelected"
    >
    </tree-view>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import TreeView from './TreeView.vue'
import type NodeTree from '../interfaces/nodeTree.interface'
import { useTreeStore } from '@/stores/treeStore'

const treeData = reactive<NodeTree>({
    id: '',
    name: '',
    isGroupe: true,
    isSelected: false,
    canSelected: true,
    nodes: []
})

const treeStore = useTreeStore()

watchEffect(async () => {
  try {
    const response = await fetch('src/data/dataTree.json')
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du fichier JSON')
    }
    const jsonData = await response.json()
    Object.assign(treeData, jsonData) // Met à jour les propriétés de l'objet réactif sans rompre la réactivité
    console.log(treeData)
    treeStore.setTree(treeData)
    console.log('data', treeData)
  } catch (error) {
    console.error('Erreur :', error)
  }
})

</script>
