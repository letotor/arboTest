import { defineStore } from 'pinia'
import type NodeTree from '../interfaces/nodeTree.interface'

export const useTreeStore = defineStore('tree', {
  state: () => ({
    tree:  [] as NodeTree[],
    treeInit: [] as NodeTree[],
    selectedNode: null as NodeTree |null,
    manySelectedNode: [] as NodeTree[],
  }),
  getters: {
    getTree: (state) => state.tree,
    getSelectedNode: (state) => state.selectedNode,
    getManySelectedNode: (state) => state.manySelectedNode,
  },
  actions: {
    setTree(tree: NodeTree[]) {
      this.tree = tree
    },
    setTreeInit(tree: NodeTree[]) {
      this.treeInit = tree
    },
    setSelectNode(node: NodeTree | null) {
      this.selectedNode = node
    },

    addSeletedNodeToList(node: NodeTree) {
      this.manySelectedNode.push(node)
    },
    removeTreeSelectList(node: NodeTree) {
      this.manySelectedNode .splice(this.manySelectedNode.indexOf(node), 1)
    },
    clearTreeSelectList() {
      this.manySelectedNode = []
    },

    getNodebyId(id: string): NodeTree | null {
      const findNode = (node: NodeTree): NodeTree | null => {
        if (node.id === id) return node
        if (node.nodes) {
          for (const child of node.nodes) {
            const found = findNode(child)
            if (found) return found
          }
        }
        return null
      }
      for (const node of this.tree) {
        const found = findNode(node)
        if (found) return found
      }
      return null
    },

    //reourne le noeud p
    modifyNodeTree(node: NodeTree,id:string) 
    {
      const findNode = (node: NodeTree): NodeTree | null => {
        if (node.id === id) return node
        if (node.nodes) {
          for (const child of node.nodes) {
            const found = findNode(child)
            if (found) return found
          }
        }
        return null
      }
      for (const node of this.tree) {
        const found = findNode(node)
        if (found) return found
      }
      return null
    }
    
  },
})
