<template>
  <section class="card-edit">
    <section v-if="!cmpToShow">
      <div class="editor">
        <p class="material-icons-outlined btn-x pointer" @click.stop="closeDetails">close</p>
        <div class="edit-txt" @click.stop>
          <el-input type="textarea" :rows="5" v-model="cardToUpdate.title"> </el-input>
          <el-button type="primary" @click="saveCard">Save</el-button>
        </div>
        <div class="chose-edit">
          <ul>
            <li @click.stop.prevent="switchModel" class="pointer">
              <span class="material-icons-outlined"> branding_watermark </span>Open card
            </li>
            <li @click.stop="dynamicCmp('labels', 'labels', $event)" class="pointer" ref="labelsEl">
              <span class="material-icons-outlined"> sell </span>Edit labels
            </li>
            <li @click.stop.prevent="dynamicCmp('members', 'members', $event)" class="pointer" ref="membersEl">
              <span class="material-icons-outlined"> person_outline </span>Change members
            </li>
            <li @click.stop.prevent="dynamicCmp('cover', 'cover', $event)" class="pointer" ref="coverEl">
              <span class="material-icons-outlined"> branding_watermark </span>Change cover
            </li>
            <li @click.stop.prevent="dynamicCmp('dueDate', 'dates', $event)" class="pointer" ref="dueDateEl">
              <span class="material-icons-outlined"> watch_later </span>
              Edit dates
            </li>
            <li @click.stop.prevent="deleteCard" class="pointer">
              <span class="material-icons-outlined"> move_to_inbox </span>Archive
            </li>
          </ul>
        </div>
        <div
          class="dynamic-cmp"
          v-if="component.currCmp"
          @click.stop=""
          :style="{ top: component.position.y + 'px', left: component.position.x + 'px' }"
        >
          <component
            @click.stop
            :is="component.currCmp"
            :card="card"
            :header="component.header"
            :label="label"
            @closeModel="closeModel"
            @dynamicCmp="dynamicCmp"
            @dueDate="dueDate"
            @updateMember="updateMember"
            @changeBcg="changeBcg"
            @addAttTr="addTrelixAtt"
            @updateLabel="updateLabel"
            @newLabel="newLabel"
            @deleteLabel="deleteLabel"
            @changeBcgSize="changeBcgSize"
            @searchImgCmp="dynamicCmp('coverSearch', 'photo search', $event)"
            @backLabel="dynamicCmp('labels', 'labels', $event)"
          >
          </component>
        </div>
      </div>
    </section>

    <template v-else>
      <div class="sidebar">
        <div class="join-member" v-if="join">
          <h3>Suggested</h3>
          <a class="join-btn btn" @click="joinUser">
            <!-- v-if="meInCardMember(userId)" -->
            <span class="el-icon-user icon"></span> Join</a
          >
        </div>
        <h3>Add to card</h3>
        <div class="edit-btn">
          <a class="btn members" @click="dynamicCmp('members', 'members', $event)" title="Members" ref="membersEl">
            <span class="el-icon-user icon"></span>
            Members</a
          >

          <a class="btn labels" @click="dynamicCmp('labels', 'labels', $event)" title="Labels" ref="labelsEl">
            <span class="el-icon-price-tag label-icon icon"></span>
            Labels</a
          >
          <a
            class="btn checklist"
            @click="dynamicCmp('checklist', 'Add checklist', $event)"
            title="Checklist"
            ref="checklistEl"
          >
            <span class="material-icons-outlined icon"> check_box </span>
            Checklist</a
          >

          <a class="btn dates" @click="dynamicCmp('dueDate', 'dates', $event)" title="Dates" ref="dueDateEl">
            <span class="el-icon-time icon"></span>
            Dates</a
          >

          <a
            class="btn attachment"
            @click="dynamicCmp('attachment', 'attach from...', $event)"
            title="Attachment"
            ref="attachmentEl"
          >
            <span class="el-icon-paperclip icon"></span> Attachment</a
          >
          <a
            class="btn cover"
            @click="dynamicCmp('cover', 'cover', $event)"
            title="Cover"
            v-show="!card.style || (card.style && !card.style.bgColor && !card.style.bgUrl)"
            ref="coverEl"
          >
            <span class="cover-icon">
              <span class="material-icons-outlined icon"> web_asset </span>
            </span>
            Cover</a
          >
        </div>
      </div>
      <!-- :style="{ top: component.position.y + 'px', left: component.position.x + 'px' }" -->
      <div
        class="dynamic-cmp"
        v-if="component.currCmp"
        :style="{ top: component.position.y + 'px', left: component.position.x + 'px' }"
      >
        <component
          :is="component.currCmp"
          :card="card"
          :header="component.header"
          :label="label"
          @updateMember="updateMember"
          @closeModel="closeModel"
          @changeBcg="changeBcg"
          @addAttTr="addTrelixAtt"
          @updateLabel="updateLabel"
          @addChecklist="addChecklist"
          @dynamicCmp="dynamicCmp"
          @dueDate="dueDate"
          @computerAttImg="computerAttImg"
          @computerAttLink="computerAttLink"
          @searchImgCmp="dynamicCmp('coverSearch', 'photo search', $event)"
          @newLabel="newLabel"
          @deleteLabel="deleteLabel"
          @changeBcgSize="changeBcgSize"
          @backLabel="dynamicCmp('labels', 'labels', $event)"
        >
        </component>
      </div>
      <div
        class="dynamic-cmp-minimal"
        v-if="minComponent.currCmp"
        :style="{ top: minComponent.position.y + 'px', left: minComponent.position.x + 'px' }"
      >
        <!-- :style="{ top: minComponent.position.y + 'px', left: minComponent.position.x + 'px' }" -->
        <!-- <header>
        <h2>{{ minComponent.title }}</h2>
        <a @click="closeModel" class="el-icon-close"> </a>
      </header> -->
        <component
          :is="minComponent.currCmp"
          :card="card"
          :cmp="minComponent"
          :title="minComponent.title"
          @cmpRemove="cmpRemove"
          @closeModel="closeModel"
          @update="update"
        >
        </component>
      </div>
    </template>
  </section>
  <!-- </section> -->
</template>

<script>
import member from './edit/edit-member.vue';
import label from './edit-label.vue';
// import addLabel from './edit/add-label.vue';
import attachment from './edit/edit-attachment.vue';
import trelix from './edit/edit-trelix.vue';
import checklist from './edit/edit-checklist.vue';
import edit from './edit/edit-details.vue';
import remove from './edit/remove-edit.vue';
import cover from './edit/edit-cover.vue';
import coverSearch from './edit/edit-cover-search.vue';
import dueDate from './edit/edit-dueDate.vue';

import { utilService } from '../service/util.service.js';

export default {
  name: 'cardEdit',
  props: {
    card: {
      type: Object,
      required: true,
    },
    cmp: {
      type: Object,
    },
  },
  data() {
    return {
      isOpenEditor: false,
      cardToUpdate: null,
      component: {
        currCmp: null,
        header: '',
        position: { x: '', y: '' },
      },
      minComponent: {
        currCmp: null,
        name: '',
        txt: '',
        type: '',
        title: '',
        btnTxt: '',
        position: { x: '', y: '' },
      },
      label: { type: '', currLabel: null },
      propCmp: this.cmp,
      userJoin: false,
    };
  },
  created() {
    this.cardToUpdate = JSON.parse(JSON.stringify(this.card));
    if (this.cmp) {
      this.dynamicCmp(this.cmp);
    }
  },
  methods: {
    switchModel() {
      this.$store.commit({ type: 'updateModal', isModal: true });
    },
    dynamicCmp(cmp, header, e = null, cmpPos) {
      this.component.currCmp = null;
      this.minComponent.currCmp = null;
      this.component.header = cmp.name ? cmp.name : header;
      let position = cmp.name ? cmp.name : `${cmp}El`;
      if (cmp.pos && (cmp.pos.y || cmp.pos.y === 0)) {
        this.component.position.y = cmp.pos.y - 50;
        this.component.position.x = cmp.pos.x - 300;
        if (cmp.name === 'members') this.component.position.x = cmp.pos.x - 100;
        console.log(cmp.name === 'cover' && window.screen.width <= 1050);
        if (cmp.name === 'cover' && window.screen.width >= 1110) this.component.position.x = 450;
        if (window.screen.width <= 500) this.component.position.x = window.screen.width / 2 - 150;
      } else {
        let cmpPosition = this.$refs[`${position}`].getBoundingClientRect();

        if (window.screen.width <= 500) {
          cmpPosition.x = window.screen.width / 2 - 150;
          cmpPosition.y = 350;
          // cmpPosition.y = window.screen.height - cmpPosition.bottom;
        } else cmpPosition.x = 450;

        this.component.position.x = cmpPosition.x;
        this.component.position.y = cmpPosition.y;
      }
      this.component.currCmp = cmp.name && cmp.name ? `card-${cmp.name}` : `card-${cmp}`;
    },

    minDynamicCmp(cmp, e) {
      this.component.currCmp = null;
      this.minComponent.currCmp = null;
      this.component.position = { x: '', y: '' };
      let { name, type, txt, title, btnTxt } = cmp.name;
      console.log(cmp);
      this.minComponent = { name, type, txt, title, btnTxt };

      this.minComponent.position = cmp.pos;
      // this.minComponent.position.x = 450;
      if (cmp.pos && (cmp.pos.y || cmp.pos.y === 0)) {
        this.minComponent.position.y = cmp.pos.y;
        this.minComponent.position.x = cmp.pos.x;
      } else {
        this.minComponent.position.y = e.clientY;
        this.minComponent.position.x = e.clientX;
      }

      if (this.minComponent.position.x > 500) {
        this.minComponent.position.x -= 300;
      } else if (this.minComponent.position.x < 100) {
        this.minComponent.position.x += 200;
      }
      if (this.minComponent.position.y > 600) {
        this.minComponent.position.y += 500;
      } else if (this.minComponent.position.y < 100) {
        this.minComponent.position.y += 300;
      }

      console.log(this.minComponent.position);
      this.minComponent.currCmp = cmp.name.name ? `card-${cmp.name.type}` : `card-${cmp}`;

      // this.minComponent.currCmp = `card-${cmp.name.type}`;
    },
    closeModel() {
      this.component.currCmp = null;
      this.minComponent = {
        currCmp: null,
        name: '',
        txt: '',
        type: '',
        title: '',
        btnTxt: '',
        position: { x: '', y: '' },
      };
      // this.position = null;
      this.$emit('closeModel');
    },
    saveCard() {
      //  this.closeModel()
      this.closeDetails();
      this.$emit('updateCard', this.cardToUpdate);
    },
    closeDetails() {
      this.$emit('closeDetails');
    },

    changeBcg(color) {
      let card = JSON.parse(JSON.stringify(this.card));
      if (card.style.bgUrl !== color && color.length > 15) {
        card.style.bgUrl = color;
        card.style.bgColor = null;
      } else if (card.style.bgColor !== color) {
        if (color === card.style.bgColor || color === card.style.bgUrl) {
          card.style.bgColor = null;
          card.style.bgUrl = null;
        } else {
          card.style.bgColor = color;
          card.style.bgUrl = null;
        }
      } else {
        card.style.bgColor = null;
        card.style.bgUrl = null;
      }
      if (!card.style.isFull) card.style.isFull = false;

      // this.closeModel();
      this.$emit('updateCard', card);
    },
    changeBcgSize(size) {
      let card = JSON.parse(JSON.stringify(this.card));
      card.style.isFull = size;
      this.$emit('updateCard', card);
    },
    updateLabel(label) {
      let card = JSON.parse(JSON.stringify(this.card));
      if (card.labelIds.some((labelId) => labelId.lId === label.id)) {
        const labelIdx = card.labelIds.findIndex((labelId) => labelId.lId === label.id);
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
    addChecklist(checklist) {
      let card = JSON.parse(JSON.stringify(this.card));
      card.checklists.push(checklist);
      this.closeModel();
      this.$emit('updateCard', card);
    },
    computerAttImg(imgUrl) {
      let card = JSON.parse(JSON.stringify(this.card));
      card.attachment.computerAttachment.push(imgUrl);
      this.$emit('updateCard', card);
    },
    deleteChecklist(checklistId) {
      let card = JSON.parse(JSON.stringify(this.card));
      card.checklists.filter((c) => c.id !== checklistId);
      this.$emit('updateCard', card);
    },
    computerAttLink(link) {
      let card = JSON.parse(JSON.stringify(this.card));
      card.attachment.computerAttachment.push(link);
      this.$emit('updateCard', card);
    },
    cmpRemove() {
      this.$emit(`remove${this.minComponent.name}`);
      setTimeout(() => {
        this.closeModel();
      }, 500);
    },
    update(newVal) {
      this.$emit(`update${this.minComponent.name}`, newVal);
      setTimeout(() => {
        this.closeModel();
      }, 500);
    },
    deleteLabel(label, e) {
      this.$emit('deleteLabel', label, e);
      setTimeout(() => {
        this.closeModel();
      }, 0);
    },
    async newLabel(newLabel) {
      if (!newLabel.lId) {
        newLabel.id = utilService.makeId();
      }
      this.updateLabel(newLabel);

      try {
        let board = JSON.parse(JSON.stringify(this.$store.getters.getBoard));

        const lIdx = board.labels.findIndex((l) => l.id === newLabel.id);
        if (lIdx >= 0) {
          board.labelIds.splice(lIdx, 1, labelToUpdate);
        } else {
          const labelToUpdate = { id: newLabel.id, title: newLabel.title, color: newLabel.color };
          board.labels.push(labelToUpdate);
        }
        this.$emit('updateBoard', board);
        this.$store.dispatch({ type: 'updateBoard', board: JSON.parse(JSON.stringify(board)) });
        this.label.currLabel = null;
        this.closeModel();
      } catch (err) {
        console.log(err);
      }
    },
    joinUser() {
      let currUser = this.$store.getters.getUserConnect;
      const card = JSON.parse(JSON.stringify(this.card));
      card.members.push(currUser);
      this.$emit('updateCard', card);
    },
    addTrelixAtt(cardId) {
      let card = JSON.parse(JSON.stringify(this.card));
      card.attachment.trelixAttachments.push(cardId);
      this.$emit('updateCard', card);
      this.closeModel();
    },
    dueDate(dateObj) {
      let card = JSON.parse(JSON.stringify(this.card));
      let { date, remind } = dateObj;
      card.dueDate = { date, remind };
      this.$emit('updateCard', card);
      this.closeModel();
    },
    deleteCard() {
      this.$emit('deleteCard', this.card);
    },
    changeMuchBookOnPage() {
      console.log(window.innerWidth);
      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      console.log(width);
      // if (width > 992) {
      //     gSizePage = 12;
      // }
      return width;
    },
  },
  components: {
    'card-attachment': attachment,
    'card-trelix': trelix,
    'card-members': member,
    'card-labels': label,
    // 'card-addLabels': addLabel,
    'card-cover': cover,
    'card-checklist': checklist,
    'card-edit': edit,
    'card-remove': remove,
    'card-coverSearch': coverSearch,
    'card-dueDate': dueDate,
  },

  computed: {
    meInCardMember(userId) {
      this.card.members.some(member._id === userId);
    },
    cmpToShow() {
      return this.$store.getters.getModalForDisplay;
    },
    join() {
      let currUser = this.$store.getters.getUserConnect;
      if (this.card.members.some((m) => m._id === currUser._id)) {
        return false;
      }
      return true;
    },
  },
  watch: {
    // cmp: function (cmpName) {
    //   console.log(cmpName);

    //   if (cmpName) {
    //     cmpName.type ? this.minDynamicCmp(cmpName) : this.dynamicCmp(cmpName.name);
    //   }
    //   deep: true;
    // },
    '$store.getters.cmpDyn'() {
      let cmp = JSON.parse(JSON.stringify(this.$store.getters.cmpDyn));
      if (cmp) {
        cmp.name.type ? this.minDynamicCmp(cmp) : this.dynamicCmp(cmp);
      }
    },
  },
};
</script>

<style></style>
