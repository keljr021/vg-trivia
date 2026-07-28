<template>
   <div :class="{'trivia-list-item rounded-lg shadow-md':true, 'selected': isSelected }" @click="handleClick">
        <div class="trivia-list-item-key">
            {{ number }}

            <div class="mx-[35%] mt-2 opacity-35">
              <AudioLines v-if="hasAudio" :size="18" />
            </div>
        </div>
   </div>
</template>

<script setup>
import { useTallyStore } from './../store/tally.js';
import { useRouter } from 'vue-router'
import { AudioLines } from '@lucide/vue';

const tallyStore = useTallyStore();
const router = useRouter();

const props = defineProps({
  number: {
    type: Number
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
  hasAudio: {
    type: Boolean,
    default: false,
  }
});

const handleClick = async () => {
    if (props.number) {
        const arrayIdx = props.number;
        await tallyStore.setSelectedValue(arrayIdx-1);
        router.push(`/view/${arrayIdx}`);
    }
};
</script>