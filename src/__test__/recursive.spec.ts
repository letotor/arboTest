import { assert } from 'console'
import { describe, it, expect } from 'vitest'
import countIsSeleted from './recursive'
import NodeTree from '../interfaces/nodeTree.interface'

describe('should render the occurence   item isSeleted', () => {
  it('should render with node children', async () => {
    const count = countIsSeleted([
      {
        id: '0',
        type: 'windfarm',
        name: 'WindFarm',
        isGroupe: true,
        isSelected: false,
        canSelected: true,
        nodes: [
          {
            id: '0-1',
            type: 'windfarm',
            name: 'WindFarm1',
            isGroupe: false,
            isSelected: true,
            canSelected: true,
            nodes: [
              {
                id: '0-1',
                type: 'windfarm',
                name: 'WindFarm1',
                isGroupe: false,
                isSelected: true,
                canSelected: true
              }
            ]
          },
          {
            id: '0-1',
            type: 'windfarm',
            name: 'WindFarm1',
            isGroupe: false,
            isSelected: true,
            canSelected: true,
            nodes: []
          }
        ]
      },
      {
        id: '1',
        type: 'windfarm',
        name: 'WindFarm',
        isGroupe: true,
        isSelected: false,
        canSelected: true
      }
    ])
    expect(count).toEqual(3)
  })
})
