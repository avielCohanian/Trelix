<template>
    <section class="chat-room">
        <ul>
            <li v-for="(msg, idx) in msgs" :key="idx">
                <span>{{ msg.from }}:</span>{{ msg.txt }}
            </li>
            <span>{{ typingUser }}</span>
        </ul>

        <form @submit.prevent="sendMsg">
            <input
                type="text"
                v-model="msg.txt"
                placeholder="Your msg"
                @input="typing"
            />
            <button>Send</button>
        </form>
    </section>
</template>

<script>
import { socketService } from '../service/socket.service.js';

export default {
    name: 'chatRoom',
    props: {
        toyId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            msg: { from: this.$store.getters.currUser.username, txt: '' },
            msgs: [],
            user: this.$store.getters.currUser.username,
            topic: this.toyId,
            typingUser: '',
        };
    },
    created() {
        // socketService.setup();
        // socketService.emit('chat topic', this.topic);
        // socketService.on('chat addMsg', this.addMsg);
        // socketService.on('user typing', this.userTyping);
        // socketService.on('stopTyping', this.stopTyping);
    },
    destroyed() {
        socketService.off('chat addMsg', this.addMsg);
        // socketService.terminate();
    },
    methods: {
        addMsg(msg) {
            this.msgs.push(msg);
        },
        sendMsg() {
            socketService.emit('chat newMsg', this.msg);
            socketService.emit('stopTyping');
            // TODO: next line not needed after connecting to backend
            // this.addMsg(this.msg);
            // setTimeout(() => this.addMsg({ from: 'Dummy', txt: 'Yey' }), 2000);
            this.msg = { from: this.user, txt: '' };
        },
        changeTopic() {
            socketService.emit('chat topic', this.topic);
        },
        userTyping(user) {
            this.typingUser = user + ':is typing...';
        },
        typing() {
            socketService.emit('user typing', this.user);
        },
        stopTyping() {
            this.typingUser = '';
        },
    },
};
</script>

<style></style>
