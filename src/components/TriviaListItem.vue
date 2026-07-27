<template>
   <div :class="{'trivia-list-item rounded-lg shadow-md':true, 'selected': isSelected }" @click="handleClick">
        <div class="trivia-list-item-key">
            {{ number }}
        </div>
   </div>
</template>

<script setup>
import { useTallyStore } from './../store/tally.js';
import { useRouter } from 'vue-router'

const tallyStore = useTallyStore();
const router = useRouter();

const props = defineProps({
  number: {
    type: Number
  },
  isSelected: {
    type: Boolean,
    default: false,
  }
});

const handleClick = async () => {
    if (props.number) {
        const arrayIdx = props.number - 1; //Array starts with zero
        await tallyStore.setSelectedValue(arrayIdx);
        router.push(`/view/${arrayIdx}`);
    }
};
</script>