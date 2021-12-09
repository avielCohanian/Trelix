<template>
  <div id="app">
    <app-header />
    <router-view class="main-layout"></router-view>
  </div>
</template>

<script>
import appHeader from '../src/cmp/app-header';
import { socketService } from './service/socket.service.js';

export default {
  data() {
    return {
      loadUser: false,
    };
  },
  created() {
    //  socketService.on('update board',this.msg)
    //     socketService.on('update board', msg=>{console.log(msg)})
  },
  // destroyed(){
  //   socketService.off(`update${this.$store.getters.getBoard._id}`)
  // },
  methods: {
    updateBoard(updateBoard) {
      // console.log(updateBoard.activities,'chack 2');

      this.$store.commit({ type: 'setBoard', board: updateBoard });
    },
    updateCard(updateCard) {
      console.log(updateCard);
      // commit({ type: 'setBoard', board: updateBoard });
      this.$store.commit({ type: 'setCard', card: updateCard });
    },
  },
  created() {
    this.$store.dispatch({ type: 'logIn', user: { email: 'eligranat@gmail.com', password: 'p' } });
    // this.loadUser = true;
  },
  components: {
    appHeader,
  },
  computed: {},
  watch: {
    '$store.getters.getBoard'() {
      if (this.$store.getters.getBoard) {
        socketService.on(`update${this.$store.getters.getBoard._id}`, this.updateBoard);
      }
    },
    '$store.getters.currCard'() {
      if (this.$store.getters.currCard) {
        // console.log(this.$store.getters.currCard,'before');
        socketService.on(`updateCard${this.$store.getters.currCard.id}`, this.updateCard);
        // console.log(this.$store.getters.currCard ,'after');
      }
    },
  },
};
</script>
