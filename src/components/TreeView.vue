<template>
  <div class="pl-4">
    <ul class="">
      <li>
        <div class="flex items-center flex-row">
          <img
            v-if="!hideShow && node.nodes"
            class="h-4 w-4"
            :src="iconeFolderPlus"
            @click.stop="toggleHideShow"
          />
          <img v-else class="h-4 w-4" :src="iconeFolderMinus" @click.stop="toggleHideShow" />
          <input
            class="check-box"
            :disabled="!node.canSelected"
            :id="node.id"
            type="checkbox"
            @change="handleChangeCheckbox"
            :checked="node.canSelected && node.isSelected || allChildrenAreSelected"
          />
          <label class="text-white" :for="node.id">
            <span class="ml-2">{{ node.name }}</span>
            <span class="text-blue-600" v-if="node.isGroupe"> - groupe </span>
            <span> - isCheck : {{ node.isSelected }}</span>

            <span v-if="node.canSelected" :class="{ 'text-green-400': node.canSelected }">
              - canSelected
            </span>
          </label>
        </div>
      </li>

      <!-- leselents enfants ici  -->
      <li class="child" v-if="hideShow">
        <tree-view :node="node" v-for="node in nodeChildren" :key="node.id" />
      </li>
    </ul>
    type : {{ node.type }}
    {{ allChildrenAreSelected }}
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watchEffect, watch } from 'vue'
import TreeView from './TreeView.vue'
import iconeFolderPlus from '../assets/images/folder-plus-icone8.png'
import iconeFolderMinus from '../assets/images/folder-open-icone8.png'
import type NodeTree from '../interfaces/nodeTree.interface'

import { useTreeStore } from '../stores/treeStore'

const hideShow = ref(false)
const treeStore = useTreeStore()

const props = defineProps<{
  node: NodeTree
}>()

// on construit les variabler reactive a partir des props
const node = reactive<NodeTree>(props.node)
const nodeChildren = reactive<NodeTree[]>([])
if (props.node.nodes) {
  for (let i = 0; i < props.node.nodes.length; i++) {
    console.debug('----props.node.nodes', props.node.nodes)
    nodeChildren.push(props.node.nodes[i])
  }
}


// const isNotType = computed(() => {

// })
function toggleHideShow(): void {
  hideShow.value = !hideShow.value
}


console.log('---nodechildren', nodeChildren)
const allChildrenAreSelected = computed(() => {
  if(nodeChildren.length > 0){
    return nodeChildren.every((node) => node.isSelected)
  }
  return false
})




function handleChangeCheckbox(event: Event): void {
  const target = event.target as HTMLInputElement
  const id = target.id
  console.debug('-----element clique',target)
  const nodeElement = treeStore.getNodebyId(id)
  console.debug('-----nodeElement',nodeElement)
  if (nodeElement) {
    nodeElement.isSelected = !nodeElement.isSelected
    treeStore.modifyNodeTree(nodeElement, nodeElement.id)
  }


}

// Utilisation de la méthode dans votre action handleChangeCheckbox



watch(
  () => props.node.isSelected,
  (newValue, oldValue) => {
    console.debug('watch isSelected', newValue, oldValue)

    // Si c'est un groupe, sélectionnez le groupe et ses enfants
    if (props.node.isSelected) {
      treeStore.checkChildren(props.node)
      treeStore.addSeletedNodeToList(props.node)
      // si le device est de type Type alors on desactive les autres devices de type Type
    } else {
      // Sinon, ajoutez simplement l'élément à la liste de sélection
      treeStore.UncheckChildren(props.node)
      treeStore.removeSeletedNodeToList(props.node)
    }




    console.debug('----watch checkChildren', props.node,nodeChildren)

  }
)

function checkSelected(id: string): void {
  console.debug('checkSelected', id)
  // node.isSelected= ! node.isSelected
  // treeStore.setTree(node)

  // const selectedElementToUpdate = {
  //   id: node.id,
  //   name: node.name,
  //   isGroupe: node.isGroupe,
  //   isSelected: node.isSelected,
  //   canSelected: node.isGroupe
  // }

  // if (selectedElementToUpdate.isSelected) {
  //   // Si c'est un groupe, sélectionnez le groupe et ses enfants
  //   if (selectedElementToUpdate.isGroupe) {
  //     treeStore.selectGroupAndChildren(selectedElementToUpdate)
  //   } else {
  //     // Sinon, ajoutez simplement l'élément à la liste de sélection
  //     treeStore.addTreeSelectList(selectedElementToUpdate)
  //   }
  // } else {
  //   // Si l'élément est désélectionné, supprimez-le de la liste de sélection
  //   treeStore.removeTreeSelectList(selectedElementToUpdate)
  // }
}
</script>

<style scoped lang="scss">
.check-box {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.child {
  padding-left: 0.8rem;
  margin-left: 0.4rem;
  margin-bottom: 0rem;
  border-left: 1px solid #ccc;
}
.canSelected {
  color: #00ff00;
}
</style>
