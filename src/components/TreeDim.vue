<template>
  <div>
    <ul>
      <li>
        <div class="node" :class="{ selected: treeData.isSelected }">
          <input type="checkbox" v-model="treeData.isSelected" />
          <i class="icon" :class="getIconClass(treeData.type)"></i>
          <label>{{ treeData.name }}</label>
        </div>
        <ul>
          <li v-for="child in treeData.children" :key="child.id">
            <div class="node" :class="{ selected: child.isSelected }">
              <input
                type="checkbox"
                v-model="child.isSelected"
                :disabled="!canSelectChild(child)"
              />
              <i class="icon" :class="getIconClass(child.type)"></i>
              <label>{{ child.name }}</label>
            </div>
            <ul v-if="child.children">
              <li v-for="subChild in child.children" :key="subChild.id">
                <div class="node" :class="{ selected: subChild.isSelected }">
                  <input type="checkbox" v-model="subChild.isSelected" />
                  <i class="icon" :class="getIconClass(subChild.type)"></i>
                  <label>{{ subChild.name }}</label>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, watchEffect } from 'vue'

type ElementType = 'windfarm' | 'windturbine' | 'lidar' | 'meter' | 'RTU' | 'GWE'

interface NodeTree {
  id: string
  type?: ElementType
  name: string
  isGroupe: boolean
  isSelected: boolean
  canSelected: boolean
  children?: NodeTree[]
}

const treeData: NodeTree = reactive({
  id: 'root',
  name: 'root',
  isGroupe: true,
  isSelected: false,
  canSelected: true,
  children: []
})

watchEffect(async () => {
  try {
    const response = await fetch('src/data/dataTree.json')
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du fichier JSON')
    }
    const jsonData = await response.json()
    Object.assign(treeData, jsonData) // Met à jour les propriétés de l'objet réactif sans rompre la réactivité
    console.log('data', treeData)
  } catch (error) {
    console.error('Erreur :', error)
  }
})

function isNodeSelected(node: NodeTree): boolean {
  return node.isSelected
}

/**
 * Retourne true si le noeud peut être sélectionné si tous ses enfants sont sélectionnés
 * @param node
 * @returns
 */
function canSelectNode(node: NodeTree): boolean {
  if (node.isGroupe) {
    return node.children?.every((child) => child.isSelected) ?? false
  } else {
    return node.canSelected
  }
}

function hasChildNodes(node: NodeTree): boolean {
  return Boolean(node.children && node.children.length > 0)
}

function canSelectChild(child: NodeTree): boolean {
  // Vérifier si l'enfant peut être sélectionné en fonction de la règle spécifique
  return child.canSelected
}

function getIconClass(type?: ElementType): string {
  switch (type) {
    case 'windfarm':
      return 'windfarm-icon'
    case 'windturbine':
      return 'windturbine-icon'
    case 'lidar':
      return 'lidar-icon'
    case 'meter':
      return 'meter-icon'
    case 'RTU':
      return 'rtu-icon'
    case 'GWE':
      return 'gwe-icon'
    default:
      return ''
  }
}
</script>

<style scoped>
.node {
  display: flex;
  align-items: center;
}

.selected {
  font-weight: bold;
}

/* Exemple de classes d'icônes */
.windfarm-icon {
  /* Styles pour l'icône de windfarm */
}

.windturbine-icon {
  /* Styles pour l'icône de windturbine */
}

.lidar-icon {
  /* Styles pour l'icône de lidar */
}

.meter-icon {
  /* Styles pour l'icône de meter */
}

.rtu-icon {
  /* Styles pour l'icône de RTU */
}

.gwe-icon {
  /* Styles pour l'icône de GWE */
}
</style>
