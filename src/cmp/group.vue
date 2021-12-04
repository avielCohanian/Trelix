<template>
  <section class="group-container">
    <div class="group">
      <header>
        <el-input
          class="edit-title"
          size="mini"
          :class="{ focus: isEditTitle }"
          v-model="groupToEdit.title"
          @keyup.enter.native="updateGroup"
          @click.native="updateGroup"
          @blur="updateGroup"
        ></el-input>
        <i class="el-icon-more" @click="openModal = !openModal"></i>
      </header>
      <div class="modal" v-if="openModal">
        <div class="title">
          <span class="material-icons-outlined" @click="openModal = !openModal"
            >close</span>
          <p>List actions</p>
        </div>
        <hr />
        <ul>
          <li @click="openInput">Add card...</li>
          <li>Copy list...</li>
          <li>Move list...</li>
          <li @click="deleteGroup">Archive this list</li>
        </ul>
      </div>
      <div class="modal" v-if="isModalAdd">
        <div class="title">
          <span
            class="material-icons-outlined"
            @click="isModalAdd = !isModalAdd"
            >close</span
          >
          <p>Options</p>
        </div>
        <hr />
        <ul>
          <li @click="dynamicCmp('members')">Members...</li>
          <li @click="dynamicCmp('labels')">Labels...</li>
          <li>Position...</li>
        </ul>
        <div class="dynamic-cmp" v-if="component.currCmp">
          <header>
            <h2>{{ component.name }}</h2>
            <a @click="closeModel" class="el-icon-close"> </a>
          </header>
          <component
            :is="component.currCmp"
            :card="newCard"
            @dynamicCmp="dynamicCmp"
          >
          </component>
        </div>
      </div>
      <div class="card-container">
        <div class="card-scroll">
          <div v-for="card in cardsToShow" :key="card.id">
            <div>
              <card @click="showEdit(card.id)" :card="card" />
            </div>
          </div>
          <label v-if="isAddCard">
            <div class="btn-group">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="Enter a title for this card... "
                v-model="newCard.title"
                @keyup.enter.native="addCard"
              >
              </el-input>
              <div class="btn-add">
                <div class="left">
                  <el-button type="primary" @click="addCard">
                    Add card</el-button
                  >
                  <p class="material-icons-outlined left" @click="toggleCard">
                    close
                  </p>
                </div>
                <p class="el-icon-more more" @click="openModalAdd"></p>
              </div>
            </div>
          </label>
        </div>
      </div>
      <label
        class="add-card"
        for="addCard"
        @click="toggleCard"
        v-if="!isAddCard"
      >
        <el-input
          class="opacity"
          name="addCard"
          placeholder="+ Add a card"
        ></el-input>
      </label>
    </div>
  </section>
</template>

<script>
import member from "./edit-member.vue";
import label from "./edit-label.vue";
import { boardService } from "../service/board.service";
// import { Container, Draggable } from "vue-smooth-dnd";
// import { applyDrag, generateItems } from "../service/util.service.js";
import card from "./card.vue";

export default {
  components: {
    card,
    // Container,
    // Draggable,
    "card-members": member,
    "card-labels": label,
  },
  props: ["group"],
  name: "group",
  data() {
    return {
      // card: boardService.getCardById(),
      isModalAdd: false,
      isEditTitle: false,
      isAddCard: false,
      openModal: false,
      component: {
        currCmp: null,
        name: "",
      },
      groupToEdit: JSON.parse(JSON.stringify(this.group)),
      newCard: boardService.getEmptyCard(),
      cards: this.group.cards,
      // items: generateItems(10, (i) => ({
      //   id: i,
      //   data: "Draggable " + i,
      // })),
    };
  },
  methods: {
    dynamicCmp(cmp) {
      console.log(cmp);
      this.component.name = cmp;
      this.component.currCmp = `card-${cmp}`;
    },
    closeModel() {
      this.component.currCmp = null;
    },
    openModalAdd() {
      this.isModalAdd = !this.isModalAdd;
    },
    openInput() {
      this.openModal = !this.openModal;
      this.toggleCard();
    },
    scroll() {
      var container = this.$el.querySelector(".card-container");
      container.scrollTop = container.scrollHeight;
    },
    toggleCard() {
      this.scroll();
      this.isAddCard = !this.isAddCard;
    },
    showEdit(cardId) {
      this.route.push(`/cardDetails/${cardId}`);
    },
    async updateGroup() {
      console.log(this.group);
      this.isEditTitle = !this.isEditTitle;
      try {
        var res = await this.$store.dispatch({
          type: "updateGroup",
          group: this.groupToEdit,
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    async addCard() {
      try {
        console.log(this.newCard);
        var res = await this.$store.dispatch({
          type: "addCard",
          newCard: this.newCard,
          groupId: this.group.id,
        });
        this.newCard = boardService.getEmptyCard();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteGroup() {
      try {
        var res = await this.$store.dispatch({
          type: "deleteGroup",
          groupId: this.group.id,
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    getEmptyCard() {
      return this.newCard;
    },
    cardsToShow() {
      return this.group.cards;
    },
  },
};
</script>

<style></style>
