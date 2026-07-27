<template>
  <div class="grid sm:grid-cols-4 md:grid-cols-12 gap-3">
    <div v-for="i in total" :key="i">
        <trivia-list-item :number="(i)" :isSelected="checkIfAlreadySelected(i)" />
    </div>
  </div>
</template>

<script setup>
import TriviaListItem from './TriviaListItem.vue'
import { triviaList as listData } from '../data/triviaList.js'
import { useTallyStore } from './../store/tally.js'
import { ref, onMounted } from 'vue'

const tallyStore = useTallyStore();
const selectedValues = ref([])

const total = listData.list.length;


const checkIfAlreadySelected = (id) => {
  let array = selectedValues.value;
  return array.includes(id-1);
} 

onMounted(() => {
  let fromStore = tallyStore.getSelected;
  selectedValues.value = fromStore;
})

</script>