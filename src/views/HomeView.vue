<template>
    <DefaultLayout>
        <main class="main">
            <div class="result-chat">
                <div class="result-item">
                    <p class="result-item__content">{{ resultAI }}</p>
                </div>
            </div>
            <div class="main__result-speech">
                <div class="result-speech__content">
                    <p>Result: {{ resultSpeech }}</p>
                </div>
                <button
                    class="result-speech__button"
                    v-if="isMicActive"
                    @click="handleStop"
                >
                    Stop
                </button>
                <button
                    class="result-speech__button"
                    v-else
                    @click="handleStart"
                >
                    Listen
                </button>
            </div>
        </main>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "../components/layout/DefaultLayout.vue";
import SR from "../utils/voice";
import words from "../utils/grammar";
import { ref, watch } from "vue";
import { openaiStream } from "../utils/openai";

const resultAI = ref<string | any>(
    "Beep boop beep boop. I'm on idle, say something!"
);
const resultSpeech = ref<string>("Idle");
const isMicActive = ref<boolean>(false);

async function handleChatCompletion(prompt: string): Promise<void> {
    const result = await openaiStream(prompt);
    resultAI.value = result;
}

/* eslint-disable */
const recognition: SpeechRecognition = SR(words);

function handleStart() {
    isMicActive.value = !isMicActive.value;
    recognition.start();
}

function handleStop() {
    isMicActive.value = !isMicActive.value;
    recognition.stop();
}

//callback ketika recognition sudah menerima hasil.
recognition.onresult = (event: SpeechRecognitionEvent) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            resultSpeech.value = event.results[i][0].transcript;
        } else {
            resultSpeech.value = event.results[i][0].transcript;
        }
    }
};

// programmatically stop => voiceResultWatcher()
const voiceResultWatcher = watch(resultSpeech, (_, __, onCleanup) => {
    const countdownBeforeParty = setTimeout(async () => {
        await handleChatCompletion(resultSpeech.value);
    }, 2000);

    onCleanup(() => {
        clearTimeout(countdownBeforeParty);
    });
});
</script>

<style scoped lang="scss">
.main {
    height: calc(100vh - 120px);
    width: 100vw;
    display: flex;
    padding: 30px;
    align-items: center;
    flex-direction: column;

    @media only screen and (max-width: 1023px) {
        .result-chat {
            margin-bottom: 10px;
            display: flex;
            gap: 10px;
            width: 100%;
            height: 90%;
            overflow-y: auto;

            .result-item {
                display: flex;
                height: max-content;
                width: 100%;
                gap: 10px;

                &__avatar {
                    width: max-content;
                    img {
                        width: 40px;
                    }
                }

                &__content {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }

        &__result-speech {
            width: 100%;
            height: 60px;
            border: 1px solid gray;
            padding: 10px;
            border-radius: 0.5rem;
            display: flex;
            justify-content: space-between;
            .result-speech__content {
                display: flex;
                align-items: center;
                width: 80%;
            }

            .result-speech__button {
                color: #d3d3d3;
                width: 20%;
                background-color: transparent;
                gap: 10px;
                text-decoration: none;
                border: 1px solid #d3d3d3;
                padding: 5px;
                border-radius: 0.5rem;
            }
        }
    }

    @media only screen and (min-width: 1024px) {
        .result-chat {
            border-radius: 0.5rem;
            margin-bottom: 10px;
            display: flex;
            gap: 10px;
            width: 50%;
            padding: 10px;
            height: 90%;
            overflow-y: auto;

            .result-item {
                display: flex;
                height: max-content;
                width: 100%;
                gap: 10px;

                &__avatar {
                    width: max-content;
                    img {
                        width: 40px;
                    }
                }

                &__content {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }

        &__result-speech {
            width: 50%;
            height: 60px;
            border: 1px solid gray;
            padding: 10px;
            border-radius: 0.5rem;
            display: flex;
            justify-content: space-between;
            .result-speech__content {
                display: flex;
                align-items: center;
                width: 90%;
            }

            .result-speech__button {
                color: #d3d3d3;
                width: 10%;
                background-color: transparent;
                gap: 10px;
                text-decoration: none;
                border: 1px solid #d3d3d3;
                padding: 5px;
                border-radius: 0.5rem;
            }
        }
    }
}
</style>
