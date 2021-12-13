<template>
  <section class="trelix">
    <header>
      <h2 v-if="header">{{ header }}</h2>
      <a @click="closeModel" class="el-icon-close"> </a>
    </header>

    <div class="trelix-container">
      <div class="tr-search">
        Card or board to add:
        <input class="tr-search-input" placeholder="Search terms or URL..." v-model="url" />
      </div>

      <div class="tr-cards" v-if="boards">
        <h3>Cards:</h3>
        <!-- v-for="group in boards.groups" :key="group.id" -->
        <ul v-for="group in boards.groups" :key="group.id">
          <li v-for="card in group.cards" :key="card.id" @click="addAttTr(card.id)">
            <span>{{ card.title }}</span>
            <span>in {{ boards.title }}</span>
          </li>
        </ul>
      </div>

      <ul v-if="boards">
        <!-- <p>Boards:</p>
            <li v-for="board in boards" :key="board._id"></li>
            <p>{{board.title}}</p> -->
        <!-- <p>{{board.title}}</p> להבין מה רוציםת מה רשום בכתוביות למטה-->
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'trelix',
  props: {
    cmp: {
      type: Object,
      // required: true,
    },
    card: {
      type: Object,
      // required: true,
    },
    header: {
      type: String,
      // required: true,
    },
  },
  data() {
    return {
      url: '',
      filterTr: null,
    };
  },
  created() {},
  methods: {
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
    boards() {
      let board = this.$store.getters.getBoard;
      //   let card = null;
      //   board.groups.forEach((g) => {
      //     g.cars.forEach((c) => {
      //       card.push(c);
      //     });
      //   });
      //   if (this.filterTr) {
      //     const regex = new RegExp(this.filterTr, 'i');
      //     board = board.filter((card) => regex.test(card.title));
      //   }
      console.log(this.$store.getters.getBoard);
      return board;
    },

    cardsToShow() {
      const board = this.$store.getters.getBoard;
      const cardAttTrelix = board.groups.reduce((acc, g) => {
        g.cards.forEach((c) => {
          c.attachment.trelixAttachments.forEach((cI) => {
            console.log(cI);
            if (cI !== c.id && cI !== this.card.id) acc.push(c);
          });
        });
        return acc;
      }, []);
      return cardAttTrelix;
    },
  },
};
</script>

<style></style>
