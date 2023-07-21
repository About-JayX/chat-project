<template>
    <div>
        <button @click="sendMessage">Send Message</button>
        <ul>
          <li v-for="message in messages" :key="message">{{ message }}</li>
        </ul>
    </div>
    
</template>

<script setup lang="ts">
import {onBeforeUnmount, reactive} from 'vue'
import { io } from "socket.io-client";

const socket = io('api');
const messages = reactive<any[]>([]);
socket.on('res',(data:any)=>{
    messages.push(data)
})
const sendMessage = () => {
  console.log(1);
  socket.emit('msg', 'Hello from Vue client');
};

// 在组件卸载之前断开连接
onBeforeUnmount(() => {
  socket.disconnect();
});

</script>

<style scoped lang="scss">

</style>