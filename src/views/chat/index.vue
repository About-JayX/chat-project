<template>
    <div>
        <textarea name="" id="" cols="30" rows="10" v-model="text"></textarea>
        <button @click="sendMessage">发送</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = ref<number | string>("ddd")
const ws = window.WebSocket && (new WebSocket('ws://localhost:6061/'))
ws.onopen = () => {
    console.log('连接');
}
ws.onmessage = (msg) => {
    console.log(JSON.parse(msg.data), "msg");


}
const sendMessage = () => {
    let sendInfo = { context: text.value }
    ws.send(JSON.stringify(sendInfo))
}
</script>

<style lang="scss"></style>