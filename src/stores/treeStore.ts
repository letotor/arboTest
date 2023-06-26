import { defineStore } from 'pinia'
import type NodeTree from '@/interfaces/nodeTree.interface'

export const useTreeStore = defineStore('tree', {
  state: () => ({
    tree: [] as NodeTree[],
    treeSelectNode: null as NodeTree | null,
    treeSelectList: [] as NodeTree[],
  }),
  getters: {
    getTree: (state) => state.tree,
    getTreeSelectNode: (state) => state.treeSelectNode,
    getTreeSelectList: (state) => state.treeSelectList,
  },
  actions: {
    setTree(tree: NodeTree[]) {
      this.tree = tree
    },
    setTreeSelect(node: NodeTree | null) {
      this.treeSelectNode = node
    },
    addTreeSelectList(node: NodeTree) {
      this.treeSelectList.splice(0, 0, node);
    },
    removeTreeSelectList(node: NodeTree) {
      this.treeSelectList = this.treeSelectList.filter((n) => n.id !== node.id)
    },

    selectGroupAndChildren(group: NodeTree) {
      // Sélectionnez le groupe lui-même
      group.isSelected = true;
  
      // Parcourez tous les enfants du groupe
      const stack = [...group.nodes];
      while (stack.length > 0) {
        const node = stack.pop();
        if (node) {
          // Sélectionnez l'enfant
          node.isSelected = true;
  
          // Si l'enfant est un groupe, ajoutez ses enfants à la pile pour les sélectionner également
          if (node.isGroupe && node.nodes) {
            stack.push(...node.nodes);
          }
        }
      }
    }
  },
})
