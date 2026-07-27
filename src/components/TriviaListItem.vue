<template>
  [Trivia List Item - {{ trivia.question }}]
</template>

<script setup>
import { toRef, computed } from 'vue'

const props = defineProps({
  trivia: {
    type: Object,
    required: true
  }
});
</script>