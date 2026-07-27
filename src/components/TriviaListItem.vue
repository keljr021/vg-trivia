<template>
   <div class="trivia-list-item rounded-lg shadow-md">
        <div class="trivia-list-item-key">
            {{ number }}
        </div>
   </div>
</template>

<script setup>
import { toRef, computed } from 'vue'

const props = defineProps({
  trivia: {
    type: Object,
    required: true
  },
  number: {
    type: Number,
    required: true
  }
});
</script>