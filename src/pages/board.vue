<template>
  <section>
    <section class="board flex" v-if="getBoard" :style="getBoard.style">
      <nav-side @closeModal="closeModal" :class="ShowModal" />
      <div class="container-board">
        <nav-board :getBoard="getBoard" />
        <groups />
      </div>
      <router-view />
    </section>
    <div class="screen-loader" v-else>
      <div class="loader"></div>
    </div>
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
      isOpenModal: false,
    };
  },
  created() {
    const boardId = this.$route.params.boardId;
    this.loadBoard(boardId);
    this.$store.dispatch({ type: 'addColors' });
  },
  methods: {
        closeModal() {
            this.isOpenModal = !this.isOpenModal;
        },
        async loadBoard(boardId) {
            try {
                await this.$store.dispatch({
                    type: 'loadBoard',
                    boardId,
                });
                // socketService.on(
                //     `update${this.$store.getters.getBoard._id}`,
                //     this.updateBoard
                // );
            } catch (err) {
                console.log(err);
            }
        },
        // updateBoard(updateBoard) {
        //     this.$store.commit({ type: 'setBoard', board: updateBoard });
        // },
    
  },
  computed: {
    ShowModal() {
      return this.isOpenModal ? 'open-nav' : 'close-nav';
    },
    getBoard() {
      this.$store.commit({
        type: 'updateStyleHeader',
        color: { background: ' rgba(0, 0, 0, 0.32)' },
      });
      return this.$store.getters.getBoard;
    },
  },

  watch: {
    '$route.params.boardId'() {
      const boardId = this.$route.params.boardId;
      this.loadBoard(boardId);
    },
  },
};
</script>

<style>
.container-board {
  height: 93vh;
}
</style>
