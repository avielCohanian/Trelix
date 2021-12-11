<template>
    <section>
        <section  class="board-page" >
            <nav-boards @showTemp="showCmp" />
            <main-boards 
                :userBoards="getBoards"
                @changeFavorit="changeFavorit"
                v-if="isShowCmp"
            />
            <main-template  v-else />
        </section>
            <!-- v-if="getBoards"
        <div class="screen-loader" v-else>
            <div class="loader"></div>
        </div> -->
    </section>
</template>

<script>
import navBoards from '../cmp/boards-page/nav-boards.vue';
import mainBoards from '../cmp/boards-page/main-boards.vue';
import mainTemplate from '../cmp/boards-page/main-template.vue';

export default {
    name: 'boardPage',
    data() {
        return {
            userConnect: {},
            boards: {},
            isShowCmp: true,
        };
    },
    components: {
        navBoards,
        mainBoards,
        mainTemplate,
    },
    created() {
        this.$store.dispatch({ type: 'loadBoards' });
        this.$store.commit({
            type: 'updateStyleHeader',
            color: { background: ' #026AA7' },
        });
    },
    destroyed() {
        this.$store.commit({ type: 'updateStyleHeader', color: null });
    },
    methods: {
        showCmp(is) {
            this.isShowCmp = is;
        },
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

<style></style>
