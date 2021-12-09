<template>
<section class="nav-side" @click.stop>
  <div class="nav-close" v-if="!isOpen">

<button class="btn-open" @click.stop="closeModal" >
          <img
            src="https://a.trellocdn.com/prgb/dist/images/workspace-navigation/chevron-left.58243262833f693f6101.svg"
            alt=""
          />
        </button>
  </div>
  <div class="nav-side-container" v-else>
    <div class="nav-header">
      <div class="logo-t">
        <div class="txt-t">T</div>
      </div>
      <div class="header-container">
        <span class="trelix">Trelix Workspace</span>
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
        <div class="plus"><span class="material-icons-outlined"> add </span></div>
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

</section>

</template>

<script>
import avatar from "vue-avatar";
import navMenu from "./menu/nav-menu.vue";
import boardMember from "./board-member.vue";

export default {
  name: "navSide",

  data() {
    return {
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
  },
};
</script>

<style>
</style>
