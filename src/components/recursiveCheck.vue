<template>
  <div>
    <tree-view :nodes="data" :selected-node="selectedNode" @node-selected="onNodeSelected"></tree-view>
  </div>
</template>

<script lang="ts" setup>
import { ref,watchEffect } from 'vue';
import TreeView from './treeview2.vue';

const data = ref([]); // Votre tableau de données provenant de l'API
const selectedNode = ref(null);

const onNodeSelected = (node:any) => {
  selectedNode.value = node;
};

watchEffect(async () => {
  try {
    const response = await fetch('src/data/dataTree.json')
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du fichier JSON')
    }
    const jsonData = await response.json()
    Object.assign(data, jsonData) // Met à jour les propriétés de l'objet réactif sans rompre la réactivité


  } catch (error) {
    console.error('Erreur :', error)
  }
})
</script>
