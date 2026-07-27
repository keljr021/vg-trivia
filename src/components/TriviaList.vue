<template>
  <div class="grid sm:grid-cols-4 md:grid-cols-12 gap-3">
    <div v-for="(item, i) in list" :key="i">
        <trivia-list-item :trivia="item" :number="(i+1)" />
    </div>
  </div>
</template>

<script setup>
import TriviaListItem from './TriviaListItem.vue'
import { triviaList as listData } from '../data/triviaList.js'

const { list } = listData;
</script>