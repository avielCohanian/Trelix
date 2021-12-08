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
        const boardId = this.$route.params.boardId;
        this.loadBoard(boardId);
        
        this.$store.dispatch({ type: 'addColors' });
    },
    methods: {
        async loadBoard(boardId) {
            try {
                var res = await this.$store.dispatch({
                    type: 'loadBoard',
                    boardId,
                });
            } catch (err) {
                console.log(err);
            }
        },
    },
    computed: {
        getBoard() {
            // console.log(this.$store.getters.getBoard.style);
            // console.log(this.$store.getters.getBoard.color);
            return this.$store.getters.getBoard;
        },
    },
};
</script>

<style></style>
