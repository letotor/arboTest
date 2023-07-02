<template>
  <div class="container pl-6">
    <div class="flex">
      <input
        type="checkbox"
        :id="node.id"
        :value="node.name"
        @change="toggleNode"
        :checked="node.isSelected"
        :disabled="!node.canSelected"
      />
      <label :for="node.id">{{ node.name }}</label>

      <span class="text-green-400" v-if="node.isGroupe"> - groupe - </span>
     <span class="pl-2"> id :{{ node.id }} type : {{ node.type }} selected : {{ node.isSelected }}</span> 
      <span class="flex flex-row" @click.stop="toggleHideShow">
        {{ node.canSelected }}
        <img v-if="node.nodes" :src="imageFolder" alt="turbine" class="w-6 h-6" />
      </span>
    </div>

    <div v-if="node.nodes && hideShow">
      <ul v-for="childNode in node.nodes" :key="childNode.id">
        <li class="tiret"></li>
        <tree class="w-full" :node="childNode" :class="{ children: true }" />
      </ul>
    </div>

   
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type NodeTree from '../interfaces/nodeTree.interface'
import tree from './treeRecursive.vue'
import { useTreeStore } from '../stores/treeStore'
import image from '@/assets/images/folder-plus-icone8.png'
import imagePlus from '@/assets/images/folder.png'
import { Console } from 'console'

const props = defineProps<{
  node: NodeTree
}>()

const node = reactive(props.node)
const hideShow = ref(false)
const treeStore = useTreeStore()


const toggleHideShow = () => {
  hideShow.value = !hideShow.value
}

const toggleNode = () => {
  node.isSelected = !node.isSelected
  console.debug('toggleNode', node.isSelected)
  //node.isSelected = !node.isSelected
  // RG 1 : si un noeud groupe est selectionné, tous les noeuds enfants doivent être sélectionnés
  if (selectAllChild.value === true && node.nodes) {
    node.nodes.forEach((childNode) => {
      childNode.isSelected = node.isSelected
    })
  }
  // RG 2 : si un noeud groupe est deselectionné, tous les noeuds enfants doivent être desélectionnés
  if (unSelectAllChild.value === true && node.nodes) {
    node.nodes.forEach((childNode) => {
      childNode.isSelected = node.isSelected
    })
  }



  // //RG3 :



  


  // if (node.nodes && node.isGroupe) {
  //   node.nodes.forEach((childNode) => {
  //     childNode.isSelected = node.isSelected
  //   })
  //
  console.debug('getParent', getParent(node))
  console.debug('selecteAllchild', selectAllChild.value)
}



const setNodeTrueIfAllChildSelected = (node: NodeTree) => {
  if (node.nodes && node.isGroupe && !node.isSelected) {
    console.debug(
      'setNodeTrueIfAllChildSelected',
      node.nodes.every((childNode) => childNode.isSelected == true)
    )
    return node.nodes.every((childNode) => childNode.isSelected == true)
  } else {
    return false
  }
}


function changeCanBeSeleted(node: NodeTree, type: typeof node.type) {
  node.canSelected = node.type === type
  const nodeChild = node?.nodes
  if (nodeChild)
    nodeChild.map((childNode: NodeTree) => {
      changeCanBeSeleted(childNode, type)
    })
}


const selectAllChild = computed(() => {
  if (node.nodes && node.isGroupe && node.isSelected) {
    return true
  } else {
    return false
  }
})

const unSelectAllChild = computed(() => {
  if (node.nodes && node.isGroupe && !node.isSelected) {
    return true
  } else {
    return false
  }
})




watch(node, ( oldvalue,newValue) => {
  // RG : tous les enfants selectionné , le parent doit être selectionné si c'est un groupe
  if(setNodeTrueIfAllChildSelected(node) && node.isGroupe && !node.isSelected){
    node.isSelected = true
  }
  // RG : au moins un enfant deselectionné , le parent doit être deselectionné 
  if (node.isGroupe && node.isSelected && node.nodes && node.nodes.some((childNode) => childNode.isSelected == false)){
    node.isSelected = false
  }
  

  // RG : si au moins un noeud selectionné , alors les autre noeud doivent etre du meme type avec canSeleted = true
    // aucun element selectionné
 
    if(treeStore.getNumberNodeSelected()===1)
    console.debug('noeud selection : 1')

    // treeStore.tree.forEach((childNode) => {
    //   if (childNode.type === node.type){
    //     childNode.canSelected = true
    //     node.canSelected  = true
    //   }
    // })
    // if(treeStore.getNumberNodeSelected()>1){
    //   treeStore.tree.forEach((childNode) => {
    //     if (childNode.type !== node.type){
    //       childNode.canSelected = false
    //     }
    //   })
    // }
    // if(treeStore.getNumberNodeSelected()===1){

  
  
})

// const changeCanBeSeleted = (node: NodeTree, type: typeof node.type) => {
//   node.canSelected = node.type === type
//   const nodeChild = node?.nodes
//   if (nodeChild)
//     nodeChild.map((childNode: NodeTree) => {
//       changeCanBeSeleted(childNode, type)
//     })
// }




const imageFolder = computed(() => {
  if (node.nodes && hideShow) {
    return imagePlus
  } else {
    return image
  }
})

function getParent(node: NodeTree): NodeTree | undefined {
  return treeStore.findParent(treeStore.tree, node.id)
}
</script>

<style scoped>
.children {
  padding-left: 20px;
  border-left: 1px dotted greenyellow;
}
.tiret {
  border-top: 1px dotted greenyellow;

  position: relative;
  width: 15px;
  top: 15px; /* Ajoutez un espacement entre la ligne pointillée et le texte */
}
.tree {
  position: relative;
}
.turbine {
  color: yellow;
}
.windfarm {
  color: blueviolet;
}
.lidar {
  color: greenyellow;
}
.meter {
  color: red;
}
.RTU {
  color: orange;
}
.GWE {
  color: green;
}
</style>
