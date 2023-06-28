<template>
  <div>
    <h1 class="text-2xl font-bold">Tree View</h1>
    <tree-view v-for="node in treeData" :key="node.id" :node="node" :selected-node="selectedNode" @node-selected="onNodeSelected"/>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import TreeView from './TreeView.vue'
import type NodeTree from '../interfaces/nodeTree.interface'
import { useTreeStore } from '../stores/treeStore'

const treeData = reactive<NodeTree[]>([])
const treeStore = useTreeStore()
const selectedNode = ref<NodeTree | null>(null);
/**
 * recuperation des données du fichier json et initialisation du store
 */
watchEffect(async () => {
  try {
    const response = await fetch('src/data/dataTree.json')
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du fichier JSON')
    }
    const jsonData = await response.json()
    Object.assign(treeData, jsonData) // Met à jour les propriétés de l'objet réactif sans rompre la réactivité
    console.log('test', treeData.length)

    treeStore.setTree(treeData)
    treeStore.setTreeInit(treeData);

  } catch (error) {
    console.error('Erreur :', error)
  }
})


const onNodeSelected = (node:NodeTree) => {
  console.debug('selected node parent:', node)
  selectedNode.value = node;
};
</script>
