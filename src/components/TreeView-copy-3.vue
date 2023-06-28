<template>
  <div class="pl-4">
    <ul class="">
      <li>
        <div class="flex items-center flex-row">
          <img
            v-if="!hideShow && nodeElement"
            class="h-4 w-4"
            :src="iconeFolderPlus"
            @click.stop="toggleHideShow"
          />
          <img v-else class="h-4 w-4" :src="iconeFolderMinus" @click.stop="toggleHideShow" />
          <input
            class="check-box"
            :disabled="!nodeElement.canSelected"
            :id="nodeElement.id"
            type="checkbox"
            @change="handleChangeCheckbox"
            :checked="(nodeElement.canSelected && nodeElement.isSelected)  || allChildrenAreSelected "
          />
          <label class="text-white" :for="nodeElement.id">
            <span class="ml-2">{{ nodeElement.name }}</span>
            <span class="text-blue-600" v-if="nodeElement.isGroupe"> - groupe </span>
            <span> - isCheck : {{ nodeElement.isSelected }}</span>

            <span v-if="nodeElement.canSelected" :class="{ 'text-green-400': nodeElement.canSelected }">
              - canSelected
            </span>
          </label>
        </div>
      </li>

      <!-- leselents enfants ici  -->
      <li class="child" v-if="hideShow">
        <tree-view :node="node" v-for="node in nodeElement.nodes" :key="node.id" />
      </li>
    </ul>

    {{ allChildrenAreSelected }} - 
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch,watchEffect } from 'vue'
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

const nodeElement = reactive<NodeTree>(props.node)
console.log('nodeInit', nodeElement)
const lastTypeSelected = ref('')


// watch(() => node.isSelected, (newValue, oldValue) => {
//   console.debug('watch isSelected', newValue, oldValue)
// })

function toggleHideShow(): void {
  hideShow.value = !hideShow.value
}

const allChildrenAreSelected = computed(() => {
  if (nodeElement.nodes) {
    return nodeElement.nodes.every((node) => node.isSelected)
  }else{
    return false
  }
})



function handleChangeCheckbox(event: Event): void {
  console.log('--------test')
  const target = event.target as HTMLInputElement
  const id = target.id
  console.debug('test element cliqué',target)
  console.debug('nodeElement.nodes avant', nodeElement.isSelected)

if(nodeElement.isSelected && nodeElement.isGroupe){
  nodeElement.nodes?.forEach((node) => {
    node.isSelected = true


    console.debug('--fils',nodeElement.nodes)
  })
}



}


// const isNotType = computed(() => {

// })

watchEffect(() => {
  


})
 
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
