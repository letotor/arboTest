type ElementType = 'windfarm' | 'windturbine' | 'lidar' | 'meter' | 'RTU' | 'GWE'


export default interface NodeTree {
  id: string
  type?: ElementType
  name: string
  isGroupe: boolean
  isSelected: boolean
  canSelected: boolean
  nodes?: NodeTree[]
}
  