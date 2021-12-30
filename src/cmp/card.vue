<template>
  <section @mouseover="isHover = true" @mouseleave="isHover = false" class="card-preview">
    <div
      v-if="card.style && card.style.isFull === false && card.style.bgColor"
      class="cover-Half"
      :style="bgColorHalf"
      @click.stop="openDetails(true)"
    ></div>
    <div
      class="img-cover-Half"
      v-if="card.style && card.style.isFull === false && card.style.bgUrl"
      :style="bgUrlHalf"
      @click.stop="openDetails(true)"
    ></div>

    <span class="icon-edit edit pointer" @click.stop="openDetails(false)" :style="isShow"> </span>
    <section
      :style="bgColorFull"
      class="card"
      @click.stop="openDetails(true)"
      :class="{
        'img-cover': card.style && card.style.isFull && card.style.bgUrl,
      }"
    >
      <div class="icons-container" :class="{ 'icons-full': card.style && card.style.isFull && card.style.bgUrl }">
        <!-- <template class="icons-container"> -->
        <div class="labels">
          <ul class="labels-container" v-if="myLabels && !card.style.isFull">
            <!-- {{myLabels}} -->
            <li v-for="label in myLabels" :key="label.id">
              <span
                class="label"
                :style="{
                  backgroundColor: label.color,
                }"
                :class="{ 'label-text': isLabelOpen }"
                @click.stop.prevent="toggleLabel"
              >
                <transition name="fade">
                  <span class="label-title" v-if="label.title && isLabelOpen">{{ label.title }}</span>
                </transition>
              </span>
            </li>
          </ul>
        </div>
        <header class="single" v-if="card.title">
          <p
            :class="{
              white: card.style && card.style.isFull && card.style.bgUrl,
              txtShadow: card.style.isFull,
            }"
          >
            {{ card.title }}
          </p>
        </header>
        <div class="icon-list" :class="{ colum: card.members.length > 1 }">
          <!-- labels  -->
          <!-- v-if="isBadgetsExist" -->
          <div
            class="icons"
            v-if="
              (card.dueDate || card.description || card.attachment || card.checklists || card.comments) &&
              !card.style.isFull
            "
          >
            <!-- dueDate -->
            <div
              class="due-date icon"
              v-if="card.dueDate && card.dueDate.date && card.dueDate.date.date"
              @mouseover="showCheck = true"
              @mouseleave="showCheck = false"
              @click.stop="isDone"
              :class="{ 'done-card': card.dueDate.isComplete }"
            >
              <span v-if="card.dueDate.isComplete && showCheck" class="icon-checkbox-unchecked icon"> </span>
              <span v-if="showCheck && !card.dueDate.isComplete" class="icon-checklist icon check"></span>
              <span v-if="!showCheck" class="icon icon-clock check"></span>
              <span v-if="card.dueDate.date.date"> {{ card.dueDate.date.date | moment('MMM DD') }}</span>
            </div>

            <!-- description -->
            <span v-if="card.description && card.description.length > 0" class="icon-description icon"></span>

            <!-- attachment -->
            <span
              v-if="card.attachment.computerAttachment && card.attachment.computerAttachment.length > 0"
              class="icon-attachment icon icons-padding"
            >
              {{ card.attachment.computerAttachment.length }}</span
            >

            <!-- checklist -->
            <span
              class="checklist icon icons-padding"
              v-if="card.checklists && card.checklists.length > 0"
              :class="{ 'done-todos': isTodosDone }"
            >
              <span class="icon-checklist icon"> </span>
              <span>{{ doneTodosAmount }}</span>
              <span>/</span>
              <span>{{ todosAmount }}</span>
            </span>

            <!-- comments  -->
            <span v-if="card.comments && card.comments.length > 0" class="icon icons-padding">
              <span class="icon-comment icon"></span>{{ card.comments.length }}</span
            >
          </div>
          <!-- members -->
          <div class="members" v-if="card.members && card.members.length > 0 && !card.style.isFull">
            <div v-for="member in card.members" :key="member._id" @click.stop="showProfile(member)">
              <avatar v-if="member.imgUrl" :src="member.imgUrl" :size="28" class="member-img" />
              <avatar v-else :username="member.username" :size="28" class="member"></avatar>
            </div>
          </div>
        </div>
      </div>
    </section>
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
        <div class="btn-choice pointer" @click="updateMember(currMember)">Remove from card...</div>
      </div>
    </div>
  </section>
</template>

<script>
  import { boardService } from '../service/board.service';
  import avatar from 'vue-avatar';

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
        currMember: null,
        isShowProfile: null,
      };
    },
    mounted() {},
    created() {
      try {
        this.labels = this.myLabels;
        if (this.card.style && this.card.style.isFull === false) {
          if (this.card.style.bgUrl) return this.bgUrlHalf;
          else return this.bgColorHalf;
        } else if (this.card.style && this.card.style.isFull) {
          return this.bgColorFull;
        }
      } catch (err) {
        console.log(err);
      }
    },
    methods: {
      async updateCard(card) {
        try {
          await this.$store.dispatch({
            type: 'updateCard',
            card,
          });
        } catch (err) {
          console.log(err);
        }
      },
      updateMember(currMember) {
        let card = JSON.parse(JSON.stringify(this.card));
        if (card.members.some((member) => member._id === currMember._id)) {
          const memberIdx = card.members.findIndex((member) => member._id === currMember._id);
          card.members.splice(memberIdx, 1);
          this.updateCardToMember(card);
        } else {
          card.members.push(currMember);
        }
      },
      async updateCardToMember(card) {
        try {
          await this.$store.dispatch({
            type: 'updateCard',
            card,
          });
          this.isShowProfile = !this.isShowProfile;
        } catch (err) {
          console.log(err);
        }
      },

      showProfile(member) {
        this.isShowProfile = !this.isShowProfile;
        this.currMember = member;
      },
      isDone() {
        let card = JSON.parse(JSON.stringify(this.card));
        card.dueDate.isComplete = !card.dueDate.isComplete;

        this.updateCard(card);
      },
      toggleLabel() {
        let labelToggle = JSON.parse(JSON.stringify(this.$store.getters.isLabelOpen));
        labelToggle = !labelToggle;
        this.$store.commit({ type: 'updateIsLabelOpen', isLabelOpen: labelToggle });
        // this.isLabelText = !this.isLabelText;
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

      openEditor() {
        this.isOpenEditor = !this.isOpenEditor;
      },
      async openDetails(isModal) {
        this.$store.commit({ type: 'setCard', card: this.card });
        await this.$store.commit({ type: 'updateModal', isModal });
        const boardId = this.$route.params.boardId;
        this.$router.push(`/board/${boardId}/${this.card.id}`);
      },
    },
    computed: {
      isLabelOpen() {
        return this.$store.getters.isLabelOpen;
      },
      labelsForDisplay() {
        if (this.card.labelIds) {
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
    },
    watch: {
      card(val) {
        this.card = val;
      },
    },
    components: {
      avatar,
    },
  };
</script>
<style lang="scss" scoped>
  .icons-full {
    position: absolute;
    width: 93%;
  }
  .icon-attachment:before {
    content: '\e908';
  }
  .icon-description:before {
    content: '\e922';
  }
  .icon-comment:before {
    display: flex;
    content: '\e91e';
  }
  .icon-checklist:before {
    content: '\e91a';
  }
  .icon-edit:before {
    content: '\e928';
  }
  .icon-clock:before {
    content: '\e91b';
  }
  .icon-checkbox-unchecked:before {
    content: '\e919';
  }
</style>
