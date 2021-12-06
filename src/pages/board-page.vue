<template>
    <section class="board-page">
        <nav-boards />
        <main-boards :userBoards="getBoards" @changeFavorit="changeFavorit" />
    </section>
</template>

<script>
import navBoards from '../cmp/boards-page/nav-boards.vue';
import mainBoards from '../cmp/boards-page/main-boards.vue';

export default {
    name: 'boardPage',
    data() {
        return {
            userConnect: {},
            boards: {},
        };
    },
    components: {
        navBoards,
        mainBoards,
    },
    created() {
        this.$store.dispatch({ type: 'loadBoards' });
    },
    methods: {
        async changeFavorit(change) {
            await this.$store.dispatch({ type: 'changeFavorit', change });
            this.$store.dispatch({ type: 'loadBoards' });
        },
    },
    computed: {
        getBoards() {
            this.$store.commit({type:'updateStyleHeader',color:{background: ' #026AA7'}})
            return this.$store.getters.getBoardsForDisplay;
        },
    },
   
};
</script>

<style>

</style>
