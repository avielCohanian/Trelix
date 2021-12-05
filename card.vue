<template>
  <!-- :style="{'{background: card.style.bgColor}': card.style.isFull}" -->
  <section
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
    class="card-preview"
  >
    <div
      v-if="card.style && card.style.isFull === false"
      class="cover-Half"
      :style="bgColor"
    ></div>

    <!-- <div
      class="cover-img-container"
      :style="bgColor"
      v-if="card.style && card.style.isFull"
    > -->
      <!-- <img  class="cover-img" :src="card.style.bgUrl" /> -->
    <!-- </div> -->

    <span
      class="material-icons-outlined edit"
      @click.stop="openEditor"
      :style="isShow"
    >
      create
    </span>
    <section :style="bgColor" class="card" @click="openDetails(card.id)">
      <!-- :style="{ background: card.style.bgColor }" -->

      <div class="labels" v-if="card.labelIds && card.labelIds.length">
        <ul class="labels-container">
          <li v-for="label in labels" :key="label.id">
            <span
              class="label"
              :style="{
                backgroundColor: label.color,
              }"
              :class="{ 'label-text': isLabelText }"
              @click.stop.prevent="toggleLabel"
            >
              <transition name="fade">
                <span class="label-title" v-if="label.title && isLabelText">{{
                  label.title
                }}</span>
              </transition>
            </span>
          </li>
        </ul>
      </div>
      <header class="single">
        <p>{{ card.title }}</p>
      </header>

      <!-- img -->
      <!-- <div v-if="card.style && card.style.imgUrl" class="cover-img-container">
      <img class="cover-img" :src="card.style.imgUrl" />
    </div> -->

      <!-- <div
      v-if="card.style && card.style.bgcUrl"
      class="cover-img-container-full"
    >
      <img class="cover-img" :src="card.style.bgcUrl" />
    </div> -->

      <!-- labels  -->

      <div
        class="icons"
        v-if="
          card.dueDate |
            card.comments |
            card.checklists |
            card.attachment |
            card.attachment |
            card.checklists |
            card.description
        "
      >
        <!-- dueDate -->
        <div
          class="due-date icon"
          v-if="card.dueDate"
          @mouseover="showCheck = true"
          @mouseleave="showCheck = false"
          @click.stop="isDone"
          :class="{ 'done-card': isCardDone }"
        >
          <span
            v-if="isCardDone && showCheck"
            class="material-icons-outlined icon"
          >
            check_box</span
          >
          <span
            v-if="showCheck && !isCardDone"
            class="material-icons-outlined icon check"
            >crop_din</span
          >
          <span
            v-if="!showCheck"
            class="due-date-icon icon el-icon-time check"
          ></span>
          <span v-if="card.dueDate">
            {{ card.dueDate | moment("MMM ") }} {{ dueDateDay }}</span
          >
        </div>

        <!-- description -->
        <span
          v-if="card.description"
          class="el-icon-s-unfold icon description"
        ></span>

        <!-- attachment -->
        <span
          v-if="card.attachment && card.attachment.length > 0"
          class="el-icon-paperclip icon"
        >
          {{ card.attachment.length }}</span
        >

        <!-- checklist -->
        <span
          class="checklist icon"
          v-if="card.checklists && card.checklists.length > 0"
          :class="{ 'done-todos': isTodosDone }"
        >
          <span class="material-icons-outlined icon"> check_box</span>
          <span>{{ doneTodosAmount }}</span>
          <span>/</span>
          <span>{{ todosAmount }}</span>
        </span>

        <!-- comments  -->
        <span v-if="card.comments && card.comments.length > 0">
          <span class="el-icon-chat-round icon"></span>{{ card.comment }}</span
        >

        <!-- isdone ?-->
        <!-- <span v-if="card.status.isDone" class="el-icon-check icon isDone"></span> -->
      </div>
      <!-- members -->
      <div class="members" v-if="card.members && card.members.length">
        <div v-for="member in card.members" :key="member._id">
          <avatar
            v-if="member.imgUrl"
            :src="member.imgUrl"
            :size="28"
            class="member-img"
          />
          <avatar
            v-else
            :username="member.username"
            :size="28"
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
  props: { card: null },
  data() {
    return {
      isCardDone: false,
      labels: [],
      showCheck: false,
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
  mounted() {
    // console.log('popopopo');
  },
  async created() {
    try {
      if (this.card.labelIds) {
        this.labels = await this.getLabel();
      }
    } catch (res) {
      console.log(res);
    }
  },
  methods: {
    changeBcg(color) {
      let card = JSON.parse(JSON.stringify(this.card));
      if (typeof color === "object") {
        if (card.style.bgImg === color) card.style.bgImg = null;
        else {
          card.style.bgImg = color;
          card.style.bgColor = null;
        }
      } else if (typeof color === "string") {
        if (card.style.bgColor === color) card.style.bgColor = null;
        else {
          card.style.bgColor = color;
          card.style.bgImg = null;
        }
      } else {
        card.style.bgColor = null;
        card.style.bgImg = null;
      }
      console.log(card.style);
      this.$emit("updateCard", card);
      // this.$store.dispatch({ type: 'updateCard', card });
    },
    isDone() {
      this.isCardDone = !this.isCardDone;
    },
    async getLabel() {
      let { boardId } = this.$route.params;
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
    bgColor() {
      if (this.card.style && this.card.style.isFull === false) {
        if (this.card.style.bgColor) {
          return { backgroundColor: `${this.card.style.bgColor}` };
        } else if (this.card.style.bgUrl) {
          console.log(this.card.style.bgUrl);
          return {
            backgroundImage: `url(${this.card.style.bgUrl})`,
          };
        }
      }
      else if (this.card.style && this.card.style.isFull){
        console.log(this.card.style);
        console.log(this.card.style.isFull);
        if (this.card.style.bgColor) {
          console.log(this.card.style.bgColor);
          return { backgroundColor: `${this.card.style.bgColor}` };
        } else if (this.card.style.bgUrl) {
          console.log(this.card.style.bgUrl);
          return {
            backgroundImage: `url(${this.card.style.bgUrl})`,
          };
        }
      }
    },
    dueDateDay() {
      let t = this.card.dueDate;
      return new Date(t).getUTCDay() + 1;
    },
    isShow() {
      if (this.isHover) return { opacity: 1 };
      else return { opacity: 0 };
    },
    doneTodosAmount() {
      let doneTodos = 0;
      this.card.checklists.forEach((checklist) => {
        doneTodos += checklist.todos.filter((todo) => todo.isDone).length;
      });

      return doneTodos;
    },
    todosAmount() {
      let todos = 0;
      this.card.checklists.forEach((checklist) => {
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
