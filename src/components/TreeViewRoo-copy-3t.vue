<template>
  <div>
    <h1 class="text-2xl font-bold">Tree View</h1>
    <tree-view v-for="node in treeData" :key="node.id" :node="node" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import TreeView from './TreeView.vue'
import type NodeTree from '../interfaces/nodeTree.interface'
import { useTreeStore } from '../stores/treeStore'


const treeData = reactive<NodeTree[]>([])
const treeStore = useTreeStore()

const nodeData = reactive<NodeTree[]>(treeStore.treeInit)



//creation du tableau de references pour les enfants a partir de NodeData

const treeReferences = [] as NodeTree[] // de la taille jsonData.length
/**
 * recuperation des données du fichier json
 */
watchEffect(async () => {
  try {
    const response = await fetch('src/data/dataTree.json')
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du fichier JSON')
    }
    const jsonData = await response.json()
    Object.assign(treeData, jsonData) // Met à jour les propriétés de l'objet réactif sans rompre la réactivité
    Object.assign(nodeData, jsonData) // Met à jour les propriétés de l'objet réactif sans rompre la réactivité
    console.log('test', treeData.length)

    treeStore.setTree(treeData)
    treeStore.setTreeInit(treeData)

    //creation du tableau de references pour les enfants a partir de NodeData
    for (let i = 0; i < treeData.length; i++) {
      treeReferences.push(treeData[i])
    }

    // console.debug('treeReferences', treeReferences)
  } catch (error) {
    console.error('Erreur :', error)
  }
})
</script>
