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

export default countIsSeleted
