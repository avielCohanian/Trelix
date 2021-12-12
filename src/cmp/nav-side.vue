<template>
   <transition name="slide-fade">
<section class="nav-side" @click.stop>
  <div class="nav-close" v-if="!isOpen">

<button class="btn-open" @click.stop="closeModal" >
  <span class="material-icons-outlined arrow">
navigate_next
</span >
          <!-- <img
            src="https://a.trellocdn.com/prgb/dist/images/workspace-navigation/chevron-left.58243262833f693f6101.svg"
            alt=""
          /> -->
        </button>
  </div>
  <div class="nav-side-container" v-else>
    <div class="nav-header">
      <div class="logo-t">
        <div class="txt-t">T</div>
      </div>
      <div class="header-container">
        <span class="trelix-work">Trelix Workspace</span>
        <p class="mini-header">Free</p>
      </div>
      <div>
        <button class="btn-back" @click.stop="closeModal">
          <img
            src="https://a.trellocdn.com/prgb/dist/images/workspace-navigation/chevron-left.58243262833f693f6101.svg"
            alt=""
          />
        </button>
      </div>
    </div>
      <hr />
      <div class="title">
        <h2>Your boards</h2>
        <div class="plus" @click="CreateBoard"><span class="material-icons-outlined"> add </span></div>
      </div>
      <!-- @click="moveToBoard(board._id)" -->
      <div class="board-list-container" v-for="board in getBoardsForDisplay.boards" :key="board._id" >
        <router-link :to="`${board._id}`">
        <div class="board-img" >
          <div class="img" :style="board.style"></div>
        </div>
        <div class="board-name">{{board.title}}</div>
        </router-link>
      </div>
  </div>
 <div class="create-board" v-if="iScreateBoard" >
          <create-board @closeCreate="CreateBoard" />
        </div>
</section>
   </transition>

</template>

<script>
import avatar from "vue-avatar";
import navMenu from "./menu/nav-menu.vue";
import boardMember from "./board-member.vue";
import createBoard from '../cmp/boards-page/create-board.vue'

export default {
  name: "navSide",

  data() {
    return {
      iScreateBoard:null,
      boards:null,
      isOpen:false,
    };
  },
  created(){

 this.$store.dispatch({type:'loadBoards'})
  },
  computed: {
    getBoardsForDisplay(){
      console.log(this.$store.getters.getBoardsForDisplay);
        return this.$store.getters.getBoardsForDisplay
    }
  },
  methods: {
    CreateBoard(){
        this.iScreateBoard = !this.iScreateBoard
      },
    closeModal(){
    this.isOpen = !this.isOpen
    this.$emit('closeModal')
    },

    // moveToBoard(boardId) {
    //   return this.$router.push(`/board/${boardId}`)
    // },
  },
  watch: {},

  mounted() {},
  components: {
    avatar,
    navMenu,
    boardMember,
    createBoard
  },
};
</script>

<style>
.create-board{
  position: fixed;
  z-index: 10;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
