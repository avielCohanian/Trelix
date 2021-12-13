<template>
  <section class="full" @click.stop>
    <section class="nav-board" :style="color">
      <ul class="left">
        <li class="edit-title-container">
          <el-input
            ref="input"
            class="edit-title style"
            size="mini"
            :class="{ focus: isEditTitle }"
            v-model="board.title"
            @keyup.enter.native="editTitle"
            @click.native="editTitle"
          ></el-input>
        </li>

        <li
          class="el-icon-star-off pointer star"
          @click="changeFavorite"
          :class="{ 'star-on': isStarOn, 'star-false': !isStarOn }"
        ></li>

        <span class="divider"></span>
        <div class="icon-user pointer">
          <li v-for="member in board.members" :key="member._id" class="avatar-logo" @click="showProfile(member)">
            <avatar
              v-if="member.imgUrl"
              :src="member.imgUrl"
              :size="35"
              :username="member.fullname"
              class="member icon-member"
            ></avatar>
            <avatar v-else :size="35" :username="member.fullname" class="member icon-member"></avatar>
          </li>
        </div>
        <li class="icon pointer" @click="toggleInvite">
          <span class="material-icons-outlined">person_add</span>Invite
        </li>
        <li class="icon pointer show-menu" @click="toggleMenu"><span class="el-icon-more icon"></span> Show menu</li>
      </ul>
      <div class="modal" v-if="isShowProfile">
        <div class="title">
          <i class="el-icon-close pointer" @click="isShowProfile = !isShowProfile"></i>
        </div>

        <div class="user-details">
          <div>
            <avatar
              v-if="currMember.imgUrl"
              :src="currMember.imgUrl"
              :size="50"
              username="currMember.username"
              class="member"
            ></avatar>
            <avatar v-else :size="50" username="currMember.username" class="member"></avatar>
          </div>
          <div class="name">
            <strong>{{ currMember.fullname }}</strong>
            <div class="mail">{{ currMember.email }}</div>
          </div>
        </div>

        <div class="choice">
          <div class="btn-choice pointer" @click="removeMember">Remove from board...</div>
        </div>
      </div>
      <ul class="right">
        <boardMember v-if="isInvite" @closeModel="toggleInvite" />
        <!-- <span class="divider"></span> -->
        <!-- <li class="icon pointer">
          <span class="material-icons-outlined">filter_list</span>Filter
        </li> -->
      </ul>
    </section>
    <nav-menu @closeMenu="toggleMenu" :isShow="showMenu" :class="isShowMenu" />
  </section>
</template>

<script>
import avatar from 'vue-avatar';
import navMenu from './menu/nav-menu.vue';
import boardMember from './board-member.vue';

export default {
  name: 'navBoard',
  // props: ["getBoard"],
  data() {
    return {
      board: null,
      isStarOn: false,
      isEditTitle: false,
      isShowProfile: false,
      showMenu: false,
      currMember: null,
      isInvite: false,
    };
  },
  created() {
    this.getBoard();
  },
  computed: {
    isShowMenu() {
      return this.showMenu ? 'open-menu' : 'close-menu';
    },
    color() {
      return this.getBoard.color;
    },
  },
  methods: {
    getBoard() {
      return (this.board = JSON.parse(JSON.stringify(this.$store.getters.getBoard)));
    },
    async changeFavorite(change = this.isStarOn) {
      this.isStarOn = !this.isStarOn;
      await this.$store.dispatch({ type: 'changeFavorit', change });
      this.$store.dispatch({ type: 'loadBoards' });
    },

    async editTitle() {
      try {
        this.isEditTitle = !this.isEditTitle;
        await this.$store.dispatch({ type: 'updateBoard', board: this.board });
        // this.getBoard()
      } catch (err) {
        console.log(err);
      }
    },
    toggleInvite() {
      this.isInvite = !this.isInvite;
    },
    async removeMember() {
      try {
        await this.$store.dispatch({
          type: 'removeMember',
          member: this.currMember,
          // board: this.board
        });
        this.isShowProfile = false;
        await this.$store.dispatch({
          type: 'updateUserBoard',
          update: { userId: this.currMember._id, type: false, boardId: this.board._id },
        });
      } catch (err) {
        console.log(err);
      }
    },

    showProfile(member) {
      this.isShowProfile = !this.isShowProfile;
      this.currMember = member;
    },
    toggleMenu() {
      console.log('hi');
      this.showMenu = !this.showMenu;
    },
  },
  watch: {
    '$store.getters.getBoard'() {
      this.getBoard();
    },
    isEditTitle() {
      if (this.isEditTitle) {
        this.$refs.input.select();
      } else this.$refs.input.focus();
    },
  },

  mounted() {},
  components: {
    avatar,
    navMenu,
    boardMember,
  },
};
</script>

<style>
/* .nav-board li.edit-title-container .edit-title.style input {
  
      color: rgb(250, 71, 0);
      background-color: #0000;
} */
/* .newColor{
background-color: ;
} */
</style>
