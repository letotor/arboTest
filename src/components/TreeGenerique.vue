<template>
  <div class="">
    <div class="text-blue-800 text-3xl">{{ componentName }}</div>
    h1>
    <br />
    <ul class="">
      <li v-for="item in items" :key="item.id" @click.stop="handleItemClick(item)">
        <input :id="item.id.toString()" type="checkbox" :checked="item?.selected" />
        <label :for="item.id.toString()" class="flex items-center">
          <img
            v-if="item.device == 'Mobile'"
            src="../assets/images/folder.png"
            alt="Image"
            class="w-4 h-4 mr-2"
          />
          <img
            v-else-if="item.device == 'Desktop'"
            src="../assets/images/windturbine.png"
            alt="Image"
            class="w-4 h-4 mr-2"
          />
          <span>{{ item.name }}</span>
        </label>

        <span class="flex items-center">
          <img src="../assets/images/cheveron.png" alt="Image" class="w-2 h-2 mr-2" />
          <span>{{ item.name }}</span>
        </span>

        <ul v-if="item.children && item.children.length">
          <li
            v-for="child in item.children"
            :key="child.id"
            :class="{ selected: isSelected(child) }"
            @click.stop="handleItemClick(child)"
          >
            <span class="flex items-center">
              <input :id="child.id.toString()" type="checkbox" :checked="child.selected" />
              <img
                v-if="child.device == 'Mobile'"
                src="../assets/images/folder.png"
                alt="Image"
                class="w-4 h-4 mr-2"
              />
              <img
                v-else-if="child.device == 'Desktop'"
                src="../assets/images/windturbine.png"
                alt="Image"
                class="w-4 h-4 mr-2"
              />
              <label :for="child.id.toString()" class="flex items-center">
                <span>{{ child.name }} {{ child.device }}</span>
              </label>
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { createPublicKey } from 'crypto'
import { reactive, ref, computed, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const componentName = ref(router.currentRoute.value.fullPath)
interface Item {
  id: number
  name: string
  device: string
  children?: Item[]
  selected: boolean
}

watchEffect(async () => {
  try {
    const response = await fetch('src/data/dataGroupe.json')
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du fichier JSON')
    }
    const data = await response.json()
    console.log('data', data)
  } catch (error) {
    console.error('Erreur :', error)
  }
})

const items: Item[] = [
  {
    id: 1,
    name: 'Item 1',
    device: 'Desktop',
    children: [
      { id: 2, name: 'Child 1-1', device: 'Mobile', selected: false },
      { id: 3, name: 'Child 1-2', device: 'Desktop', selected: false },
      { id: 4, name: 'Child 1-3', device: 'Tablet', selected: false }
    ],
    selected: false
  },
  {
    id: 5,
    name: 'Item 2',
    device: 'Mobile',
    children: [
      { id: 6, name: 'Child 2-1', device: 'Mobile', selected: false },
      { id: 7, name: 'Child 2-2', device: 'Desktop', selected: false }
    ],
    selected: true
  }
]

const state = reactive({
  items
})

const isSelected = (item: Item): boolean => {
  // Ajoutez ici votre logique de sélection des enfants
  return item.selected
}

const handleItemClick = (item: Item): void => {
  console.log('click', item)
  if (item.children && item.children.length) {
    item.children.forEach((child: Item) => {
      child.selected = true
    })
  }
}

const isChecked = (item: Item): boolean => {
  // Vérifie si tous les enfants de l'élément sont sélectionnés
  if (item.children && item.children.length) {
    return item.children.every((child: Item) => isSelected(child))
  }
  return false
}

const selectedChildren = computed(() => {
  const selected: Item[] = []
  state.items.forEach((item: Item) => {
    if (item.children && item.children.length) {
      item.children.forEach((child: Item) => {
        if (child.selected) {
          selected.push(child)
        }
      })
    }
  })
  return selected
})
</script>

<style scoped>
.selected {
  font-weight: bold;
}
</style>
