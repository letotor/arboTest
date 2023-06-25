<template>
  <div class="bg-blue-100">
    <br />
    <ul>
      

      <!-- 1 er niveau windFarmGroupe -->
      <li>
      
       <span class="flex items-center">
        <input :id="treeData.id" type="checkbox" :checked="treeData.selected" />
        <img v-if="treeData.type === 'group'" src="../assets/images/folder.png" alt="Image" class="w-4 h-4 mr-2" />
        <img v-else-if="treeData.type === 'windTurbine'" src="../assets/images/windturbine.png" alt="Image" class="w-4 h-4 mr-2" />
        <label :for="treeData.id" class="flex items-center">
          <span>{{ treeData.name }}</span>
        </label>
      </span>
      </li>
      


       <!-- 

         <input :id="item.id" type="checkbox" :checked="item.selected" />
        <label :for="item.id" class="flex items-center">
          <img v-if="item.type === 'group'" src="../assets/images/folder.png" alt="Image" class="w-4 h-4 mr-2" />
          <img v-else-if="item.type === 'windTurbine'" src="../assets/images/windturbine.png" alt="Image" class="w-4 h-4 mr-2" />
          <span>{{ item.name }}</span>
        </label>
        
        <span class="flex items-center">
          <img src="../assets/images/cheveron.png" alt="Image" class="w-2 h-2 mr-2" />
          <span>{{ item.name }}</span>
        </span>
        -->
        <ul v-if="treeData.children && treeData.children.length">
          <li v-for="child in treeData.children" :key="child.id" :class="{ selected: isSelected(child) }" @click.stop="handleItemClick(child)">
            <span class="flex items-center">
              <input :id="child.id" type="checkbox" :checked="child.selected" />
              <img v-if="child.type === 'group'" src="../assets/images/folder.png" alt="Image" class="w-4 h-4 mr-2" />
              <img v-else-if="child.type === 'windTurbine'" src="../assets/images/windturbine.png" alt="Image" class="w-4 h-4 mr-2" />
              <label :for="child.id" class="flex items-center">
                <span>{{ child.name }}</span>
              </label>
            
            </span>
          </li>
        </ul> 


    </ul>
   
    
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, watchEffect } from 'vue'

interface TreeNode {
  id: number;
  name: string;
  type: string;
  children: TreeNode[];
  isSelected: boolean;
  canSelected: boolean;
}

const treeData = reactive<TreeNode >( {
  id: 0,
  name: '',
  type: '',
  children: [],
  isSelected: false,
  canSelected: false,
});


watchEffect(async () => {
  try {
    const response = await fetch('src/data/dataGroupe.json');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du fichier JSON');
    }
    const jsonData = await response.json();
    Object.assign(treeData, jsonData); // Met à jour les propriétés de l'objet réactif
    console.log('data', treeData);

    
  } catch (error) {
    console.error('Erreur :', error);
  }
});



const state = reactive({
  items: treeData.children
});

const isSelected = (item: TreeNode): boolean => {
  if (item.type === 'group') {
    // Ajoutez ici votre logique de sélection des enfants de type 'group'
    return item.isSelected;
  } else {
    // Ajoutez ici votre logique de sélection des autres types d'éléments
    return item.isSelected;
  }
};

const handleItemClick = (item: TreeNode): void => {
  if (item.canSelected) {
    item.isSelected = !item.isSelected;
    if (item.type === 'group') {
      // Appliquez ici la logique de sélection des enfants de type 'group'
      item.children.forEach((child: TreeNode) => {
        child.isSelected = item.isSelected;
      });
    }
  }
};

const selectedChildren = computed(() => {
  const selected: TreeNode[] = [];
  state.items.forEach((item: TreeNode) => {
    if (item.isSelected) {
      selected.push(item);
    }
  });
  return selected;
});
</script>

<style scoped>
.selected {
  font-weight: bold;
}
</style>
