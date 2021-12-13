<template>
  <div>
    <section class="edit-attachment" v-if="!isAttTr">
      <header>
        <h2 v-if="header">{{ header }}</h2>
        <a @click="closeModel" class="el-icon-close"> </a>
      </header>

      <ul class="list">
        <li>
          <label class="attachment">
            Computer
            <input type="file" @change="onUploadImg" hidden />
          </label>
          {{ cmp }}
        </li>
        <li>
          <label class="attachment" @click="dynamicCmp($event)" ref="trelixEl"> Trelix </label>
        </li>
      </ul>
      <hr />

      <form @submit.prevent="saveLink">
        <label class="link">Attach a link</label>
        <input type="text" placeholder="Paste any link here..." v-model="att.link" />

        <label v-if="att.link" class="optional-link"
          >Link name(optional)
          <input type="text" v-model="att.name" />
        </label>

        <button hidden></button>
      </form>
      <a class="attach-btn" @click="saveLink">Attach</a>
      <hr />
    </section>
    <section class="trelix" v-else>
      <header>
        <h2 v-if="header">{{ header }}</h2>
        <a @click="closeModel" class="el-icon-close"> </a>
      </header>

      <div class="trelix-container">
        <div class="tr-search">
          Card or board to add:
          <input class="tr-search-input" placeholder="Search terms or URL..." v-model="url" />
        </div>
        <!-- {{ cardsToShow }} -->
        <div class="tr-cards" v-if="cardsToShow">
          <h3>Cards:</h3>
          <!-- v-for="group in boards.groups" :key="group.id" -->
          <ul>
            <li v-for="card in cardsToShow" :key="card.id" @click="addAttTr(card.card.id)">
              <span>{{ card.card.title }}</span>
              <span>in {{ card.group.title }}</span>
            </li>
          </ul>
        </div>

        <ul v-if="board">
          <!-- <p>Boards:</p>
            <li v-for="board in boards" :key="board._id"></li>
            <p>{{board.title}}</p> -->
          <!-- <p>{{board.title}}</p> להבין מה רוציםת מה רשום בכתוביות למטה-->
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { uploadImg } from '../../service/img.service.js';

export default {
  name: 'attachment',
  props: {
    cmp: {
      type: Object,
      // required: true,
    },
    header: {
      type: String,
      // required: true,
    },
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      att: {
        link: '',
        name: '',
      },
      isLoading: false,
      isAttTr: false,
      url: '',
      filterTr: null,
    };
  },
  methods: {
    dynamicCmp(e) {
      this.isAttTr = true;
      // let { x, y } = this.$refs.trelixEl.getBoundingClientRect();
      // let pos = { x, y };
      // console.log(pos);
      // let m = { name: 'attTrelix', pos };

      // let cmp = { name: 'attTrelix', id: null, pos };

      // this.$emit(cmp, 'trelix', pos);
    },

    async onUploadImg(ev) {
      this.isLoading = true;
      let res = await uploadImg(ev);
      let attachment = {
        name: res.original_filename,
        url: res.url,
        upAt: Date.now(),
      };
      this.$emit('computerAttImg', attachment);
      this.isLoading = false;
    },
    saveLink() {
      (this.att.upAt = Date.now()), this.$emit('computerAttLink', this.att);
      this.att = {
        link: '',
        name: '',
      };
    },
    closeModel() {
      this.$emit('closeModel');
    },
    closeModel() {
      this.$emit('closeModel');
    },
    filter() {
      if (this.filterTr) {
        const regex = new RegExp(this.filterLabels, 'i');
        labelToShow = labelToShow.filter((label) => regex.test(label.title));
      }
    },
    addAttTr(cardId) {
      this.$emit('addAttTr', cardId);
      //   this.$emit('closeModel');
    },
  },

  computed: {
    cardsToShow() {
      const board = this.$store.getters.getBoard;
      const cardAttTrelix = board.groups.reduce((acc, g) => {
        g.cards.forEach((c) => {
          if (c.id === this.card.id) return;
          if (this.card.attachment.trelixAttachments.some((cId) => cId === c.id)) return;
          acc.push({ card: c, group: g });
        });
        return acc;
      }, []);
      return cardAttTrelix;
    },

    board() {
      let board = this.$store.getters.getBoard;
      return board;
    },
  },
};
</script>

<style></style>
