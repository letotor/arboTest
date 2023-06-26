import { defineStore } from 'pinia'
import NodeTree from '../interfaces/nodeTree.interface'

interface TreeState {
  treeSelectData: NodeTree
  treeSelectListData: NodeTree[]
  treeAllData: NodeTree[]
}

export const useTreeStore = defineStore('tree', {
  state: (): TreeState => ({
    treeSelectData: {
      id: '0',
      name: '',
      type: 'windfarm',
      isGroupe: false,
      isSelected: false,
      canSelected: false
    },
    treeSelectListData: [],
    treeAllData: [
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
    treeSelect: (state) => state.treeSelectData,
    treeSelectList: (state) => state.treeSelectListData,
    tree: (state) => state.treeAllData
  },

  actions: {
    // add element where is checked to the list
    addTreeSelectList(tree: NodeTree) {
      this.treeSelectListData = [...this.treeSelectListData, tree]
    },

    // is uncheck remove element
    removeTreeSelectList(tree: NodeTree) {
      this.treeSelectListData.splice(this.treeSelectListData.indexOf(tree), 1)
    },
   // add last element where is checked to the list
    setTreeSelect(tree: NodeTree) {
      this.treeSelectData = tree
    }
  }
})
