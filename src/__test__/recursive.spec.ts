import { describe, it, expect } from 'vitest'
import { countIsSeleted, findParent, getAllItemIsSelected,updateAllCanSelectedByType } from './recursive'
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
                id: '0-1-1',
                type: 'windfarm',
                name: 'WindFarm1',
                isGroupe: false,
                isSelected: true,
                canSelected: true
              }
            ]
          },
          {
            id: '0-2',
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
  }),
    it('should retrieve node parents with node children', async () => {
      const node: NodeTree[] = [
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
                  id: '0-1-1',
                  type: 'windfarm',
                  name: 'WindFarm1',
                  isGroupe: false,
                  isSelected: true,
                  canSelected: true
                }
              ]
            },
            {
              id: '0-2',
              type: 'windfarm',
              name: 'WindFarm1',
              isGroupe: false,
              isSelected: true,
              canSelected: true,
              nodes: []
            }
          ]
        }
      ]

      const nodeParents = {
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
                id: '0-1-1',
                type: 'windfarm',
                name: 'WindFarm1',
                isGroupe: false,
                isSelected: true,
                canSelected: true
              }
            ]
          },
          {
            id: '0-2',
            type: 'windfarm',
            name: 'WindFarm1',
            isGroupe: false,
            isSelected: true,
            canSelected: true,
            nodes: []
          }
        ]
      }
      const parent = findParent(node, '0-2')

      expect(parent).toEqual(nodeParents)
    })
})
  describe('should list item whivh isSeleted ', () => {
    it('should render list windTurbine seleted', async () => {
      const node: NodeTree[] = [
        {
          id: '0',
          type: 'windfarm',
          name: 'WindFarm Groupe',
          isGroupe: true,
          isSelected: false,
          canSelected: true,
          nodes: [
            {
              id: '0-1',
              type: 'windfarm',
              name: 'WindFarm1',
              isGroupe: true,
              isSelected: false,
              canSelected: true,
              nodes: [
                {
                  id: '0-1-0',
                  type: 'windturbine',
                  name: 'WindTurbines',
                  isGroupe: true,
                  isSelected: true,
                  canSelected: true,
                  nodes: [
                    {
                      id: '0-1-0-1',
                      type: 'windturbine',
                      name: 'WindTurbine1',
                      isGroupe: false,
                      isSelected: true,
                      canSelected: true
                    },
                    {
                      id: '0-1-0-2',
                      type: 'windturbine',
                      name: 'WindTurbine2',
                      isGroupe: false,
                      isSelected: true,
                      canSelected: true
                    },
                    {
                      id: '0-1-0-3',
                      type: 'windturbine',
                      name: 'WindTurbine3',
                      isGroupe: false,
                      isSelected: true,
                      canSelected: true
                    }
                  ]
                },
                {
                  id: '0-1-1',
                  type: 'substation',
                  name: 'Substation',
                  isGroupe: true,
                  isSelected: false,
                  canSelected: true,
                  nodes: [
                    {
                      id: '0-1-1-0',
                      type: 'substation',
                      name: 'Automates',
                      isGroupe: true,
                      isSelected: false,
                      canSelected: true,
                      nodes: [
                        {
                          id: '0-1-1-0-1',
                          type: 'substation',
                          name: 'RTU',
                          isGroupe: false,
                          isSelected: false,
                          canSelected: true
                        },
                        {
                          id: '0-1-1-0-2',
                          type: 'substation',
                          name: 'GWE',
                          isGroupe: false,
                          isSelected: false,
                          canSelected: true
                        }
                      ]
                    },
                    {
                      id: '0-1-1-1',
                      type: 'meter',
                      name: 'Meter 1',
                      isGroupe: false,
                      isSelected: false,
                      canSelected: true
                    }
                  ]
                },
                {
                  id: '0-1-2',
                  type: 'lidar',
                  name: 'Lidar',
                  isGroupe: false,
                  isSelected: false,
                  canSelected: true
                }
              ]
            },
            {
              id: '0-2',
              type: 'windfarm',
              name: 'WindFarm2',
              isGroupe: false,
              isSelected: false,
              canSelected: true
            }
          ]
        },
        {
          id: '1',
          type: 'windfarm',
          name: 'windfarm22',
          isGroupe: true,
          isSelected: false,
          canSelected: true,
          nodes: [
            {
              id: '1-1',
              type: 'windfarm',
              name: 'winturbi222',
              isGroupe: false,
              isSelected: false,
              canSelected: true,
              nodes: [
                {
                  id: '1-1-1',
                  type: 'windturbine',
                  name: 'WindTurbines',
                  isGroupe: true,
                  isSelected: false,
                  canSelected: true,
                  nodes: [
                    {
                      id: '1-1-1-1',
                      type: 'windturbine',
                      name: 'WindTurbine11',
                      isGroupe: false,
                      isSelected: false,
                      canSelected: true
                    },
                    {
                      id: '1-1-1-2',
                      type: 'windturbine',
                      name: 'WindTurbine12',
                      isGroupe: false,
                      isSelected: false,
                      canSelected: true
                    },
                    {
                      id: '1-1-1-3',
                      type: 'windturbine',
                      name: 'WindTurbine13',
                      isGroupe: false,
                      isSelected: true,
                      canSelected: true
                    }
                  ]
                },
                {
                  id: '1-1-1',
                  type: 'substation',
                  name: 'Substation',
                  isGroupe: false,
                  isSelected: false,
                  canSelected: true,
                  nodes: [
                    {
                      id: '1-1-1-1',
                      type: 'substation',
                      name: 'Automates',
                      isGroupe: true,
                      isSelected: false,
                      canSelected: true,
                      nodes: [
                        {
                          id: '1-1-1-1-1',
                          type: 'substation',
                          name: 'RTU',
                          isGroupe: false,
                          isSelected: false,
                          canSelected: true
                        },
                        {
                          id: '1-1-1-1-2',
                          type: 'substation',
                          name: 'GWE',
                          isGroupe: false,
                          isSelected: false,
                          canSelected: true
                        }
                      ]
                    },
                    {
                      id: '1-1-1-1',
                      type: 'meter',
                      name: 'Meter 1',
                      isGroupe: false,
                      isSelected: false,
                      canSelected: true
                    }
                  ]
                },
                {
                  id: '1-1-2',
                  type: 'lidar',
                  name: 'Lidar',
                  isGroupe: false,
                  isSelected: false,
                  canSelected: true
                }
              ]
            },
            {
              id: '1-2',
              type: 'windfarm',
              name: 'windfarm',
              isGroupe: false,
              isSelected: false,
              canSelected: true
            }
          ]
        },
        {
          id: '2',
          type: 'pv',
          name: 'PVPlant',
          isGroupe: true,
          isSelected: false,
          canSelected: true
        }
      ]

      const resAttempt: NodeTree[] = [
        {
          id: '0-1',
          type: 'windturbine',
          name: 'windturbine',
          isGroupe: false,
          isSelected: true,
          canSelected: true
        },
        {
          id: '0-1-1',
          type: 'windturbine',
          name: 'windturbine1',
          isGroupe: false,
          isSelected: true,
          canSelected: true
        },

      ]

      const result = getAllItemIsSelected(node)
      // expect(node).toEqual(node)
      //expect(result).toEqual(resAttempt)
    })
  })




  describe('shoud desactive all node with node.type is not equal to the Type argiment', () => {
    it('should return the node with all node desactive', async () => {

    const dataIn : NodeTree[] = [
      {
        id: '0',
        type: 'windfarm',
        name: 'windfarm',
        isGroupe: true,
        isSelected: false,
        canSelected: true,
        nodes: [
          {
            id: '0-1',
            type: 'windturbine',
            name: 'windturbine',
            isGroupe: true,
            isSelected: false,
            canSelected: true,
            nodes: [

              {
                id: '0-1-1',
                type: 'windturbine',
                name: 'windturbine1',
                isGroupe: false,
                isSelected: true,
                canSelected: true
              },
              {
                id: '0-1-2',
                type: 'windturbine',
                name: 'windturbine2',
                isGroupe: false,
                isSelected: false,
                canSelected: true
              }
            ]
          },
          {
            id: '0-2',
            type: 'windfarm',
            name: 'windfarm2',
            isGroupe: false,
            isSelected: false,
            canSelected: true
          }
          ,
          {
            id: '0-3',
            type: 'windfarm',
            name: 'windfarm3',
            isGroupe: false,

            isSelected: false,
            canSelected: true
          }
         ]
      }
    ]
    
    
    const dataOut = [
      {
        id: '0',
        type: 'windfarm',
        name: 'windfarm123456789',
        isGroupe: true,
        isSelected: false,
        canSelected: false,
        nodes: [
          {
            id: '0-1',
            type: 'windturbine',
            name: 'windturbine',
            isGroupe: true,
            isSelected: false,
            canSelected: true,
            nodes: [

              {
                id: '0-1-1',
                type: 'windturbine',
                name: 'windturbine1',
                isGroupe: false,
                isSelected: true,
                canSelected: true
              },
              {
                id: '0-1-2',
                type: 'windturbine',
                name: 'windturbine2',
                isGroupe: false,
                isSelected: false,
                canSelected: true
              }
            ]
          },
          {
            id: '0-2',
            type: 'windfarm',
            name: 'windfarm2',
            isGroupe: false,
            isSelected: false,
            canSelected: false
          }
          ,
          {
            id: '0-3',
            type: 'windfarm',
            name: 'windfarm3',
            isGroupe: false,

            isSelected: false,
            canSelected: false
          }
         ]
      }
    ]

    const result = updateAllCanSelectedByType(dataIn, 'windturbine')
    //console.log('result', dataIn)
    expect(result).toEqual(dataOut)


          
  })

})