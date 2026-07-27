<template>
   <div class="trivia-list-item rounded-lg shadow-md" @click="handleClick">
        <div class="trivia-list-item-key">
            {{ number }}
        </div>
   </div>
</template>

<script setup>
import { toRef, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const props = defineProps({
  number: {
    type: Number
  }
});

const handleClick = () => {
    router.push(`/view/${props.number}`);
};
</script>