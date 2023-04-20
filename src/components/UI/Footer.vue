<template>
    <div class="footer">
        <p class="footer__context">
            Powered by <span>Netlify</span> & <span>OpenAI</span> - HENDRI
            WILLIAM @ 2023
        </p>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.footer {
    color: white;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    &__context {
        :first-child {
            color: #20c6b7;
            font-weight: 600;
        }

        :nth-child(2) {
            color: gray;
            font-weight: 600;
        }
    }
}
</style>
