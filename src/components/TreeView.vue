<template>
  <div class="pl-4">
    <ul class="">
      <li>
        <div class="flex items-center flex-row">
          <img
            v-if="!hideShow && node.nodes.length ==0 "
            class="h-4 w-4"
            :src="iconeFolderPlus"
            @click.stop="toggleHideShow"
          />
          <img v-else class="h-4 w-4" :src="iconeFolderMinus" @click.stop="toggleHideShow" />
          <input
            class="check-box"
            :id="node.id"
            type="checkbox"
            v-if="node.canSelected"
            :checked="node.isSelected"
            @change.stop="checkSelected(id)"
          />

          <label class="text-white" :for="node.id">
            <span class="ml-2">{{ props.name }}</span>
            <span> - isCheck : {{ node.isSelected }} - groupe : {{ node.isGroupe }} </span>
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
import { ref, reactive, watch } from 'vue'
import TreeView from './TreeView.vue'
import iconeFolderPlus from '@/assets/images/folder-plus-icone8.png'
import iconeFolderMinus from '@/assets/images/folder-open-icone8.png'
import type NodeTree from '@/interfaces/nodeTree.interface'

import { useTreeStore } from '@/stores/treeStore'
import { useCheckboxStore } from '../stores'

const hideShow = ref(false)

const treeStore = useTreeStore()

const props = defineProps<{
  id: string
  name: string
  isGroupe: boolean
  isSelected: boolean
  canSelected: boolean
  nodes?: NodeTree[]
}>()

const node = reactive<NodeTree>({
  id: treeStore.tree.id,
  name: treeStore.tree.name,
  isGroupe: treeStore.tree.isGroupe,
  isSelected: treeStore.tree.isSelected,
  canSelected: treeStore.tree.canSelected,
  nodes: treeStore.tree.nodes
}
)

watch(() => node.isSelected, (newValue, oldValue) => {
  console.debug('watch isSelected', newValue, oldValue)
})

function toggleHideShow(): void {
  hideShow.value = !hideShow.value
}

function checkSelected(id : string): void {

  console.debug('checkSelected', id)
  node.isSelected= ! node.isSelected
  treeStore.setTree(node)

  const selectedElementToUpdate = {
    id: node.id,
    name: node.name,
    isGroupe: node.isGroupe,
    isSelected: node.isSelected,
    canSelected: node.isGroupe
  }

  if (selectedElementToUpdate.isSelected) {
    // Si c'est un groupe, sélectionnez le groupe et ses enfants
    if (selectedElementToUpdate.isGroupe) {
      treeStore.selectGroupAndChildren(selectedElementToUpdate)
    } else {
      // Sinon, ajoutez simplement l'élément à la liste de sélection
      treeStore.addTreeSelectList(selectedElementToUpdate)
    }
  } else {
    // Si l'élément est désélectionné, supprimez-le de la liste de sélection
    treeStore.removeTreeSelectList(selectedElementToUpdate)
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
