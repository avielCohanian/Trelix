<template>
  <section class="card-edit">
    <section v-if="!isShowModal">
      <div class="editor">
        <p class="material-icons-outlined btn-x pointer" @click.stop.prevent="closeModel">close</p>
        <div class="edit-txt" @click.stop>
          <el-input type="textarea" :rows="5" v-model="cardToUpdate.title"> </el-input>
          <el-button type="primary" @click.stop="closeModel">Save</el-button>
        </div>
        <div class="chose-edit">
          <ul>
            <li @click.stop.prevent="switchModel" class="pointer">
              <span class="material-icons-outlined"> branding_watermark </span>Open card
            </li>
            <li @click.stop="dynamicCmp('labels', 'labels', $event)" class="pointer">
              <span class="material-icons-outlined"> sell </span>Edit labels
            </li>
            <li @click.stop.prevent="dynamicCmp('members', 'members', $event)" class="pointer">
              <span class="material-icons-outlined"> person_outline </span>Change members
            </li>
            <li @click.stop.prevent="dynamicCmp('cover', 'cover', $event)" class="pointer">
              <span class="material-icons-outlined"> branding_watermark </span>Change cover
            </li>
            <li class="pointer"><span class="material-icons-outlined"> arrow_forward </span>Move</li>
            <li class="pointer"><span class="material-icons-outlined"> file_copy </span>Copy</li>
            <li @click.stop.prevent="dynamicCmp('dates')" class="pointer">
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
            :is="component.currCmp"
            :card="card"
            :header="component.header"
            :label="label"
            @closeModel="closeModel"
            @dynamicCmp="dynamicCmp"
            @updateMember="updateMember"
            @changeBcg="changeBcg"
            @updateLabel="updateLabel"
            @addLabel="addLabel('Create label', $event)"
            @editLabel="editLabel"
            @newLabel="newLabel"
            @deleteLabel="deleteLabel(label, $event)"
            @changeBcgSize="changeBcgSize"
            @searchImgCmp="dynamicCmp('coverSearch', 'photo search', $event)"
            @backLabel="dynamicCmp('labels', 'labels', $event)"
          >
          </component>
        </div>
      </div>
    </section>

    <template>
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
          <a class="btn members" @click="dynamicCmp('members', 'members', $event)" title="Members">
            <span class="el-icon-user icon"></span>
            Members</a
          >

          <a class="btn labels" @click="dynamicCmp('labels', 'labels', $event)" title="Labels">
            <span class="el-icon-price-tag label-icon icon"></span>
            Labels</a
          >

          <a class="btn checklist" @click="dynamicCmp('checklist', 'Add checklist', $event)" title="Checklist">
            <span class="material-icons-outlined icon"> check_box </span>
            Checklist</a
          >

          <a class="btn dates" @click="dynamicCmp('dates', $event)" title="Dates">
            <span class="el-icon-time icon"></span>
            Dates</a
          >

          <a class="btn attachment" @click="dynamicCmp('attachment', 'attach from...', $event)" title="Attachment">
            <span class="el-icon-paperclip icon"></span> Attachment</a
          >
          <a
            class="btn cover"
            @click="dynamicCmp('cover', 'cover', $event)"
            title="Cover"
            v-show="!card.style || (card.style && !card.style.bgColor && !card.style.bgUrl)"
          >
            <span class="cover-icon">
              <span class="material-icons-outlined icon"> web_asset </span>
            </span>
            Cover</a
          >
        </div>
      </div>
      <div
        class="dynamic-cmp"
        v-if="component.currCmp"
        :style="{ top: component.position.y + 'px', left: component.position.x + 'px' }"
      >
        <!-- :style="{ top: component.position.top + 'px', left: component.position.left + 'px' }" -->
        <!-- <header>
        <h2>{{ component.name }}</h2>
        <a @click="closeModel" class="el-icon-close"> </a>
      </header> -->
        <component
          :is="component.currCmp"
          :card="card"
          :header="component.header"
          :label="label"
          @updateMember="updateMember"
          @closeModel="closeModel"
          @changeBcg="changeBcg"
          @updateLabel="updateLabel"
          @addChecklist="addChecklist"
          @dynamicCmp="dynamicCmp"
          @computerAttImg="computerAttImg"
          @computerAttLink="computerAttLink"
          @searchImgCmp="dynamicCmp('coverSearch', 'photo search', $event)"
          @addLabel="addLabel('Create label', $event)"
          @editLabel="editLabel"
          @newLabel="newLabel"
          @deleteLabel="deleteLabel(label, $event)"
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
          @remove="remove"
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
import addLabel from './edit/add-label.vue';
import attachment from './edit/edit-attachment.vue';
import trelix from './edit/edit-trelix.vue';
import checklist from './edit/edit-checklist.vue';
import edit from './edit/edit-details.vue';
import remove from './edit/remove-edit.vue';
import cover from './edit/edit-cover.vue';
import coverSearch from './edit/edit-cover-search.vue';

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
      isShowModal: null,
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
    this.isShowModal = this.$store.getters.getModalForDisplay;
    this.cardToUpdate = JSON.parse(JSON.stringify(this.card));
    if (this.cmp) {
      this.dynamicCmp(this.cmp);
    }
  },
  methods: {
    switchModel() {
      this.isShowModal = !this.isShowModal;
    },
    dynamicCmp(cmp, header, e = null) {
      this.component.currCmp = null;
      this.minComponent.currCmp = null;
      this.component.position = { x: '', y: '' };
      this.component.header = cmp.name && cmp.name.name ? cmp.name.name : header;
      this.component.position.x = 450;
      if (cmp.pos && (cmp.pos.y || cmp.pos.y === 0)) {
        this.component.position.y = cmp.pos.y - 50;
      } else this.component.position.y = e.clientY - 50;
      this.component.currCmp = cmp.name && cmp.name.name ? `card-${cmp.name.name}` : `card-${cmp}`;
    },

    minDynamicCmp(cmp, e) {
      this.component.currCmp = null;
      this.minComponent.currCmp = null;
      this.component.position = { x: '', y: '' };
      let { name, type, txt, title, btnTxt } = cmp.name;
      this.minComponent = { name, type, txt, title, btnTxt };
      this.minComponent.position = { x: '', y: '' };
      this.minComponent.position.x = 450;
      console.log(this.minComponent);
      if (cmp.pos && (cmp.pos.y || cmp.pos.y === 0)) {
        this.minComponent.position.y = cmp.pos.y;
      } else this.minComponent.position.y = e.clientY;

      this.minComponent.currCmp = cmp.name.name ? `card-${cmp.name.type}` : `card-${cmp}`;

      // this.minComponent.currCmp = `card-${cmp.name.type}`;
    },
    closeModel() {
      this.component.currCmp = null;
      this.minComponent.currCmp = null;
      // this.position = null;
      this.$emit('closeModel');
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
      console.log(card.style);
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
        console.log(card.labelIds, 'card.labelIds');
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
    remove() {
      console.log(`remove${this.minComponent.name}`);
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
    addLabel(header, e) {
      this.label.type = 'add';
      this.dynamicCmp('addLabels', header, e);
    },
    editLabel({ labelId, e }) {
      console.log(labelId);
      let label = this.$store.getters.boardLabels;
      label = label.find((l) => l.id === labelId);
      this.label.currLabel = JSON.parse(JSON.stringify(label));

      this.label.type = 'edit';
      this.dynamicCmp('addLabels', 'Change label', e);
    },
    deleteLabel(label, e) {
      this.$emit('deleteLabel', label, e);
      setTimeout(() => {
        this.closeModel();
      }, 0);
    },
    async newLabel(newLabel) {
      newLabel.id = utilService.makeId();

      this.updateLabel(newLabel);

      try {
        console.log(newLabel);
        let board = JSON.parse(JSON.stringify(this.$store.getters.getBoard));

        const lIdx = board.labels.findIndex((l) => l.id === newLabel.id);
        if (lIdx >= 0) {
          board.labelIds.splice(lIdx, 1, labelToUpdate);
        } else {
          const labelToUpdate = { id: newLabel.id, title: newLabel.title, color: newLabel.color };
          board.labels.push(labelToUpdate);
        }
        console.log(board.labels);
        this.$emit('updateBoard', board);
        this.$store.dispatch({ type: 'updateBoard', board });
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
  },
  components: {
    'card-attachment': attachment,
    'card-trelix': trelix,
    'card-members': member,
    'card-labels': label,
    'card-addLabels': addLabel,
    'card-cover': cover,
    'card-checklist': checklist,
    'card-edit': edit,
    'card-remove': remove,
    'card-coverSearch': coverSearch,
  },

  computed: {
    meInCardMember(userId) {
      this.card.members.some(member._id === userId);
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
      console.log(this.$store.getters.cmpDyn);
      let cmp = JSON.parse(JSON.stringify(this.$store.getters.cmpDyn));
      if (cmp) {
        cmp.name.type ? this.minDynamicCmp(cmp) : this.dynamicCmp(cmp);
      }
    },
  },
};
</script>

<style></style>
