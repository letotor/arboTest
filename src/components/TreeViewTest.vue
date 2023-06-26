<template>
  <div>
    <h1 class="text-2xl font-bold">Tree View</h1>
    <tree-view
      :id="treeData.id"
      :nodes="treeData.nodes"
      :name="treeData.name"
      :isGroupe="treeData.isGroupe"
      :isSelected="treeData.isSelected"
      :canSelected="treeData.canSelected"
    >
    </tree-view>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watchEffect } from 'vue'
import TreeView from './TreeView.vue'

type ElementType = 'windfarm' | 'windturbine' | 'lidar' | 'meter' | 'RTU' | 'GWE'

interface NodeTree {
  id: string
  type?: ElementType
  name: string
  isGroupe: boolean
  isSelected: boolean
  canSelected: boolean
  nodes?: NodeTree[]
}

const treeData: NodeTree = reactive({
  id: 'root',
  name: 'root',
  isGroupe: true,
  isSelected: false,
  canSelected: true,
})

watchEffect(async () => {
  try {
    const response = await fetch('src/data/dataTree.json')
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du fichier JSON')
    }
    const jsonData = await response.json()
    Object.assign(treeData, jsonData) // Met à jour les propriétés de l'objet réactif sans rompre la réactivité
    console.log('data', treeData)
  } catch (error) {
    console.error('Erreur :', error)
  }
})

const myCustomStyles = computed(() => {
  return {
    tree: {
      height: 'auto',
      maxHeight: '300px',
      overflowY: 'visible',
      display: 'inline-block',
      textAlign: 'left'
    },
    row: {
      style: {
        width: '500px',
        cursor: 'pointer'
      },
      child: {
        class: '',
        style: {
          height: '35px'
        },
        active: {
          style: {
            height: '35px'
          }
        }
      }
    },
    rowIndent: {
      paddingLeft: '20px'
    },
    text: {
      // class: "" // uncomment this line to overwrite the 'capitalize' class, or add a custom class
      style: {},
      active: {
        style: {
          'font-weight': 'bold',
          color: '#2ECC71'
        }
      }
    }
  }
})

const myCustomOptions = computed(() => {
  return {
    treeEvents: {
      expanded: {
        state: false
      },
      collapsed: {
        state: false
      },
      selected: {
        state: true,
        fn: mySelectedFunction
      },
      checked: {
        state: true,
        fn: myCheckedFunction
      }
    },
    events: {
      expanded: {
        state: true
      },
      selected: {
        state: true
      },
      checked: {
        state: true
      },
      editableName: {
        state: true,
        calledEvent: 'expanded'
      }
    },
    addNode: {
      state: true,
      fn: addNodeFunction,
      appearOnHover: false
    },
    editNode: { state: false, fn: null, appearOnHover: false },
    deleteNode: {
      state: true,
      fn: deleteNodeFunction,
      appearOnHover: true
    },
    showTags: true
  }
})

const mySelectedFunction = (nodeId: number, state: boolean) => {}

const myCheckedFunction = (nodeId: number, state: boolean) => {}

const deleteNodeFunction = (node: any) => {}

const addNodeFunction = (node: any) => {}
</script>
