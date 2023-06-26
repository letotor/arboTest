import { defineStore } from 'pinia'
import NodeTree from '../interfaces/nodeTree.interface'

interface TreeState {
  treeSelect: NodeTree
  treeData: NodeTree[]
}

export const useTreeStore = defineStore('tree', {
  state: (): TreeState => ({
    treeSelect: {
      id: '0',
      name: '',
      type: 'windfarm',
      isGroupe: false,
      isSelected: false,
      canSelected: false
    },
    treeData: [
      {
        id: '0-1',
        type: 'windfarm',
        name: 'WindFarm1',
        isGroupe: false,
        isSelected: false,
        canSelected: true,
        nodes: [
          {
            id: '0-1-0',
            type: 'windturbine',
            name: 'WindTurbines',
            isGroupe: true,
            isSelected: false,
            canSelected: true
          }
        ]
      }
    ]
  }),

  getters: {
    treeSelectNode: (state) => state.treeSelect,
    tree: (state) => state.treeData // Renommé de "tree" à "treeData"
  },

  actions: {
    setTreeSelectNode(node: NodeTree) {
      this.treeSelect = node
    }


  }
})
