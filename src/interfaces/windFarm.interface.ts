import { windTurbineInterface as windTurbine } from './windTurbine.interface'
export interface WindFarmInterface {
  id: string
  name: string
  displayName: string
  windTurbines: windTurbine[]
}
