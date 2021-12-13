<template>
  <section class="nav-menu">
    <ul class="menu-list" v-if="!showCmp">
      <li class="menu-header">
        <h3 class="back-menu" @click="changeCmp(null)"></h3>
        <h2 class="menu-header-txt">Menu</h2>
        <h3 @click="closeMenu" class="close-menu material-icons-outlined pointer">close</h3>
      </li>
      <hr />
      <div class="container-main">
        <li class="menu-about" @click="changeCmp('aboutBoard')">
          <div class="logo-menu flex">
            <div class="logo"><font-awesome-icon class="logo" :icon="['fab', 'trello']" /></div>
          </div>
          <div class="details">
            <h2>About this board</h2>
            <p>Add a description to your board</p>
          </div>
        </li>
        <li class="menu-background" @click="changeCmp('changeBackground')">
          <div class="logo-menu">
            <div class="border-color" :style="bcgColor"></div>
          </div>
          <div class="details">
            <h2>Change Background</h2>
          </div>
        </li>
        <!-- <li class="menu-stickers" @click="changeCmp('addStickers')">
        <h2> Stickers </h2>
        </li> -->

        <li class="menu-label pointer" @click="changeCmp('labelMenu')">
          <span class="el-icon-price-tag icon logo-menu"></span>
          <div class="details">
            <h2>Labels</h2>
          </div>
        </li>
        <div class="input-link">
          <label for="">
            <h3>Link to this board</h3>
            <el-input :value="getUrl" ref="input"></el-input>
            <p>
              <span class="material-icons-outlined">public</span> Anyone on the internet (including Google) can see this
              board. Only board members can edit.
            </p>
          </label>
        </div>
        <menu-activity :board="getBoard" />
      </div>
    </ul>
    <transition name="slide-fade">
      <component
        :is="getComponent"
        @closeMenu="closeMenu"
        @changeCmp="changeCmp"
        :board="getBoard"
        @changeBcg="changeBcg"
      >
      </component>
    </transition>
  </section>
</template>

<script>
import aboutBoard from './about-board.vue';
import changeBackground from './change-background.vue';
import labelMenu from './label-menu.vue';
import addStickers from './stickers.vue';
import menuActivity from './menu-activity.vue';

export default {
  name: 'smart-cmp-menu',
  props: {
    isShow: { type: Boolean },
  },
  data() {
    return {
      showCmp: null,
      bcgColor: null,
      board: this.getBoard,
    };
  },

  created() {},
  methods: {
    changeCmp(cmp) {
      this.showCmp = cmp;
    },
    closeMenu() {
      this.$emit('closeMenu');
      this.showCmp = null;
    },
    changeBcg(newColor) {
      console.log('bcg change');
      this.bcgColor = newColor;
    },
  },
  components: {
    aboutBoard,
    changeBackground,
    labelMenu,
    addStickers,
    menuActivity,
  },
  watch: {
    isShow() {
      if (this.isShow) {
        this.$refs.input.select();
      }
    },
  },
  computed: {
    getComponent() {
      return this.showCmp;
    },
    getBoard() {
      this.bcgColor = this.$store.getters.getBoard.style;
      return this.$store.getters.getBoard;
    },
    getUrl() {
      return `https://trelix-proj-21.herokuapp.com/#/board/${this.$route.params.boardId}`;
    },
  },
};
</script>

<style></style>
