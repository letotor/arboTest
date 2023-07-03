import NodeTree from '../interfaces/nodeTree.interface'
type ElementType = 'windfarm' | 'pv' |  'windturbine' | 'substation' | 'lidar' | 'meter' | 'RTU' | 'GWE'



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
        return parentEnfant; 
      }
    }

    if (noeudCourant.nodes?.some(child => child.id === nodeChildId)) {
      return noeudCourant; // Parent trouvé, on le renvoie directement
    }
  }

  return undefined; // Aucun parent trouvé
}

function  getAllItemIsSelected(nodeArray : NodeTree[]) : NodeTree[]{
  let returnArray : NodeTree[] = []
  // RG  uniquement les items qui ne sont pas des groupe et qui sont sélectionnés
  nodeArray.map((node)=>{
    if(node.isSelected && !node.isGroupe){
      returnArray.push(node)
    }
    if(node.nodes){
      returnArray = returnArray.concat(getAllItemIsSelected(node.nodes))
    }
  })

  return returnArray

}

function updateAllCanSelectedByType(nodeArray:NodeTree[], type : ElementType) {
  for (const item of nodeArray) {
    if (item.type !== type) {
      item.canSelected = false;
    }else{
      item.canSelected = true;
    }
    if (item.nodes) {
      updateAllCanSelectedByType(item.nodes,type);
    }
  }
}

export  {countIsSeleted,findParent,getAllItemIsSelected,updateAllCanSelectedByType}
