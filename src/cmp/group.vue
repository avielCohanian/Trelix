<template>
  <section class="group-container">
    <div class="group">
      <header>
        <el-input
          ref="input"
          class="edit-title"
          size="mini"
          :class="{ focus: isEditTitle }"
          v-model="group.title"
          @keyup.enter.native="editTitle"
          @click.native="editTitle"
        ></el-input>
        <i class="el-icon-more" @click="openModal = !openModal"></i>
      </header>
      <div class="modal" v-if="openModal">
        <div class="title">
          <span class="material-icons-outlined" @click="openModal = !openModal"
            >close</span
          >
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
        <draggable
          v-if="group.cards"
          class="card-scroll list-group"
          :list="group.cards"
          @change="onDrug"
          group="people"
        >
          <div v-for="card in group.cards" :key="card.id">
            <card
              :card="card"
              @click.native="showEdit(card.id)"
              @updateGroup="loadGroup"
            />
            <div class="col-3" :value="card" :title="card.title"></div>
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
        </draggable>
      </div>
      <label
        class="add-card"
        for="addCard"
        @click="toggleCard"
        v-if="!isAddCard"
      >
        <!-- <el-input
                    class="opacity"
                    name="addCard"
                    placeholder="+ Add a card"
                ></el-input> -->
        <p class="add-card-btn">
          <span class="material-icons-outlined"> add </span> Add a card
        </p>
      </label>
    </div>
  </section>
</template>

<script>
<<<<<<< HEAD
import draggable from 'vuedraggable';
import member from './edit/edit-member.vue';
import label from './edit-label.vue';
import { boardService } from '../service/board.service';
import card from './card.vue';
=======
import draggable from "vuedraggable";
import member from "./edit-member.vue";
import label from "./edit-label.vue";
import { boardService } from "../service/board.service";
import card from "./card.vue";
>>>>>>> b54c40bff6f619804c1862b8addcaad9bfc8edaa

export default {
  //  display: "Two Lists",
  // order: 1,
  //draggable
  components: {
    card,
    draggable,
    "card-members": member,
    "card-labels": label,
  },
  props: ["group"],
  name: "group",
  data() {
    return {
      title: "xhr",
      isModalAdd: false,
      isEditTitle: false,
      isAddCard: false,
      openModal: false,
      component: {
        currCmp: null,
        name: "",
      },
      // groupToEdit:{},
      newCard: boardService.getEmptyCard(),
    };
  },
  created() {
    // console.log('group in group.vue:', this.group);
  },
  methods: {
    //draggable
    //  add: function() {
    //   this.list.push({ name: "Juan" });
    // },
    // replace: function() {
    //   this.list = [{ name: "Edgard" }];
    // },
    // clone: function(el) {
    //   return {
    //     name: el.name + " cloned"
    //   };
    // },
    dynamicCmp(cmp) {
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
      console.log(this.$refs);
      this.scroll();
      this.isAddCard = !this.isAddCard;
    },
    showEdit(cardId) {
      const { boardId } = this.$route.params;
      // this.$router.push(`board/${boardId}/${cardId}`);
    },
    editTitle() {
      this.isEditTitle = !this.isEditTitle;
      this.updateGroup(this.group);
    },
    async addCard() {
      if (!this.newCard.title) return;
      try {
        await this.$store.dispatch({
          type: "addCard",
          newCard: this.newCard,
          groupId: this.group.id,
        });
        this.newCard = boardService.getEmptyCard();
        this.loadGroup();
      } catch (err) {
        console.log(err);
      }
    },
    async deleteGroup() {
      try {
        await this.$store.dispatch({
          type: "deleteGroup",
          // groupId: this.group.id,
        });
        this.loadGroup();
      } catch (err) {
        console.log(err);
      }
    },
    async updateGroup() {
      try {
        await this.$store.dispatch({
          type: "updateGroup",
          group: this.group,
        });
        this.loadGroup();
      } catch (err) {
        console.log(err);
      }
    },
    loadGroup() {
      this.$emit("updateGroup");
    },
    onDrug(evt) {
      window.console.log(evt);
      this.updateGroup();
    },
  },
  computed: {
    getEmptyCard() {
      return this.newCard;
    },
    // cardsToShow() {
    // return this.group.cards
    // },
  },
  watch: {
    isEditTitle() {
      console.log(this.$refs.input);
      if (this.isEditTitle) {
        this.$refs.input.select();
      } else this.$refs.input.focus();
    },
    // group(val){
    //   this.group = val
    // }
  },
};
</script>

<style></style>
