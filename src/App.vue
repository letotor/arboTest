<template>
  <div class="bg-blue-400 min-h-screen">
    <nav class="">
      <ul class="flex align-middle justify-evenly">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/treeview">Treeview</router-link></li>
        <li><router-link to="/treeview2">recursive-checkbox</router-link></li>
      </ul>
    </nav>
    <RouterView class="pt-16" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
<style lang="scss">
@import './assets/scss/base.scss';
@import './assets/scss/debug.scss';
@import './assets/ouput.css';

.header {
  background: red($color: #000000);
}
</style>
