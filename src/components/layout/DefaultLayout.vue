<template>
    <div class="layout">
        <Navbar />
        <slot></slot>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Navbar from "../UI/Navbar.vue";
import Footer from "../UI/Footer.vue";
</script>

<style lang="scss" scoped>
.layout {
    box-sizing: border-box;
    padding: 10;
    width: 100%;
}
</style>
