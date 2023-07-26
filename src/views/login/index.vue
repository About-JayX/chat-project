<template>
    <div class="bg">
        <Register></Register>
    </div>
</template>

<script setup lang="ts">
import Register from './components/LoginOrRegister.vue'

</script>

<style lang="scss">
.bg {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>