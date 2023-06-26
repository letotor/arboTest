import { windTurbineInterface as windTurbine } from './windTurbine.interface'
import { deviceInterface as otherDevice } from './device.interface'

export interface ObjectSelectedInterface {
  id: string
  name: string
  type: 'WindFarm' | 'windTurbine' | 'otherDevice'
  children?: windTurbine[] | otherDevice[]
}
