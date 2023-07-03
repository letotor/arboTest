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
    setSelectedNode(nodeId: string): void {
      this.selectedNodeId = nodeId
    },
    findParent(tree: NodeTree[], nodeChildId: string): NodeTree | undefined {
      for (let i = 0; i < tree.length; i++) {
        const noeudCourant = tree[i];
    
        if (noeudCourant.nodes) {
          // Recherche récursive dans les enfants
          const parentEnfant = this.findParent(noeudCourant.nodes, nodeChildId);
          if (parentEnfant) {
            return parentEnfant; // Parent trouvé, on le renvoie directement
          }
        }
    
        if (noeudCourant.nodes?.some(child => child.id === nodeChildId)) {
          return noeudCourant; // Parent trouvé, on le renvoie directement
        }
      }
    
      return undefined; // Aucun parent trouvé
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
      const countIsSelected = (nodes: NodeTree[]): number => {
        let count = 0;
        nodes.forEach((node) => {
          if (node.isSelected) {
            count++;
          }
          if (node.nodes) {
            count += countIsSelected(node.nodes);
          }
        });
    
        return count;
      };
    
      return countIsSelected(this.tree);
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


     activeOnlyNodeBySameType(typeDevice: NodeTree['type']) {
      this.tree.map((elt) => {
        if (elt) {
          return changeCanBeSeleted(elt, typeDevice)
        }
        function changeCanBeSeleted(node: NodeTree, type: NodeTree['type']) {
          node.canSelected = node.type === type
          const nodeChild = node?.nodes
          if (nodeChild)
            nodeChild.map((childNode: NodeTree) => {
              changeCanBeSeleted(childNode, type)
            })
        }
      })

     },
    
     
     activeAllNodeByAllType() {
      this.tree.map((elt) => {
        if (elt) {
          return changeCanBeSeleted(elt)
        }
        function changeCanBeSeleted(node: NodeTree) {
          node.canSelected =true
          const nodeChild = node?.nodes
          if (nodeChild)
            nodeChild.map((childNode: NodeTree) => {
              changeCanBeSeleted(childNode)
            })
        }
      })}
     
  
  }
})
