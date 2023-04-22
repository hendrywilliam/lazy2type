<template>
    <div class="layout">
        <Navbar />
        <slot></slot>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Footer from "../UI/Footer.vue";
import Navbar from "../UI/Navbar.vue";
</script>

<style lang="scss" scoped>
.layout {
    box-sizing: border-box;
    padding: 10;
    width: 100%;
}
</style>
