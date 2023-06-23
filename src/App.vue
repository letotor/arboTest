<template>
  <div class="">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import {RouterView } from 'vue-router'
</script>
<style lang="scss">
@import './assets/scss/base.scss';
@import './assets/scss/debug.scss';
@import '../dist/assets/ouput.css';

.header {
 color: white;
}
</style>
