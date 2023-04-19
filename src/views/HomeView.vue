<template>
    <DefaultLayout>
        <p>2023 - PRESENT @ HENDRI WILLIAM</p>
        <button @click="handleStart">Start</button>
        <button @click="handleStop">Stop</button>
        <p>Status: {{ status }}</p>
        <p>Result: {{ result }}</p>
        <button @click="sendRequestCompletion(promptnya)">Send Prompt</button>
        <p>{{ resultAI }}</p>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "../components/layout/DefaultLayout.vue";
import SR from "../utils/voice";
import words from "../utils/grammar";
import { ref } from "vue";
import CompletionChatGPT from "../utils/openai";
const newCompletion = new CompletionChatGPT();

async function sendRequestCompletion(prompt: string): Promise<void> {
    const response = await newCompletion.sendPrompt(prompt);
    resultAI.value = response.choices[0].text;
    console.log(response);
    return;
}

const promptnya = ref<string>(
    "Tolong sarankan saya 5 tempat di Indonesia dengan biaya hidup murah"
);
const resultAI = ref<string | any>("Idle");
const status = ref<string>("Idle");
const result = ref<string>("Idle");

/* eslint-disable */
//memanggil fungsi SR dan mereturn serta mnerapkan hasil return
//kedalam variabel recognition
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
recognition.onend = () => {
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

<style scoped lang="scss"></style>
