<template>
  <div class="pl-4">
    <ul class="">
      <li>
        <div class="flex items-center flex-row">
          <img
            v-if="!hideShow"
            class="h-10 w-10"
            :src="iconeFolderPlus"
            @click.stop="toggleHideShow"
          />
          <img v-else class="h-10 w-10" :src="iconeFolderMinus" @click="toggleHideShow" />
          <input
            class="check-box"
            :id="id"
            type="checkbox"
            v-if="canSelected"
            @click.stop="checkSelected"
          />

          <label class="text-white" :for="id">
            <span class="ml-2">{{ name }}</span>
            <span> - isCheck : {{ isSelected }} - groupe : {{ isGroupe }} </span>
          </label>
        </div>
      </li>

      <li v-for="node in nodes" :key="node.id">
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
import { ref , computed, watchEffect} from 'vue'
import TreeView from './TreeView.vue'
import iconeFolderPlus from '@/assets/images/folder-plus-icone8.png'
import iconeFolderMinus from '@/assets/images/folder-open-icone8.png'
import type NodeTree from '@/interfaces/nodeTree.interface';

import {useTreeStore} from '@/stores/treeStore';
const hideShow = ref(false)

const treeStore  = useTreeStore();
console.debug('init treeStore ' , treeStore.tree);

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
    return treeStore.treeSelectNode;
  }
  return null;
});

// watchEffect(() => {
//   if (updateTreeSelect.value) {
//     treeStore.setTreeSelect(updateTreeSelect.value);
//   }
// });



function toggleHideShow(): void {
  hideShow.value = !hideShow.value
  console.log('toggleHideShow', hideShow.value)
}

function checkSelected(e: MouseEvent) {
  const inputElement = e.target as HTMLInputElement
  const inputElementParent = inputElement.parentElement as HTMLInputElement
 const selectedElelementToUpdate = {
    id: inputElement.id,
    name:   props.name,
    isGroupe: props.isGroupe,
    isSelected: inputElement.checked,
    canSelected: props.isGroupe,
 }
  


  treeStore.setTreeSelectNode({
    ...selectedElelementToUpdate
  });
  //console.log('checkSelected', inputElement.checked, inputElement.id)
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
