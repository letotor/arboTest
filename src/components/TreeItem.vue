// @ts-nocheck
<template>
  <div>
    <h2>Liste des enfants</h2>
    <ul>
      <li v-for="(windFarm, index) in windFarms" :key="windFarm.id">
        <input type="checkbox" v-model="windFarm.isSelected" @change="toggleSelection(windFarm)">
        <h3>{{ windFarm.displayName }} - {{index}} </h3>
        <ul>
          <li v-for="(windTurbine, index) in windFarm.windTurbines" :key="windTurbine.id">
            <input type="checkbox" v-model="windTurbine.isSelected" @change="toggleSelection(windTurbine)">
            {{ windTurbine.displayName }} - {{ index }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref,reactive,  watch } from 'vue';

import jsonData from '../data/data.json';

import { WindFarmInterface as WindFarm, windTurbineInterface as WindTurbine} from '../interfaces';
interface WindFarmSelected {
  id: string;
  name: string;
  displayName: string;
  windTurbines: WindTurbineSelected[];
  isSelected: boolean;
}

interface WindTurbineSelected{
  id: string;
  name: string;
  displayName: string;
  windFarm: string;
  isSelected: boolean;
}

//Lecture de fichier json et transformation en objet js
const windFarms = reactive<WindFarmSelected[]>(jsonData.data.windFarms);

jsonData.data.windFarms.forEach((wf:  WindFarm) => {
  const windFarm: WindFarmSelected = {
    id: wf.id,
    name: wf.name,
    displayName: wf.displayName,
    windTurbines: [],
    isSelected: false
  };

  wf.windTurbines.forEach((wt: WindTurbine) => {
    const windTurbine: WindTurbineSelected = {
      id: wt.id,
      name: wt.name,
      displayName: wt.displayName,
      windFarm: wt.windFarm || wt.windFarmId,
      isSelected: false
    };
    windFarm.windTurbines.push(windTurbine);
  });

  windFarms.push(windFarm);
});

function toggleSelection(windFarm: WindFarmSelected | WindTurbineSelected): void {
  console.log('windFarm',windFarm)


  if ('windTurbines' in windFarm) {
    windFarm.windTurbines.forEach((wt) => {
      wt.isSelected = windFarm.isSelected;
    });

  }
  windFarms.forEach((wf) => {
    wf.isSelected = wf.windTurbines.every((wt) => wt.isSelected);
  });
}

</script>
