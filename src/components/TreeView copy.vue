<template>
  <div class="pl-4">
    <ul class="">
      <li>
        <div class="flex items-center flex-row">
          <img
            v-if="!hideShow && props.nodes "
            class="h-4 w-4"
            :src="iconeFolderPlus"
            @click.stop="toggleHideShow"
          />
          <img v-else class="h-4 w-4" :src="iconeFolderMinus" @click.stop="toggleHideShow" />
          <input
            class="check-box"
            :id="props.id"
            type="checkbox"
            v-if="props.canSelected"
            :checked="props.isSelected"
            @change.stop="checkSelected"
          />

          <label class="text-white" :for="props.id">
            <span class="ml-2">{{ props.name }}</span>
            <span> - isCheck : {{ props.isSelected }} - groupe : {{ props.isGroupe }} </span>
          </label>
        </div>
      </li>

      <li v-for="node in props.nodes" :key="node.id">
        <div class="child" v-if="hideShow">
          <tree-view
            :id="node.id"
            :nodes="node.nodes"
            :name="node.name"
            :isGroupe="node.isGroupe"
            :isSelected="node.isSelected"
            :canSelected="node.canSelected"
          >
          </tree-view>
        </div>
      </li>
    </ul>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import TreeView from './TreeView.vue'
import iconeFolderPlus from '@/assets/images/folder-plus-icone8.png'
import iconeFolderMinus from '@/assets/images/folder-open-icone8.png'
import type NodeTree from '@/interfaces/nodeTree.interface'

import { useTreeStore } from '@/stores/treeStore'
import { useCheckboxStore } from '../stores'
const hideShow = ref(false)

const treeStore = useTreeStore()
const checkStore = useCheckboxStore();
console.debug('init treeStore ', treeStore.tree)

const props = defineProps<{
  id: string
  name: string
  isGroupe: boolean
  isSelected: boolean
  canSelected: boolean
  nodes?: NodeTree[]
}>()

const updateTreeSelect = computed(() => {
  if (treeStore.treeSelectNode) {
    return treeStore.treeSelectNode
  }
  return null
})

// watchEffect(() => {
//   if (updateTreeSelect.value) {
//     treeStore.setTreeSelect(updateTreeSelect.value);
//   }
// });

function toggleHideShow(): void {
  hideShow.value = !hideShow.value
  console.log('toggleHideShow', hideShow.value)
}

function checkSelected(e: Event) {
  const inputElement = e.target as HTMLInputElement
  //const inputElementParent = inputElement.parentElement as HTMLInputElement
  const selectedElelementToUpdate = {
    id: inputElement.id,
    name: props.name,
    isGroupe: props.isGroupe,
    isSelected: inputElement.checked,
    canSelected: props.isGroupe
  }

  treeStore.setTreeSelect({
    ...selectedElelementToUpdate
  })

  if (selectedElelementToUpdate.isSelected) {
    // Si c'est un groupe, sélectionnez le groupe et ses enfants
    if (selectedElelementToUpdate.isGroupe) {
      treeStore.selectGroupAndChildren(selectedElelementToUpdate);
    } else {
      // Sinon, ajoutez simplement l'élément à la liste de sélection
      treeStore.addTreeSelectList(selectedElelementToUpdate);
    }
  } else {
    // Si l'élément est désélectionné, supprimez-le de la liste de sélection
    treeStore.removeTreeSelectList(selectedElelementToUpdate);
  }
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
</style>
