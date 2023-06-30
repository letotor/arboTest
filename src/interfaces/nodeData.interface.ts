type ElementType = 'windfarm' | 'windturbine' | 'lidar' | 'meter' | 'RTU' | 'GWE'

export default interface nodeData {
  id: string
  name: string
  type?: ElementType
}
