import { defineStore } from 'pinia'
import type NodeTree from '../interfaces/nodeTree.interface'

export const useTreeStore = defineStore('tree', {
  state: () => ({
    tree: [] as NodeTree[],
    treeInit: [] as NodeTree[],
    selectedNode: null as NodeTree | null,
    selectedNodeId: undefined as string | undefined,
    manySelectedNode: [] as NodeTree[],
    nodeMap: new Map<string, NodeTree>()
  }),
  getters: {
    getTree: (state) => state.tree,
    getSelectedNode: (state) => state.selectedNode,
    getManySelectedNode: (state) => state.manySelectedNode
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
    setSelectedNode(nodeId: string): void {
      this.selectedNodeId = nodeId
    },

    addSeletedNodeToList(node: NodeTree) {
      this.manySelectedNode.push(node)
    },
    removeSeletedNodeToList(node: NodeTree) {
      this.manySelectedNode.splice(this.manySelectedNode.indexOf(node), 1)
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

    getNumberNodeSelected(): number {
      return 0
    },
    checkChildren(node: NodeTree): void {
      if (node.isGroupe && node.nodes) {
        for (const child of node.nodes) {
          child.isSelected = true
          this.manySelectedNode = [...this.manySelectedNode, child]
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
    updateTreeBySame(node: NodeTree): void {
      const nodeType = node.type
      this.tree = this.tree.map((treeNode) => {
        if (treeNode.type !== nodeType) {
          return { ...treeNode, canSelected: false }
        } else {
          return { ...treeNode, canSelected: true }
        }
      })
    },

    //reourne le noeud p
    modifyNodeTree(node: NodeTree, id: string) {
      this.tree
        .filter((nodeElt) => node.id === nodeElt.id)
        .map((nodeElt) => {
          nodeElt.canSelected = node.canSelected
          nodeElt.isSelected = node.isSelected
          nodeElt.isGroupe = node.isGroupe
          nodeElt.nodes = node.nodes
          nodeElt.type = node.type
          nodeElt.name = node.name
        })

      // const findNode = (node: NodeTree): NodeTree | null => {
      //   if (node.id === id) return node
      //   if (node.nodes) {
      //     for (const child of node.nodes) {
      //       const found = findNode(child)
      //       if (found) return found
      //     }
      //   }
      //   return null
      // }
      // for (const node of this.tree) {
      //   const found = findNode(node)
      //   if (found) return found
      // }
      // return null
    },

    desactiveAllNodeByType(type: string) {
      console.debug('desactiveAllNodeByType0', this.tree)
      this.tree
        .filter((node) => node.type !== type)
        .map((node) => {
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
      })
    }
  }
})
