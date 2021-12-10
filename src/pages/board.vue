<template>
    <section class="board flex" v-if="getBoard" :style="getBoard.style">
        <nav-side @closeModal="closeModal" :class="ShowModal"/>
        <div>

        <nav-board  />
        <groups />
        </div>
        <router-view />
    </section>
</template>

<script>
import navBoard from '../cmp/nav-board.vue';
import groups from '../cmp/groups.vue';
import NavSide from '../cmp/nav-side.vue';
export default {
    name: 'board',
    components: {
        groups,
        navBoard,
        NavSide,
    },
    data() {
        return {
              isOpenModal:false,
        };
    },
    created() {
        const boardId = this.$route.params.boardId;
        this.loadBoard(boardId);
        
        this.$store.dispatch({ type: 'addColors' });
    },
    methods: {
        closeModal(){
        this.isOpenModal = !this.isOpenModal
        },
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
            ShowModal() {
      return this.isOpenModal ? "open-nav" : "close-nav";
    },
        getBoard() {
            // console.log(this.$store.getters.getBoard.style);
            // console.log(this.$store.getters.getBoard.color);
            return this.$store.getters.getBoard;
        },
    },
    watch:{
        "$route.params.boardId"(){
             const boardId = this.$route.params.boardId;
        this.loadBoard(boardId);
            console.log('lalal');
        }
    }
};
</script>

<style></style>
