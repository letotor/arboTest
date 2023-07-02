import NodeTree from '../interfaces/nodeTree.interface'

function countIsSeleted(node: NodeTree[]): number {
  let count = 0

  node.map((node) => {
    if (node.isSelected) {
      count++
    }
    if (node.nodes) {
      count += countIsSeleted(node.nodes)
    }
  })

  return count
}


function findParent(tree: NodeTree[], nodeChildId: string): NodeTree | undefined {
  for (let i = 0; i < tree.length; i++) {
    const noeudCourant = tree[i];

    if (noeudCourant.nodes) {
      // Recherche récursive dans les enfants
      const parentEnfant = findParent(noeudCourant.nodes, nodeChildId);
      if (parentEnfant) {
        return parentEnfant; // Parent trouvé, on le renvoie directement
      }
    }

    if (noeudCourant.nodes?.some(child => child.id === nodeChildId)) {
      return noeudCourant; // Parent trouvé, on le renvoie directement
    }
  }

  return undefined; // Aucun parent trouvé
}


// function pour retrouver le parent d'un node en fonction de son id
// function findParent(node: NodeTree[], id: string): NodeTree | null {
//   let parent: NodeTree | null = null
//
//   node.map((node) => {
//     if (node.id === id) {
//       parent = node
//     }
//     if (node.nodes) {
//       parent = findParent(node.nodes, id)
//     }
//   })
//
//   return parent
// }





export  {countIsSeleted,findParent}
