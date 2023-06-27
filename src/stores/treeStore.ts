import { defineStore } from 'pinia'
import type NodeTree from '../interfaces/nodeTree.interface'

export const useTreeStore = defineStore('tree', {
  state: () => ({
    tree:  [] as NodeTree[],
    treeInit: [] as NodeTree[],
    selectedNode: null as NodeTree |null,
    manySelectedNode: [] as NodeTree[],
    nodeMap: new Map<string, NodeTree>(),
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
    removeSeletedNodeToList(node: NodeTree) {
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
     checkChildren(node: NodeTree): void {
      if (node.isGroupe && node.nodes) {
        for (const child of node.nodes) {
          child.isSelected = true
        this.manySelectedNode= [...this.manySelectedNode, child]
          this.checkChildren(child)
        }
      }
    },
    UncheckChildren(node: NodeTree): void {
      if (node.isGroupe && node.nodes) {
        for (const child of node.nodes) {
          child.isSelected = false
          this.manySelectedNode.splice(this.tree.indexOf(child), 1)
          this.UncheckChildren(child)
        }
      }
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
    },
    

    
    desactiveAllNodeByType(type: string) {
      console.debug('desactiveAllNodeByType0', this.tree)
     this.tree.filter((node) => node.type !== type).map((node) => {
        node.canSelected = false
      })
      console.debug('desactiveAllNodeByType1', this.tree)
      
    //reourne le noeud p
    },
    activeAllNodeByType(type: string) {
      this.tree.map((node) => {
        if (node.type === type) {
          node.canSelected = true
        }
      }
      )
    },
  },
})