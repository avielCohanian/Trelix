<template>
    <section class="board-page">
        <nav-boards @showTemp="showCmp"/>
        <main-boards :userBoards="getBoards" @changeFavorit="changeFavorit" v-if="isShowCmp" />
        <main-template :templateBoards="templateBoards" v-else />
        
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
            isShowCmp:true,
            templateBoards:[]
        };
    },
    components: {
        navBoards,
        mainBoards,
        mainTemplate
    },
    created() {
        this.$store.dispatch({ type: 'loadBoards' });
    },
    methods: {
        
        showCmp(is){
            this.isShowCmp=is
        },
        async changeFavorit(change) {
            await this.$store.dispatch({ type: 'changeFavorit', change });
            this.$store.dispatch({ type: 'loadBoards' });
        },
    },
    computed: {
        getBoards() {
            // console.log(this.$store.getters.getBoardsForDisplay);
            this.$store.commit({type:'updateStyleHeader',color:{background: ' #026AA7'}})
            return this.$store.getters.getBoardsForDisplay;
        },
    },
    watch:{
        '$store.getters.getUserConnect'(){
            console.log(this.$store.getters.getUserConnect,'$store.getters.getUserConnect');
        }
    }
   
};
</script>

<style>

</style>
