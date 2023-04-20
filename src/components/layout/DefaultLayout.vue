<template>
    <div class="layout">
        <NavBar />
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import NavBar from "../UI/NavBar.vue";
</script>

<style lang="scss" scoped>
.layout {
    box-sizing: border-box;
    padding: 10;
    width: 100%;
    min-height: 100vh;
    border: 5px solid red;
}
</style>
