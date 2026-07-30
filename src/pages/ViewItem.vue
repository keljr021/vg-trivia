<template>
    <div class="view-item relative my-8 mx-16">

        <div class="py-2">
            <button class="view-item-button" @click="backToList">Back to List</button>
        </div>
        
        <div class="flex items-stretch content-center w-full py-8 px-16 border-2 border-slate-300 rounded-lg">

            <div class="flex-1 w-1/2 float-left">
                 <div class="text-md">
                    #{{ id }}
                </div>

                <div v-if="item.voice">
                    <button class="view-item-button" @click="playVoice">
                        <Headphones />
                    </button>
                </div>

                <div class="text-4xl/15 py-12">
                    "{{ item.quote }}"
                </div>
            </div>

            <div class="flex-1 w-1/2 float-left text-center my-auto">
                <div v-if="showAnswer" class="text-3xl/11 pt-8 pb-4">
                    <img v-if="item.image" :src="getImageSrc(item.image)" class="view-item-image image py-4 mx-auto w-sm" />
                    <span class="font-light italic">{{ item.game }}&nbsp;</span>
                    <span class="font-light italic">({{ item.year }}) </span><br>
                    <span class="text-lg font-light italic">{{ item.platform }}</span>
                </div>

                <div class="py-12" v-if="!showAnswer">
                    <button class="view-item-button" @click="clickAnswerButton">Answer</button>
                </div>

            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import videoGameQuotes from './../data/videoGameQuotes.js'
import { Headphones } from '@lucide/vue';
import defaultVoiceSrc from './../audio/jill-sandwitch.ogg';

const router = useRouter();
const item = ref({});
const showAnswer = ref(false);

const localImageMap = import.meta.glob('../screenshots/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,gif}', {
    eager: true,
    import: 'default'
});

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
});

const fetchItem = async (id) => {
    const triviaItem = videoGameQuotes[id - 1];
    item.value = triviaItem;
};

const getImageSrc = (src) => {
    if (!src) return '';

    const trimmedSrc = src.trim();

    if (/\.(jpe?g|png|webp|gif)$/i.test(trimmedSrc)) {
        const localSrc = `../screenshots/${trimmedSrc}`;
        return localImageMap[localSrc] || trimmedSrc;
    }

    return trimmedSrc;
};

const playVoice = async () => {
    console.log('play voice clicked.');

    let resolvedVoiceSrc = defaultVoiceSrc;

    if (item.value?.voice) {
        try {
            resolvedVoiceSrc = (await import(`./../audio/${item.value.voice}.ogg`)).default;
        } catch (error) {
            console.error('Failed to import voice asset:', error);
        }
    }

    const voice = new Audio(resolvedVoiceSrc);
    voice.play().then(() => {
      console.log("Audio playing successfully.");
    })
    .catch((error) => {
      // Catching NotSupportedError or NotAllowedError
      console.error("Playback failed:", error.name, error.message);
    });
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
