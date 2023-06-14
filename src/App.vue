<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <br/>
        <RouterView/>
      </nav>
    </div>
  </header>
</template>


<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>
<style lang="scss">
@use './assets/base.scss' as *;

</style>