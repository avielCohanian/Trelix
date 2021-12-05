<template>
  <section
    class="card"
    @click="openDetails(card.id)"
    :style="{ background: ' rgb(255, 255, 255)' }"
  >
    <!-- :style="{ background: card.style.bgColor }" -->
    <header
      @mouseover="isHover = true"
      @mouseleave="isHover = false"
      class="single"
    >
      <p>{{ card.title }}</p>
      <div class="hover">
        <p
          class="material-icons-outlined"
          @click.stop="openEditor"
          :style="isShow"
        >
          create
        </p>
      </div>
    </header>

    <!-- img -->
    <div v-if="card.style && card.style.img" class="cover-img-container">
      <img class="cover-img" :src="card.style.img" />
    </div>

    <!-- labels  -->

    <div class="labels" v-if="card.labelIds">
      <ul class="labels-container">
        <li v-for="label in labels" :key="label.id">
          <span
            class="label"
            :style="{
              backgroundColor: label.color,
            }"
          >
          </span>
        </li>
      </ul>
    </div>

    <!-- <div v-if="card.labelIds" class="labels">
      <span
        v-for="label in labels"
        :key="label.id"
        :style="{ backgroundColor: label.color }"
        class="label"
        @click.stop.prevent="toggleLabel"
      >
          <span class="label-title" v-if="label.title && isLabelText">{{
            label.title
          }}</span>
      </span>
    </div> -->

    <!-- description -->
    <!-- <span v-if="card.description"  class="el-icon-s-unfold icon description"></span> -->

    <!-- dueDate -->
    <!-- <div
      class="due-date"
      v-if="card.dueDate"
      :class="{ 'over-due': card.dueDate <= Date.now() }">
      <span class="due-date-icon el-icon-time"></span> 
    <span v-if="card.dueDate">{{ card.dueDate | dueDate }}</span>
    </div> -->

    <!-- checklist -->
    <!-- <div
      class="checklist"
      v-if=" card.checklists && card.checklists.length > 0"
      :class="{ 'done-todos': isTodosDone }">
      <span class="checklist-icon el-icon-document-checked"></span>
      <span>{{ doneTodosAmount }}</span>
      <span>/</span>
      <span>{{ todosAmount }}</span>
    </div>  -->

    <!-- comments  -->
    <!-- <span v-if="card.comment && card.comment.length < 0">
      <i class="el-icon-chat-round"></i>{{ card.comment.length }}</span
    > -->

    <!-- isdone -->
    <!-- <span v-if="card.status.isDone" class="el-icon-check icon isDone"></span> -->

    <!-- members -->
    <div class="members" v-if="card.members && card.members.length">
      <div v-for="member in card.members" :key="member._id">
        <avatar
          v-if="member.imgUrl"
          :src="member.imgUrl"
          :size="35"
          class="member-img"
        />
        <avatar
          v-else
          :username="member.username"
          :size="35"
          class="member"
        ></avatar>
      </div>
    </div>

    <main>
      <div v-if="isOpenEditor" class="editor" @click.stop>
        <p class="material-icons-outlined btn-x" @click="openEditor">close</p>
        <div class="edit-txt">
          <el-input
            type="textarea"
            :rows="5"
            v-model="cardToUpdate.title"
            @keyup.enter.native="updateCard"
          >
          </el-input>
          <el-button type="primary" @click="updateCard">Save</el-button>
        </div>
        <div class="chose-edit">
          <ul>
            <li @click="openDetails(card.id)">
              <span class="material-icons-outlined"> branding_watermark </span
              >Open card
            </li>
            <li @click="dynamicCmp('labels')">
              <span class="material-icons-outlined"> sell </span>Edit labels
            </li>
            <li @click="dynamicCmp('members')">
              <span class="material-icons-outlined"> person_outline </span
              >Change members
            </li>
            <li @click="dynamicCmp('cover')">
              <span class="material-icons-outlined"> branding_watermark </span
              >Change cover
            </li>
            <li>
              <span class="material-icons-outlined"> arrow_forward </span>Move
            </li>
            <li>
              <span class="material-icons-outlined"> file_copy </span>Copy
            </li>
            <li @click="dynamicCmp('dates')">
              <span class="material-icons-outlined"> watch_later </span>
              Edit dates
            </li>
            <li @click="deleteCard">
              <span class="material-icons-outlined"> move_to_inbox </span
              >Archive
            </li>
          </ul>
        </div>
        <div class="dynamic-cmp" v-if="component.currCmp">
          <header>
            <h2>{{ component.name }}</h2>
            <a @click="closeModel" class="el-icon-close"> </a>
          </header>
          <component
            :is="component.currCmp"
            :card="card"
            @dynamicCmp="dynamicCmp"
          >
          </component>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import { boardService } from "../service/board.service";
import avatar from "vue-avatar";
import member from "./edit-member.vue";
import label from "./edit-label.vue";
import attachment from "./edit-attachment.vue";
import trelix from "./edit-trelix.vue";

export default {
  name: "card",
  props: ["card"],
  data() {
    return {
      labels: [],
      isLabelText: false,
      isHover: false,
      isOpenEditor: false,
      cardToUpdate: this.card,
      component: {
        currCmp: null,
        name: "",
      },
    };
  },
  async created() {
    if (this.card.labelIds) {
      this.labels = await this.getLabel();
    }
  },
  methods: {
    async getLabel() {
      // console.log('TODO');
      // TODO: connect service and return label by ID
      //    let currLabel = await storageService.getLabelById();
      // console.log(labelId);
      let { boardId } = this.$route.params;
      // boardId = 'b101';
      try {
        let labels = await boardService.getLabelByCard(boardId, this.card);
        return labels;
      } catch (err) {
        console.log(err);
      }
    },
    toggleLabel() {
      this.isLabelText = !this.isLabelText;
    },
    dynamicCmp(cmp) {
      this.component.name = cmp;
      this.component.currCmp = `card-${cmp}`;
    },
    closeModel() {
      this.component.currCmp = null;
    },
    async deleteCard() {
      try {
        var res = await this.$store.dispatch({
          type: "deleteCard",
          card: this.card,
        });
        this.$emit("updateGroup");
        if (res) return this.openEditor();
      } catch (err) {
        console.log(err);
      }
    },
    async updateCard() {
      try {
        var res = await this.$store.dispatch({
          type: "updateCard",
          card: this.cardToUpdate,
        });
        this.$emit("updateGroup");
        if (res) this.openEditor();
      } catch (err) {
        console.log(err);
      }
    },
    openEditor() {
      this.isOpenEditor = !this.isOpenEditor;
    },
    openDetails(cardId) {
      //TODO: card id
      console.log(this.$route.params);
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}/${cardId}`);
    },
  },
  computed: {
    isShow() {
      if (this.isHover) return { opacity: 1 };
      else return { opacity: 0 };
    },
    doneTodosAmount() {
      let doneTodos = 0;
      this.task.checklists.forEach((checklist) => {
        doneTodos += checklist.todos.filter((todo) => todo.isDone).length;
      });

      return doneTodos;
    },
    todosAmount() {
      let todos = 0;
      this.task.checklists.forEach((checklist) => {
        todos += checklist.todos.length;
      });

      return todos;
    },
    isTodosDone() {
      return this.doneTodosAmount === this.todosAmount;
    },
    // card(){
    //   return this.cardToShow
    // }
  },
  watch: {
    card(val) {
      this.card = val;
    },
  },
  components: {
    avatar,
    "card-attachment": attachment,
    "card-trelix": trelix,
    "card-members": member,
    "card-labels": label,
  },
};
</script>

<style></style>
