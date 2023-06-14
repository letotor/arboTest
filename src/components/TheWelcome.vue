<template>
    <div>
        Welcome
        {{ ACCESS_TOKEN }}
    </div>
</template>

<script setup lang="ts">
 const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

</script>

<style scoped lang="scss">

</style>