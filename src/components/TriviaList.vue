<template>
  <template v-for="(trivia, index) in triviaList">
    <trivia-list-item :trivia="trivia" />
  </template>
</template>

<script setup>
import TriviaListItem from './TriviaListItem.vue'

const triviaList = [
  { question: 'What is the capital of France?', answer: 'Paris' },
  { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' },
  { question: 'Who wrote "To Kill a Mockingbird"?', answer: 'Harper Lee' },
]

</script>