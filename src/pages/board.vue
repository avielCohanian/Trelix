<template>
    <section class="board" v-if="getBoard" :style="getBoard.style">
        <nav-board :getBoard="getBoard" />

        <groups />
        <router-view />
    </section>
</template>

<script>
import navBoard from '../cmp/nav-board.vue';
import groups from '../cmp/groups.vue';
export default {
    name: 'board',
    components: {
        groups,
        navBoard,
    },
    data() {
        return {};
    },
    created() {
        // const boardId = this.$params.boardId;
        this.$store.dispatch({ type: 'loadImgsAndColor' });
    },
    methods: {},
    computed: {
        getBoard() {
            return this.$store.getters.getBoard;
        },
    },
};
</script>

<style></style>
