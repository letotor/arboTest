import nodeData from './nodeData.interface'

export default interface NodeTree {
  nodeData: nodeData
  isGroupe: boolean
  isSelected: boolean
  canSelected: boolean
  nodes?: NodeTree[]
}
