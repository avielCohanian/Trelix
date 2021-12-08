<template>
  <section @mouseover="isHover = true" @mouseleave="isHover = false" class="card-preview">
    <div
      v-if="card.style && card.style.isFull === false && card.style.bgColor"
      class="cover-Half"
      :style="bgColorHalf"
      @click.stop.prevent="openDetails(card.id)"
    ></div>
    <div
      class="img-cover-Half"
      v-if="card.style && card.style.isFull === false && card.style.bgUrl"
      :style="bgUrlHalf"
      @click.stop.prevent="openDetails(card.id)"
    ></div>

    <span class="material-icons-outlined edit" @click.stop="openEditor" :style="isShow"> create </span>

    <section
      :style="bgColorFull"
      class="card"
      @click.stop.prevent="openDetails(card.id)"
      :class="{
        'img-cover': card.style && card.style.isFull && card.style.bgUrl,
      }"
    >
      <div class="labels">
        <ul class="labels-container" v-if="myLabels">
          <!-- {{myLabels}} -->
          <li v-for="label in myLabels" :key="label.id">
            <span
              class="label"
              :style="{
                backgroundColor: label.color,
              }"
              :class="{ 'label-text': isLabelText }"
              @click.stop.prevent="toggleLabel"
            >
              <transition name="fade">
                <span class="label-title" v-if="label.title && isLabelText">{{ label.title }}</span>
              </transition>
            </span>
          </li>
        </ul>
      </div>
      <header class="single" v-if="card.title">
        <p
          :class="{
            white: card.style && card.style.isFull && card.style.bgUrl,
          }"
        >
          {{ card.title }}
        </p>
      </header>

      <!-- labels  -->

      <div class="icons" v-if="isBadgetsExist">
        <!-- dueDate -->
        <div
          class="due-date icon"
          v-if="card.dueDate"
          @mouseover="showCheck = true"
          @mouseleave="showCheck = false"
          @click.stop="isDone"
          :class="{ 'done-card': isCardDone }"
        >
          <span v-if="isCardDone && showCheck" class="material-icons-outlined icon"> check_box</span>
          <span v-if="showCheck && !isCardDone" class="material-icons-outlined icon check">crop_din</span>
          <span v-if="!showCheck" class="due-date-icon icon el-icon-time check"></span>
          <span v-if="card.dueDate.date">
            {{ card.dueDate.date | moment('MMM ') }}
            {{ dueDateDay }}</span
          >
        </div>

        <!-- description -->
        <span v-if="card.description && card.description.length > 0" class="el-icon-s-unfold icon description"></span>

        <!-- attachment -->
        <span
          v-if="card.attachment.computerAttachment && card.attachment.computerAttachment.length > 0"
          class="el-icon-paperclip icon"
        >
          {{ card.attachment.computerAttachment.length }}</span
        >

        <!-- checklist -->
        <span
          class="checklist icon"
          v-if="card.checklists && card.checklists.length > 0"
          :class="{ 'done-todos': isTodosDone }"
        >
          <span class="material-icons-outlined icon"> check_box</span>
          <span v-if="doneTodosAmount">{{ doneTodosAmount }}</span>
          <span>/</span>
          <span>{{ todosAmount }}</span>
        </span>

        <!-- comments  -->
        <span v-if="card.comments && card.comments.length > 0">
          <span class="el-icon-chat-round icon"></span>{{ card.comment }}</span
        >
      </div>
      <!-- members -->
      <div class="members" v-if="card.members && card.members.length > 0">
        <div v-for="member in card.members" :key="member._id">
          <avatar v-if="member.imgUrl" :src="member.imgUrl" :size="28" class="member-img" />
          <avatar v-else :username="member.username" :size="28" class="member"></avatar>
        </div>
      </div>
    </section>
    <main>
      <div v-if="isOpenEditor" class="editor" @click="openEditor">
        <p class="material-icons-outlined btn-x" @click.stop.prevent="openEditor">close</p>
        <div class="edit-txt" @click.stop>
          <el-input type="textarea" :rows="5" v-model="cardToUpdate.title"> </el-input>
          <el-button type="primary" @click.stop="openEditor">Save</el-button>
        </div>
        <div class="chose-edit">
          <ul>
            <li @click.stop.prevent="openDetails(card.id)">
              <span class="material-icons-outlined"> branding_watermark </span>Open card
            </li>
            <li @click.stop="dynamicCmp('labels')"><span class="material-icons-outlined"> sell </span>Edit labels</li>
            <li @click.stop.prevent="dynamicCmp('members')">
              <span class="material-icons-outlined"> person_outline </span>Change members
            </li>
            <li @click.stop.prevent="dynamicCmp('cover')">
              <span class="material-icons-outlined"> branding_watermark </span>Change cover
            </li>
            <li><span class="material-icons-outlined"> arrow_forward </span>Move</li>
            <li><span class="material-icons-outlined"> file_copy </span>Copy</li>
            <li @click.stop.prevent="dynamicCmp('dates')">
              <span class="material-icons-outlined"> watch_later </span>
              Edit dates
            </li>
            <li @click.stop.prevent="deleteCard">
              <span class="material-icons-outlined"> move_to_inbox </span>Archive
            </li>
          </ul>
        </div>
        <div class="dynamic-cmp" v-if="component.currCmp" @click.stop="">
          <header>
            <h2>{{ component.name }}</h2>
            <a @click.stop.prevent="closeModel" class="el-icon-close"> </a>
          </header>
          <component
            :is="component.currCmp"
            :card="card"
            @dynamicCmp="dynamicCmp"
            @updateMember="updateMember"
            @changeBcg="changeBcg"
            @updateLabel="updateLabel"
          >
          </component>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import { boardService } from '../service/board.service';
import avatar from 'vue-avatar';
import member from './edit/edit-member.vue';
import label from './edit-label.vue';
import cover from './edit/edit-cover.vue';
import attachment from './edit/edit-attachment.vue';
import trelix from './edit/edit-trelix.vue';

export default {
  name: 'card',
  props: { card: null },
  data() {
    return {
      isCardDone: false,
      labels: [],
      showCheck: false,
      isLabelText: false,
      isHover: false,
      isOpenEditor: false,
      cardToUpdate: null,
      component: {
        currCmp: null,
        name: '',
      },
    };
  },
  mounted() {},
  created() {
    try {
      this.cardToUpdate = JSON.parse(JSON.stringify(this.card));
      this.labels = this.myLabels;
      if (this.card.style && this.card.style.isFull === false) {
        if (this.card.style.bgUrl) return this.bgUrlHalf;
        else return this.bgColorHalf;
      } else if (this.card.style && this.card.style.isFull) {
        return this.bgColorFull;
      }
    } catch (res) {
      console.log(res);
    }
  },
  methods: {
    changeBcg(color) {
      let card = JSON.parse(JSON.stringify(this.card));
      if (typeof color === 'object') {
        if (card.style.bgUrl === color) card.style.bgUrl = null;
        else {
          card.style.bgUrl = color;
          card.style.bgColor = null;
        }
      } else if (typeof color === 'string') {
        if (card.style.bgColor === color) card.style.bgColor = null;
        else {
          card.style.bgColor = color;
          card.style.bgUrl = null;
        }
      } else {
        card.style.bgColor = null;
        card.style.bgUrl = null;
      }
      this.closeModel();
      this.$emit('updateCard', card);
      // this.$store.dispatch({ type: 'updateCard', card });
    },
    // isDone(){
    //   this.isCardDone = !this.isCardDone;
    // },
    async isDone() {
      this.isCardDone = !this.isCardDone;
      try {
        var res = await this.$store.dispatch({
          type: 'updateDuedate',
          newDone: this.isCardDone,
          card: JSON.parse(JSON.stringify(this.card)),
        });
      } catch (err) {
        console.log(err);
      }
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
      console.log(cmp);
      if (cmp === 'attachment') this.component.name = 'attach from...';
      if (cmp === 'coverSearch') this.component.name = 'photo search';
      if (cmp === 'editAttachment') {
        this.component.name = 'Remove attachment?';
      } else {
        this.component.name = cmp;
      }
      this.component.currCmp = cmp;
    },
    closeModel() {
      this.component.currCmp = null;
    },
    async deleteCard() {
      try {
        var res = await this.$store.dispatch({
          type: 'deleteCard',
          card: this.card,
        });
        this.$emit('updateGroup');
        if (res) return this.openEditor();
      } catch (err) {
        console.log(err);
      }
    },
    async updateCard() {
      try {
        var res = await this.$store.dispatch({
          type: 'updateCard',
          card: this.cardToUpdate,
        });
        this.$emit('updateGroup');
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
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}/${cardId}`);
    },
    updateLabel(label) {
      let card = JSON.parse(JSON.stringify(this.card));
      if (card.labelIds.some((labelId) => labelId.lId === label.id)) {
        const labelIdx = card.labelIds.findIndex((labelId) => labelId.id === label.id);
        card.labelIds.splice(labelIdx, 1);
      } else {
        let currLabel = { lId: label.id, isDone: false };
        card.labelIds.push(currLabel);
      }
      this.$emit('updateCard', card);
    },
    updateMember(currMember) {
      let card = JSON.parse(JSON.stringify(this.card));
      if (card.members.some((member) => member._id === currMember._id)) {
        const labelIdx = card.members.findIndex((member) => member._id === currMember._id);
        card.members.splice(labelIdx, 1);
      } else {
        card.members.push(currMember);
      }
      this.$emit('updateCard', card);
    },
  },
  computed: {
    labelsForDisplay() {
      if (this.card.labelIds) {
        console.log('adina');
        //   this.labels =  this.getLabel();
        return this.getLabel();
      }
    },
    isBadgetsExist() {
      let badgets = ['dueDate', 'comments', 'checklists', 'attachment', 'checklists', 'description'];
      return Object.keys(this.card).some((_key) => badgets.includes(_key));
    },
    bgColorHalf() {
      if (this.card.style.bgColor) {
        return { backgroundColor: `${this.card.style.bgColor}` };
      }
    },
    bgUrlHalf() {
      return { backgroundImage: `${this.card.style.bgUrl}` };
    },
    bgColorFull() {
      if (this.card.style && this.card.style.isFull) {
        if (this.card.style.bgColor) {
          return { backgroundColor: `${this.card.style.bgColor}` };
        }
        if (this.card.style.bgUrl) {
          return {
            backgroundImage: `${this.card.style.bgUrl}`,
          };
        }
      }
    },
    dueDateDay() {
      let t = this.card.dueDate.date;
      return new Date(t).getUTCDay() + 1;
    },
    isShow() {
      if (this.isHover) return { opacity: 1 };
      else return { opacity: 0 };
    },
    doneTodosAmount() {
      let doneTodos = 0;
      this.card.checklists.forEach((checklist) => {
        if (checklist.todos && checklist.todos.length) {
          doneTodos += checklist.todos.filter((todo) => todo.isDone).length;
        }
      });
      return doneTodos;
    },
    todosAmount() {
      let todos = 0;
      this.card.checklists.forEach((checklist) => {
        if (checklist.todos) {
          todos += checklist.todos.length;
        }
      });

      return todos;
    },
    isTodosDone() {
      return this.doneTodosAmount === this.todosAmount;
    },
    myLabels() {
      let boardLabels = JSON.parse(JSON.stringify(this.$store.getters.boardLabels));

      let carrLabels = [];
      boardLabels.forEach((label) => {
        if (
          this.card.labelIds.some((labelId) => {
            if (labelId.lId === label.id) {
              label.idDone = labelId.isDone;
              return true;
            }
          })
        ) {
          carrLabels.push(label);
        }
      });
      return carrLabels;
    },

    // let { boardId } = this.$route.params;
    //   let labels = await boardService.getLabelByCard(boardId, this.card);
    //   console.log('labels',labels);
    //     return this.labels = labels
    // }
  },
  watch: {
    card(val) {
      //   console.log(val);
      //   console.log('popo');
      this.card = val;
    },
    // "$store.getters.getBoard"(newBoard){
    //     console.log('newBoard',newBoard);
    //     // this.card ={...this.groups.cards.find(_c=>_c.id===this.card.id)}
    //   return this.card = this.newBoard.groups.find(group=>{
    //       return  group.cards.find(card=>{
    //            return card.id === this.card.id
    //         })
    //     })
    //     console.log();
    // }
  },
  components: {
    avatar,
    attachment,
    trelix,
    member,
    label,
    cover,
  },
};
</script>
