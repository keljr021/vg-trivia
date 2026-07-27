<template>

  



  <template v-for="(trivia, index) in list">
    <trivia-list-item :trivia="trivia" />
  </template>
</template>

<script setup>
import TriviaListItem from './TriviaListItem.vue'
import triviaList from '../data/triviaList.json'

const { list } = triviaList;
</script>