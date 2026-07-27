<template>
  <div class="grid sm:grid-cols-4 md:grid-cols-12 gap-3">
    <div v-for="i in total" :key="i">
        <trivia-list-item :number="(i)" />
    </div>
  </div>
</template>

<script setup>
import TriviaListItem from './TriviaListItem.vue'
import { triviaList as listData } from '../data/triviaList.js'

const total = listData.list.length;
</script>