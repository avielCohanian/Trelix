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
      if (this.$store.getters.getUserConnect) {
        socketService.on(`updateUser${this.$store.getters.getUserConnect._id}`, this.updateUser);
      }
    },
    methods: {
      updateCard(updateCard) {
        this.$store.commit({ type: 'setCard', card: updateCard });
      },
      updateBoard(updateBoard) {
        this.$store.commit({ type: 'setBoard', board: updateBoard });
      },
      updateUser(user) {
        this.$store.dispatch({ type: 'logIn', user });
      },
      updateGroup(group) {
        this.$store.dispatch({ type: 'logIn', group });
      },
      // updateMouse(mouseEvents){
      //   this.$store.commit({ type: 'updateMouse', mouseEvents });
      // },
    },
    components: {
      appHeader,
    },
    computed: {},

    watch: {
      '$store.getters.currCard'() {
        if (this.$store.getters.currCard) {
          socketService.on(`updateCard${this.$store.getters.currCard.id}`, this.updateCard);
        }
      },
      '$store.getters.getBoard'() {
        if (this.$store.getters.getBoard) {
          socketService.on(`update${this.$store.getters.getBoard._id}`, this.updateBoard);
        }
      },
      '$store.getters.currGroup'() {
        if (this.$store.getters.currGroup) {
          socketService.on(`updateGroup${this.$store.getters.currGroup._id}`, this.updateGroup);
        }
      },

      // '$store.getters.getBoard'() {
      //   if (this.$store.getters.getBoard) {
      //     socketService.on(`updateMouse${this.$store.getters.getBoard._id}`, this.updateMouse);
      //   }
      // },
    },
  };
</script>
