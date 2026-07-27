<template>
    <div class="w-full text-center py-8 px-16">
        View Item Page

        <div>{{ id }}</div>
        <div>{{ item }}</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { triviaList as listData } from './../data/triviaList.js'

const item = ref({});

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
});

const fetchItem = async (id) => {
    debugger;
    const triviaItem = listData.list[id - 1];
    console.log(' -- fetchItem triggered - id:', id, 'triviaItem:', triviaItem);
    item.value = triviaItem;
};

onMounted(() => {
    fetchItem(props.id);
});
</script>
