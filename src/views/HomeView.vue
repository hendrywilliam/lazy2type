<template>
    <DefaultLayout>
        <main class="main">
            <p class="main__big-header">Beep boop beep boop🤖</p>
            <button @click="handleStart">Start</button>
            <button @click="handleStop">Stop</button>
            <p>Status: {{ status }}</p>
            <p>Result: {{ result }}</p>
            <button @click="sendRequestCompletion(promptnya)">
                Send Prompt
            </button>
            <button @click="sendChatCompletion(promptnya)">
                SEND REQUEST CHAT
            </button>
            <p>{{ resultAI }}</p>
        </main>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "../components/layout/DefaultLayout.vue";
import SR from "../utils/voice";
import words from "../utils/grammar";
import { ref } from "vue";
import { TextCompletionChatGPT, ChatCompletionChatGPT } from "../utils/openai";
const newCompletion = new TextCompletionChatGPT();
const chatCompletion = new ChatCompletionChatGPT();

async function sendRequestCompletion(prompt: string): Promise<void> {
    const response = await newCompletion.sendTextPrompt(prompt);
    resultAI.value = response.choices[0].text;
    console.log(response);
    return;
}

async function sendChatCompletion(prompt: string): Promise<void> {
    const res = await chatCompletion.sendChatPrompt(prompt);
    resultAI.value = res.choices[0].message.content;
    console.log(res);
}

// async function sendChatCompletion(prompt: string): Promise

const promptnya = ref<string>(
    "Tolong sarankan saya 3 tempat di Indonesia dengan biaya hidup murah, serta rata-rata biaya hidup"
);
const resultAI = ref<string | any>("Idle");
const status = ref<string>("Idle");
const result = ref<string>("Idle");

/* eslint-disable */
const recognition: SpeechRecognition = SR(words);

function handleStart() {
    recognition.start();
}

function handleStop() {
    recognition.stop();
}
//callback ketika audio ditangkap oleh mic
recognition.onaudiostart = () => {
    console.log("Capturing voice");
};
//callback ketika tombol handle start ditekan / .start di fire
recognition.onstart = () => {
    status.value = "Start listening";
};
//callback ketika tombol stop ditekan/ .stop difire
recognition.onend = (): void => {
    status.value = "Stop listening";
};

//callback ketika recognition sudah menerima hasil.
recognition.onresult = (event: SpeechRecognitionEvent) => {
    console.log(event.results);
    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            result.value = event.results[i][0].transcript;
        } else {
            result.value += event.results[i][0].transcript;
        }
    }
};
</script>

<style scoped lang="scss">
.main {
    &__big-header {
        font-size: 60px;
        font-weight: bold;
    }
}
</style>
