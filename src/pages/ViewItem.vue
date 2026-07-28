<template>
    <div class="view-item w-full text-center py-8 px-16">
        <div class="border-2 border-slate-300 py-8 px-16">
            <div class="text-md">
                #{{ id }}
            </div>
            
            <div v-if="item.voice">
                <button class="view-item-button" @click="playVoice">
                    <BoomBox />
                </button>
            </div>

            <div class="text-3xl/6 py-12">
                "{{ item.quote }}"
            </div>

            <div v-if="showAnswer" class="text-3xl/6 pt-8 pb-4">
                <img v-if="item.image" :src="item.image" class="view-item image py-4 mx-auto w-md" />
                <span class="font-light italic">{{ item.game }}</span>
            </div>

            <div class="py-12" v-if="!showAnswer">
                <button class="view-item-button" @click="clickAnswerButton">Answer</button>
            </div>

            <div class="py-12">
                <button class="view-item-button" @click="backToList">Back to List</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { triviaList as listData } from './../data/triviaList.js'
import { BoomBox } from '@lucide/vue';

const router = useRouter();
const item = ref({});
const showAnswer = ref(false);
const useImageWidth = ref(false);
const useImageHeight = ref(false);

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
});

const fetchItem = async (id) => {
    const triviaItem = listData.list[id - 1];
    item.value = triviaItem;
};

const playVoice = () => {
    console.log('play voice clicked.');
}

const clickAnswerButton = () => {
    showAnswer.value = true;
}

const backToList = () => {
    router.push('/');
};

onMounted(() => {
    fetchItem(props.id);
});
</script>
