<template>
  <section class="screen" v-if="card" @click="closeDetails">
    <article class="card-details" @click.stop v-show="editor">
      <div class="color-header" v-if="card.style && (card.style.bgColor || card.style.bgUrl)" :style="bgColor">
        <span class="cover-back-btn">
          <a class="back-btn close-btn el-icon-close" @click="closeDetails"> </a>
        </span>
        <a class="cover-btn" @click="dynamicCmp({ cmp: { name: 'cover' } }, null, $event)">
          <span class="cover-icon">
            <span class="material-icons-outlined icon"> web_asset </span>
          </span>
          Cover</a
        >
      </div>
      <header class="header">
        <a
          v-if="card.style && !card.style.bgColor && !card.style.bgUrl"
          class="back-btn close-btn el-icon-close"
          @click="closeDetails"
        >
        </a>
        <div class="secund-header" v-if="card.title">
          <font-awesome-icon class="svg" :icon="['fab', 'trello']" />
          <div class="secund-header-input" @click="toggleTitle">
            <input
              type="text"
              :class="{ focus: isOpenTitle }"
              v-model="card.title"
              @keyup.enter="saveTitle"
              @blur="saveTitle"
            />
          </div>
        </div>
        <p class="title" v-if="currGroup">
          in list <a>{{ currGroup.title }}</a>
        </p>
      </header>

      <div class="details">
        <div class="main-details">
          <div class="header-optional" v-if="headerShow">
            <div class="members" v-if="card.members && card.members.length">
              <h3>Members</h3>
              <ul class="member-container">
                <li v-for="member in card.members" :key="member._id">
                  <avatar v-if="member.imgUrl" :src="member.imgUrl" :size="35" class="member"></avatar>
                  <avatar v-else :username="member.fullname" :size="35" class="member"></avatar>
                </li>
                <a class="plus-btn" @click="dynamicCmp({ cmp: { name: 'members' } }, null, $event)">
                  <span class="el-icon-plus plus"></span>
                </a>
              </ul>
            </div>

            <div class="labels" v-if="card.labelIds && card.labelIds.length">
              <h3>Labels</h3>
              <ul class="labels-container">
                <li v-for="label in labels" :key="label.id">
                  <span
                    class="label"
                    :style="{
                      backgroundColor: label.color,
                    }"
                  >
                    {{ label.title }}</span
                  >
                </li>
                <a class="plus-btn" @click="dynamicCmp({ cmp: { name: 'labels' } }, null, $event)">
                  <span class="el-icon-plus plus"></span>
                </a>
              </ul>
            </div>

            <div class="dueDate" v-if="card.dueDate && card.dueDate.date">
              <h3>Due date</h3>
              <div class="dueDate-container">
                <el-checkbox class="checkBox" @click="dateDone" v-model="checked"></el-checkbox>
                <a @click="openDate" class="date-dedline-container">
                  {{ card.dueDate.date | moment('MMM ') }}
                  {{ dueDateDay.date }}
                  at
                  {{ card.dueDate.date | moment(' h:mm: A') }}
                  <span class="el-icon-arrow-down"></span>
                </a>
              </div>
            </div>
          </div>

          <div class="description">
            <i class="el-icon-s-unfold icon"></i>
            <header>
              <h3>Description</h3>
              <a class="edit-btn" v-show="!editDescription" @click="openEditDescription">Edit</a>
            </header>
            <div class="description-container">
              <p v-show="!editDescription" @click="openEditDescription">
                {{ card.description }}
              </p>
              <div v-show="editDescription" class="description-edit">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="Add a more detailed description..."
                  ref="editInput"
                  v-model="description"
                >
                </el-input>

                <div class="description-edit-btn">
                  <a class="close-btn el-icon-close" @click="closeDescription"></a>

                  <a class="save" @click="saveDescription">Save</a>
                </div>
              </div>
            </div>
          </div>

          <div
            class="trelix-attachments"
            v-if="card.attachment.trelixAttachments && card.attachment.trelixAttachments.length"
          >
            <font-awesome-icon class="svg" :icon="['fab', 'trello']" />
            <h3>Trelix attachments</h3>
            <div class="attachments-list">
              <article v-for="attCard in attTrelix" :key="attCard.id" class="attachment-link">
                <div
                  class="att-container"
                  v-if="getBoard.style.background || getBoard.style.backgroundImage"
                  :style="boardBcg"
                >
                  <div class="att-card" @click="moveCard(attCard.id)">
                    <ul class="att-labels-container" v-if="labelByCardSyn(attCard).length">
                      <li v-for="label in labelByCardSyn(attCard)" :key="label.id">
                        <span
                          class="att-label"
                          :style="{
                            backgroundColor: label.color,
                            display: 'block',
                          }"
                        >
                          <span class="label-text"> {{ label.title }}</span>
                        </span>
                      </li>
                    </ul>
                    <h4 class="att-card-title">{{ attCard.title }}</h4>

                    <div class="att-card-icon">
                      <!-- dueDate -->

                      <div class="due-date att-icon" v-if="attCard.dueDate">
                        <span class="material-icons-outlined att-icon"> check_box</span>
                        <span class="material-icons-outlined att-icon check">crop_din</span>
                        <span class="due-date-icon att-icon el-icon-time check"></span>
                        <span v-if="attCard.dueDate.date">
                          {{ attCard.dueDate.date | moment('MMM ') }}
                          {{ dueDateDay }}</span
                        >
                      </div>

                      <!-- description -->
                      <span
                        v-if="attCard.description && attCard.description.length > 0"
                        class="el-icon-s-unfold att-icon description-icon"
                      ></span>

                      <!-- attachment -->
                      <span
                        v-if="attCard.attachment.computerAttachment && attCard.attachment.computerAttachment.length > 0"
                        class="el-icon-paperclip att-icon"
                      >
                        {{ attCard.attachment.computerAttachment.length }}</span
                      >

                      <!-- checklist -->
                      <span class="checklist att-icon" v-if="attCard.checklists && attCard.checklists.length > 0">
                        <span class="material-icons-outlined att-icon"> check_box</span>
                        <span v-if="doneTodosAmount">{{ doneTodosAmount }}</span>
                        <span>/</span>
                        <span>{{ todosAmount }}</span>
                      </span>

                      <!-- comments  -->
                      <span v-if="attCard.comments && attCard.comments.length > 0">
                        <span class="el-icon-chat-round att-icon"></span>{{ attCard.comment }}</span
                      >
                    </div>
                    <div class="att-card-avatar" v-if="attCard.members && attCard.members.length > 0">
                      <div v-for="member in attCard.members" :key="member._id">
                        <avatar v-if="member.imgUrl" :src="member.imgUrl" :size="28" class="member-img" />
                        <avatar v-else :username="member.username" :size="28" class="member"></avatar>
                      </div>
                    </div>
                  </div>
                  <!-- :style="getBoard.color" -->
                  <div class="att-card-from">
                    <!-- :style="{
                      background: ' #ffffff96',
                    }" -->
                    <p class="att-board-name">{{ getBoard.title }}:</p>
                    <p class="att-board-group">{{ getGroup(attCard.id) }}</p>
                  </div>
                </div>

                <a class="att-remove">remove</a>
                <!-- @click="removeMsg" -->
                <!-- <a @click="connectCard">Connect cards…</a> -->
              </article>

              <span v-if="attTrLongLength > 4">
                <a class="view view-long" @click="toggleAttTr" v-if="!attTrLong"
                  >View all Trello attachments ({{ attTrLongLength }} hidden)
                </a>
                <a class="view view-short" @click="toggleAttTr" v-else>Show fewer Trello attachments. </a>
              </span>
            </div>
            <a @click="openAttachment">Add Trelix attachment</a>
          </div>

          <div
            class="section-attachments"
            v-if="card.attachment.computerAttachment && card.attachment.computerAttachment.length"
          >
            <span class="el-icon-paperclip paperclip-icon icon"></span>
            <h3>Attachments</h3>
            <div class="attachment-list">
              <a v-for="(att, idx) in cardAttachments" :key="idx" class="attachment-link">
                <span>
                  <div v-if="att.url" class="img" :style="{ backgroundImage: `url(${att.url})` }"></div>
                  <div v-else class="img-link">
                    <span>LINK</span>
                  </div>
                </span>
                <div class="attachment-option-container">
                  <p class="attachment-option">
                    <span class="link">
                      {{ att.name }}
                      <span @click="openAttachUrl(att.url)" class="el-icon-top-right"></span>
                    </span>
                    <span class="title-option">
                      <span>
                        <span
                          >Added
                          {{ att.upAt | moment('from') }}
                          <span v-if="dayLeft(att.upAt)">at{{ getTime(att.upAt) }}</span>
                        </span>
                        -
                      </span>

                      <a class="title-option-btn" @click.stop="addLinkToActivity(att.link)">Comment</a>
                      -
                      <a
                        class="title-option-btn"
                        @click.stop="
                          dynamicCmp(
                            {
                              cmp: {
                                name: 'Att',
                                txt: 'Remove this attachment? There is no undo.',
                                type: 'remove',
                                title: 'Delete attachment?',
                                btnTxt: 'Delete',
                              },
                            },
                            idx
                          ),
                            $event
                        "
                        >Remove</a
                      >
                      -
                      <a
                        class="title-option-btn"
                        @click.stop="
                          dynamicCmp(
                            {
                              cmp: {
                                name: 'Att',
                                txt: 'Link name',
                                type: 'edit',
                                title: 'Edit attachment',
                                btnTxt: 'Update',
                              },
                            },
                            idx
                          ),
                            $event
                        "
                        >Edit</a
                      >
                    </span>
                    <span v-if="att.url" class="cover" @click.stop="makeCover(`url(${att.url})`)">
                      <span class="material-icons-outlined"> web_asset </span>
                      <a v-if="!inCover(`url(${att.url})`)">Make cover</a>
                      <a v-else>Remove cover</a>
                    </span>
                  </p>
                </div>
              </a>
            </div>
            <p class="longAtt">
              <a v-if="card.attachment.computerAttachment.length > 4 && !logAtt" @click="logAtt = true"
                >View all attachments ( {{ attHidden }} hidden)</a
              >
              <a v-if="logAtt" @click="logAtt = false">Show fewer attachments.</a>
            </p>
            <a class="add-item" @click="dynamicCmp({ cmp: { name: 'attachment' } }, null, $event)">Add an attachment</a>
          </div>
          <!-- v-if="card.checklists" -->
          <div class="checklists-container">
            <check-list
              v-for="checklist in card.checklists"
              :key="checklist.id"
              :checklist="checklist"
              @updateList="updateList"
              @deleteChecklist="deleteChecklist"
            ></check-list>
          </div>
          <!-- v-if="!card.activity" -->
          <div class="activity-container">
            <activity-log
              :card="card"
              @saveCommit="saveCommit"
              @updateCmm="updateCmm"
              @removeCommit="removeCommit"
            ></activity-log>
          </div>
        </div>
        <card-edit
          class="card-edit"
          :card="card"
          :cmp="dynamicCmpToShow"
          @updateCard="updateCard"
          @removeAtt="removeAtt"
          @removeLabel="removeLabel"
          @updateAtt="updateAtt"
          @closeModel="closeModel"
          @removeChecklist="removeChecklist"
          @updateChecklist="updateChecklist"
          @deleteLabel="deleteLabel($event)"
        ></card-edit>
      </div>
    </article>
    <card-edit
      v-if="!editor"
      class="card-edit"
      :card="card"
      :cmp="dynamicCmpToShow"
      @updateCard="updateCard"
      @removeAtt="removeAtt"
      @removeLabel="removeLabel"
      @updateAtt="updateAtt"
      @closeModel="closeModel"
      @closeDetails="closeDetails"
      @removeChecklist="removeChecklist"
      @updateChecklist="updateChecklist"
      @deleteLabel="deleteLabel($event)"
      @deleteCard="deleteCard"
    ></card-edit>
  </section>
</template>

<script>
import cardEdit from '../cmp/card-edit.vue';
import checkList from '../cmp/checklist-details.vue';
import activityLog from '../cmp/activity-log.vue';
import card from '../cmp/card.vue';

import avatar from 'vue-avatar';
import moment from 'moment';

import { boardService } from '../service/board.service.js';

export default {
  name: 'cardDetails',
  data() {
    return {
      board: null,
      card: null,
      currGroup: null,
      checked: false,
      description: '',
      editDescription: false,
      isOpenTitle: false,
      labels: [],
      cmp: { name: null, id: null, pos: { x: null, y: null } },
      attachmentViewer: false,
      logAtt: false,
      labelToDeleteId: null,
      attTrLong: false,
      attTrLongLength: 0,
    };
  },
  methods: {
    openAttachUrl(url) {
      window.open(url, '_blank');
    },
    async loadCard() {
      try {
        const cardId = this.$route.params.cardId;
        const currCard = await this.$store.dispatch({
          type: 'cardById',
          cardId,
        });
        const card = JSON.parse(JSON.stringify(currCard));
        // if (!card.style.bgUrl) card.style.bgUrl = { backgroundImage: null };
        this.card = card;
        if (this.card.labelIds) {
          this.labels = await this.getLabel();
        }
        let { boardId } = this.$route.params;
        this.currGroup = await boardService.getGroupByCardId(boardId, cardId);
        this.description = this.card.description;
      } catch (err) {
        console.log(err);
      }
    },
    closeDetails() {
      const { boardId } = this.$route.params;
      this.$router.push(`/board/${boardId}`);
    },
    async getLabel(card = this.card) {
      let { boardId } = this.$route.params;
      try {
        let labels = await boardService.getLabelByCard(boardId, card);
        console.log(labels);
        return labels;
      } catch (err) {
        console.log(err);
      }
    },

    labelByCardSyn(card) {
      let boardLabels = JSON.parse(JSON.stringify(this.$store.getters.boardLabels));
      let carrLabels = [];
      boardLabels.forEach((label) => {
        if (
          card.labelIds.some((labelId) => {
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

    dateDone() {
      this.checked = !this.checked;
    },
    openDate() {
      console.log('TODO');
      // TODO: open cmpDynamic in datesMode
    },
    openEditDescription() {
      this.editDescription = !this.editDescription;
    },
    closeDescription() {
      this.editDescription = false;
    },
    saveDescription() {
      this.card.description = this.description;
      this.updateCard(this.card);
      this.editDescription = false;
      this.updateCard(this.card);
    },
    attachmentLink(attachmentIdx) {
      console.log('TODO');
      // TODO: move in groups/board to another place
    },
    makeCover(imgUrl) {
      let card = JSON.parse(JSON.stringify(this.card));
      if (!this.inCover(imgUrl)) {
        card.style.bgUrl = imgUrl;
        card.style.bgColor = null;
      } else card.style.bgUrl = null;
      this.updateCard(card);
    },
    inCover(imgUrl) {
      if (!this.card.style.bgUrl) this.card.style.bgUrl = null;
      return this.card.style.bgUrl === imgUrl;
    },
    removeMsg(a) {
      console.log('TODO');
      // TODO: show if he shore delete
    },
    getTime(t) {
      return `${new Date(t).getHours()} :${new Date(t).getMinutes()} `;
    },
    dayLeft(t) {
      return Date.now() - t > 100 * 60 * 60 * 24;
    },
    openAttachment() {
      console.log('TODO');
      // TODO: open cmpDynamic in openAttachment in trelix mode
    },
    openAttachment() {
      console.log('TODO');
      // TODO: open cmpDynamic in openAttachment
    },
    addLinkToActivity(link) {
      // TODO: start msg to the activity with link dynamicCmp
      console.log(link);
    },
    editName(attName) {
      // TODO: show input with attName and edit it with dynamicCmp
    },
    toggleTitle() {
      this.isOpenTitle = !this.isOpenTitle;
    },
    updateList(checklist) {
      let card = JSON.parse(JSON.stringify(this.card));
      const checklistIdx = card.checklists.findIndex((ch) => ch.id === checklist.id);
      card.checklists.splice(checklistIdx, 1, checklist);
      this.updateCard(card);
      // console.log(checklist);
    },
    updateChecklist(newVal) {
      let card = JSON.parse(JSON.stringify(this.card));
      let checklistIdx = card.checklists.findIndex((l) => l === this.cmp.id);
      card.checklists.splice(checklistIdx, 1, newVal);
      this.updateCard(card);
    },
    async updateCard(card) {
      try {
        if (!card) card = JSON.parse(JSON.stringify(this.card));
        await this.$store.dispatch({
          type: 'updateCard',
          card,
        });
        this.cmp.cmp = null;
        this.cmp.id = null;
        // await this.loadCard();
        this.$emit('updateCard');
      } catch (err) {
        console.log(err);
      }
    },
    closeModel() {
      this.cmp.cmp = null;
      this.cmp.id = null;
    },
    async saveTitle() {
      let card = JSON.parse(JSON.stringify(this.card));
      card.title = this.card.title;
      try {
        await this.updateCard();
        this.isOpenTitle = false;
      } catch (err) {
        console.log(err);
      }
    },
    selectInInput() {
      console.log(this.$refs);
    },
    dynamicCmp(cmp, id = null, e) {
      // let x = e.clientX;
      // let y = e.clientY;
      let x = 0;
      let y = 0;
      let pos = { x, y };
      this.cmp = { name: cmp.cmp, id, pos };
      this.$store.commit({ type: 'steCmpDyn', cmpDyn: this.cmp });
    },
    deleteChecklist(checklistId) {
      //   let card = JSON.parse(JSON.stringify(this.card));
      const checklistIdx = this.card.checklists.findIndex((c) => c.id === checklistId);
      this.dynamicCmp({
        cmp: {
          name: 'Checklist',
          txt: 'Deleting a checklist is permanent and there is no way to get it back.',
          title: `Delete ${this.card.checklists[checklistIdx].title}?`,
          type: 'remove',
          btnTxt: 'Delete checklist',
        },
        id: checklistIdx,
        e: { clientX: 0, clientY: 0 },
      });
      //   this.dynamicCmp({ cmp: { name: 'attachment' } }
    },
    removeAtt() {
      let card = JSON.parse(JSON.stringify(this.card));
      card.attachment.computerAttachment.splice(this.cmp.id, 1);
      this.updateCard(card);
    },
    removeChecklist() {
      let card = JSON.parse(JSON.stringify(this.card));
      card.checklists.splice(this.cmp.id, 1);
      this.updateCard(card);
    },
    updateAtt(newVal) {
      let card = JSON.parse(JSON.stringify(this.card));

      card.attachment.computerAttachment[this.cmp.id].name = newVal;
      this.updateCard(card);
    },
    deleteLabel(label, e) {
      let board = JSON.parse(JSON.stringify(this.$store.getters.getBoard));
      let labelIdx = board.labels.findIndex((l) => l.id === label.currLabel.id);
      this.labelToDeleteId = labelIdx;
      this.dynamicCmp({
        cmp: {
          name: 'Label',
          txt: 'There is no undo. This will remove this label from all cards and destroy its history.',
          title: `Delete label?`,
          type: 'remove',
          btnTxt: 'Delete',
        },
        id: labelIdx,
        e,
      });

      // card.labelIds.splice(labelIdx, 1);
      // this.updateCard(card);
    },

    removeLabel() {
      let board = JSON.parse(JSON.stringify(this.$store.getters.getBoard));
      board.labels.splice(this.labelToDeleteId, 1);
      this.updateBoard(board);
    },
    updateBoard(board) {
      this.$store.dispatch({ type: 'updateBoard', board });
    },

    saveCommit(commit) {
      let card = JSON.parse(JSON.stringify(this.card));
      card.comments.unshift(commit);
<<<<<<< HEAD
      this.updateCard(card);
      this.$store.dispatch({ type: 'addActivity', activity: commit });
=======
      console.log(card.comments);
       this.updateCard(card);
      console.log(card.comments);
      setTimeout(()=>{

        this.$store.dispatch({ type: 'addActivity', activity: commit });
      },1000)
>>>>>>> 7083c0d53425e3efdc5036f701c67f22fef60988
    },
    updateCmm(commit) {
      let card = JSON.parse(JSON.stringify(this.card));
      let cmmIdx = card.comments.findIndex((cm) => cm.id === commit.id);
      card.comments.splice(cmmIdx, 1, commit);
      this.updateCard(card);
    },
    removeCommit(commId) {
      let card = JSON.parse(JSON.stringify(this.card));
      let cmmIdx = card.comments.findIndex((cm) => cm.id === commId);
      card.comments.splice(cmmIdx, 1);
      this.updateCard(card);
    },
    async deleteCard(card) {
      try {
        await this.$store.dispatch({
          type: 'deleteCard',
          card,
        });

        this.closeDetails();
      } catch (err) {
        console.log(err);
      }
    },
    getGroup(cardId) {
      const groups = JSON.parse(JSON.stringify(this.$store.getters.getBoard.groups));
      let currGroup = groups.find((g) => {
        return g.cards.find((c) => {
          // console.log(cardId);
          if (cardId === c.id) return g;
        });
      });
      return currGroup.title;
    },
    moveCard(cardId) {
      const boardId = this.$store.getters.getBoard._id;
      // console.log();
      this.$router.push(`/board/${boardId}/${cardId}`);
      this.loadCard();
    },
    toggleAttTr() {
      this.attTrLong = !this.attTrLong;
    },
  },
  computed: {
    attTrelix() {
      let cardIds = this.card.attachment.trelixAttachments;
      const groups = JSON.parse(JSON.stringify(this.$store.getters.getBoard.groups));
      let cardAttTrelix = groups.reduce((acc, g) => {
        g.cards.forEach((c) => {
          if (cardIds.some((cI) => cI === c.id)) {
            acc.push(c);
          }
        });
        return acc;
      }, []);
      this.attTrLongLength = cardAttTrelix.length;
      return this.attTrLong && cardAttTrelix > 4 ? cardAttTrelix : cardAttTrelix.splice(0, 4);
    },
    dynamicCmpToShow() {
      return this.cmp.cmp;
    },
    headerShow() {
      return (
        (this.card.members && this.card.members.length) ||
        (this.card.labelIds && this.card.labelIds.length) ||
        this.card.dueDate
      );
    },
    cardAttachments() {
      let computerAttachment = JSON.parse(JSON.stringify(this.card.attachment.computerAttachment));

      return !this.logAtt
        ? computerAttachment.splice(0, 4)
        : computerAttachment.length < 4
        ? computerAttachment
        : computerAttachment;
    },
    attHidden() {
      let computerAttachment = JSON.parse(JSON.stringify(this.card.attachment.computerAttachment));
      return computerAttachment.length - 4;
    },
    isCover() {
      // TODO: if we have bcg to the card
      // return this.card.bcg;
    },
    dueDateDay() {
      let t = this.card.dueDate;
      return new Date(t).getUTCDay() + 1;
    },
    bgColor() {
      if (this.card.style.bgColor) {
        return { backgroundColor: this.card.style.bgColor };
      } else if (this.card.style.bgUrl) {
        return {
          backgroundImage: this.card.style.bgUrl,
        };
      }
    },
    boardBcg() {
      console.log(this.getBoard.style.background);
      if (this.getBoard.style.background) {
        console.log(this.getBoard.style.background);
        return { background: this.getBoard.style.background };
      } else if (this.getBoard.style.backgroundImage) {
        console.log(this.getBoard.style.backgroundImage);
        return {
          backgroundImage: this.getBoard.style.backgroundImage,
        };
      }
    },
    editor() {
      return this.$store.getters.getModalForDisplay;
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
    getBoard() {
      const board = JSON.parse(JSON.stringify(this.$store.getters.getBoard));
      return board;
    },
  },
  watch: {
    editDescription() {
      if (this.editDescription) {
        setTimeout(() => {
          this.$refs.editInput.focus();
          this.$refs.editInput.select();
        }, 0);
      }
    },
    async '$store.getters.currCard'() {
      this.card = this.$store.getters.currCard;
      this.labels = await this.getLabel();
    },
    '$route.params.cardId'() {
      const cardId = this.$route.params.cardId;
      cardId ? this.loadCard() : '';
    },
  },
  mounted() {
    // this.selectInInput();
  },

  components: {
    cardEdit,
    checkList,
    activityLog,
    card,
    avatar,
  },
  async created() {
    await this.loadCard();
  },
};
</script>

<style></style>
