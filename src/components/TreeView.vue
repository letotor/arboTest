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
            :v-model="node.isSelected"
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
          :nodeTreeReactive="nodeTreeReactive"
          
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


type ElementType = 'windfarm' | 'windturbine' | 'lidar' | 'meter' | 'RTU' | 'GWE'

const hideShow = ref(false)
const treeStore = useTreeStore()

const props = defineProps<{
  node: NodeTree,
  nodeTreeReactive :any  ; 
  // selectedNode: NodeTree | null
}>()

// const emit = defineEmits<{
//   (e: 'node-selected', node: NodeTree ): void
// }>()

const nodeChildren = reactive<NodeTree[]>(props.node.nodes || [])
// On construit les variables réactives à partir des props
const node = reactive<NodeTree>(props.node)
 



console.log('node', node)


// node.nodes?.forEach((childNode) => {
//   console.log('props nodeTreeReactive',props.nodeTreeReactive)
// })




console.log('nodeTreeReactive Enfant', props.nodeTreeReactive)


function toggleHideShow(): void {
  hideShow.value = !hideShow.value
}

const allChildrenAreSelected = computed(() => {
  if (nodeChildren.length > 0) {
    return nodeChildren.every((childNode) => childNode.isSelected)
  }
  return false
})



// function changeCanBeSeleted (node: NodeTree, type: ElementType ){
//   const nodeChild : NodeTree= node?.nodes;
//   node.canSelected = node.type === type
//   if (node.nodes?.length > 0) {
//     node.nodes?.forEach((childNode:NodeTree) => {
//        changeCanBeSeleted(childNode, type)
//     })
//   } 
// }



function changeCanBeSeleted (node: NodeTree, type: ElementType ){
  node.canSelected = node.type === type
  const nodeChild = node?.nodes;
  if (nodeChild)
  nodeChild.map((childNode:NodeTree) => {
       changeCanBeSeleted(childNode, type)
})
}






function countSelectedNodeCheck(node: NodeTree[]): number {
  let count = 0
  
  return count;
}


function changeCanBeDeseleted(node: NodeTree, type: ElementType) {
  node.canSelected = true
  const nodeChild = node?.nodes;
  if (nodeChild)
  nodeChild.map((childNode:NodeTree) => {
    changeCanBeDeseleted(childNode, type)
})
  
  
}




/**
 *  1- on regarde si le noeud est selectionné
 *  1-1  si selectionner on compte le nombre de isSelected
 * 
 *  2- si le noeud n'est pas selection 
 *  2-1  on compte le nombre de noeud selectionné
 *  2-2  si le nombre de noeud selectionné est 0
 *  2-3 alors on fait un canBe Selected avec le type egale a tous les type possible
 *  
 * 
 * 
 * 
 * 
 * */

function toggleNode(event: Event): void {
  const target = event.target as HTMLInputElement
  console.debug('target', target)
  const id = target.id
  const nodeElement = treeStore.getNodebyId(id)
  let count  = countSelectedNodeCheck(treeStore.tree)
 console.debug('count',count)
//  treeStore.tree.map(elt =>{
      // changeCanBeSeleted(elt, nodeElement?.type! )})

  if (nodeElement?.isSelected){
    // console.debug('count',count)
    // console.debug('nodeElement.isSelected','oui')
    
  }else{
    // console.debug('nodeElement.isSelected','non')
    // console.debug('premiere selection?? ')
   

    
    treeStore.tree.map(elt =>{
      changeCanBeSeleted(elt, nodeElement?.type! )
   //   console.log(countSelectedNodeCheck(elt))
  })

  }
 

  treeStore.setSelectNode(nodeElement)
  if (nodeElement) {
    nodeElement.isSelected = !nodeElement.isSelected
  }

  if (nodeElement?.isGroupe) {
    nodeElement.nodes?.forEach((childNode: any) => {
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
../interfaces/nodeTree.interfaceNew