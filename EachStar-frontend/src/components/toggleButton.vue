<template>
    <button @click="toggleDark()">
        123
        <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
    </button>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
// import { isDark } from '../../.vitepress/theme/composables/dark'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style>

</style>