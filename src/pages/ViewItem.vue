<template>
    <div class="w-full text-center py-8 px-16">
        View Item Page

        <div>{{ id }}</div>
        <div>{{ item }}</div>

        <div>
            <button class="view-item-button" @click="backToList">Back to List</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { triviaList as listData } from './../data/triviaList.js'

const router = useRouter();
const item = ref({});

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
});

const fetchItem = async (id) => {
    const triviaItem = listData.list[id - 1];
    console.log(' -- fetchItem triggered - id:', id, 'triviaItem:', triviaItem);
    item.value = triviaItem;
};

const backToList = () => {
    router.push('/');
};

onMounted(() => {
    fetchItem(props.id);
});
</script>
