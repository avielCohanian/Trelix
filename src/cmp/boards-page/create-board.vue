<template>
  <section class="create-new-board">
    <div class="screen-model" @click.stop="close">
      <div class="created-model" v-if="imgs && imgs.length > 0">
        <div class="header-created flex-center">
          <div class="board-title" :style="emptyBoard.style" @click.stop="">
            <input
              class="input-title"
              placeholder="Add board title"
              v-model="emptyBoard.title"
              @click.stop=""
            />
            <div class="material-icons-outlined pointer close-btn" @click.stop="close">close</div>
          </div>
          <ul class="choice-bcg" @click.stop="">
            <li
              class="card-bcg pointer"
              v-for="bgc in getBgcImg"
              :style="bgc.small"
              :key="bgc.description"
              @click="changeBgc(bgc.full ,bgc.color)"
            ></li>
            <li
              class="card-bcg pointer"
              v-for="(bgc, idx) in getBgcColor"
              :style="bgc"
              :key="idx"
              @click="changeBgc(bgc)"
            ></li>
            <li class="card-bcg card-bcg-more pointer"></li>
          </ul>
        </div>

        <button class="btn-create" :style="isTitle" @click="addBoard">Create board</button>
      </div>
    </div>
  </section>
</template>

<script>
import { imgService } from '../../service/img.service.js';
import { boardService } from '../../service/board.service.js';
export default {
  data() {
    return {
      bgcs:[],
      imgs: [],
      emptyBoard: null,
    };
  },
  async created(){
    this.loadColors()
    this.loadEmptyBoard();
    await this.getImgs();
    console.log(this.$route.params );
  },
  methods: {
    loadColors(){
         this.bgcs= boardService.getColors()
      },
    changeBgc(bgc,color) {
      console.log(color);
      this.emptyBoard.style = bgc;
      this.emptyBoard.color = color;
    },
    async addBoard() {
      if (!this.emptyBoard.title) return;
      try {
        this.$store.commit({type:'logIn'})
        const copyUser = JSON.parse(JSON.stringify(this.$store.getters.getUserConnect));
        const newBoard = await boardService.addBoard(this.emptyBoard, copyUser);
        copyUser.boards.boards.push(newBoard._id);
        this.$store.dispatch({ type: 'updateUser', currUser: copyUser });
        this.$router.push(`/board/${newBoard._id}`);
      } catch (err) {
        throw err;
      }
    },
    loadEmptyBoard() {
      this.emptyBoard = boardService.getEmptyBoard();
    },

    close() {
      this.$emit('closeCreate');
    },
    async getImgs(size = 4) {
      const imgs = await imgService.getImgs('Wallpapers', size);
      this.imgs = imgs;
    },
  },
  computed: {
    isTitle() {
      return this.emptyBoard.title ? { cursor: 'pointer' } : { cursor: 'not-allowed' };
    },
    getBgcColor() {
      return this.bgcs.slice(0, 4);
    },
    getBgcImg() {
      return this.imgs;
    },
  },
};
</script>

