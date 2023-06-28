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
            @change="toggleNode"
            :checked="(node.canSelected && node.isSelected) || allChildrenAreSelected"
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

      <!-- Les éléments enfants ici -->
      <li class="child" v-if="hideShow">
        <tree-view
          :node="childNode"
          v-for="childNode in node.nodes"
          :key="childNode.id"
          :selected-node="selectedNode"
          @node-selected="emit('node-selected', $event)"
        />
      </li>
    </ul>
    type : {{ node.type }}, All children : {{ allChildrenAreSelected }}
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed ,watch} from 'vue'
import TreeView from './TreeView.vue'
import iconeFolderPlus from '../assets/images/folder-plus-icone8.png'
import iconeFolderMinus from '../assets/images/folder-open-icone8.png'
import type NodeTree from '../interfaces/nodeTree.interface'
import { useTreeStore } from '../stores/treeStore'

const hideShow = ref(false)
const treeStore = useTreeStore()





const props = defineProps<{
  node: NodeTree
  selectedNode: NodeTree | null
}>()

const emit = defineEmits<{
  (e: 'node-selected', node: NodeTree ): void
}>()

// On construit les variables réactives à partir des props
const node = reactive<NodeTree>(props.node)
const nodeChildren = reactive<NodeTree[]>(props.node.nodes || [])

function toggleHideShow(): void {
  hideShow.value = !hideShow.value
}

const allChildrenAreSelected = computed(() => {
  if (nodeChildren.length > 0) {
    return nodeChildren.every((childNode) => childNode.isSelected)
  }
  return false
})

function toggleNode(event: Event): void {
  const target = event.target as HTMLInputElement
  const id = target.id
  const nodeElement = treeStore.getNodebyId(id)
  treeStore.setSelectNode(nodeElement)
  if (nodeElement) {
    nodeElement.isSelected = !nodeElement.isSelected
  }

  if (nodeElement?.isGroupe) {
    nodeElement.nodes?.forEach((childNode) => {
      childNode.isSelected = nodeElement.isSelected
    })
  }
}







watch(node, (newValue, oldValue) => {
  console.debug('test cabeselected')
  if (treeStore.getSelectedNode?.type===node.type){
    treeStore.updateTreeBySame(node)
  
  }
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
