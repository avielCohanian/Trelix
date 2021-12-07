<template>
  <section class="card-edit">
    <div class="sidebar">
      <div class="join-member" v-if="!userJoin">
        <h3>Suggested</h3>
        <a class="join-btn btn" @click="join('userId')">
          <!-- v-if="meInCardMember(userId)" -->
          <span class="el-icon-user icon"></span> Join</a
        >
      </div>
      <h3>Add to card</h3>
      <div class="edit-btn">
        <a class="btn" @click="dynamicCmp('members')" title="Members">
          <span class="el-icon-user icon"></span>
          Members</a
        >

        <a class="btn" @click="dynamicCmp('labels')" title="Labels">
          <span class="el-icon-price-tag label-icon icon"></span>
          Labels</a
        >

        <a class="btn" @click="dynamicCmp('checklist')" title="Checklist">
          <span class="material-icons-outlined icon"> check_box </span>

          <!-- <span class="el-icon-document-checked icon"> </span> -->
          Checklist</a
        >

        <a class="btn" @click="dynamicCmp('dates')" title="Dates">
          <span class="el-icon-time icon"></span>
          Dates</a
        >

        <a class="btn" @click="dynamicCmp('attachment')" title="Attachment">
          <span class="el-icon-paperclip icon"></span> Attachment</a
        >

        <a
          class="btn"
          @click="dynamicCmp('cover')"
          title="Cover"
          v-show="!card.style.bgColor && !card.style.bgUrl"
        >
          <span class="cover-icon">
            <span class="material-icons-outlined icon"> web_asset </span>
          </span>
          Cover</a
        >
      </div>
    </div>
    <div class="dynamic-cmp" v-if="component.currCmp">
      <header>
        <h2>{{ component.name }}</h2>
        <a @click="closeModel" class="el-icon-close"> </a>
      </header>
      <component
        :is="component.currCmp"
        :card="card"
        @updateMember="updateMember"
        @changeBcg="changeBcg"
        @updateLabel="updateLabel"
        @addChecklist="addChecklist"
        @dynamicCmp="dynamicCmp"
        @computerAttImg="computerAttImg"
        @computerAttLink="computerAttLink"
        @searchImgCmp="dynamicCmp"
      >
      </component>
    </div>

    <div class="dynamic-cmp-minimal" v-if="minComponent.currCmp">
      <header>
        <h2>{{ minComponent.title }}</h2>
        <a @click="closeModel" class="el-icon-close"> </a>
      </header>
      <component
        :is="minComponent.currCmp"
        :card="card"
        :cmp="minComponent"
        @remove="removeAtt"
        @update="updateAtt"
      >
      </component>
    </div>
  </section>
</template>

<script>
import member from './edit/edit-member.vue';
import label from './edit-label.vue';
import attachment from './edit/edit-attachment.vue';
import trelix from './edit/edit-trelix.vue';
import cover from './edit/edit-cover.vue';
import checklist from './edit/edit-checklist.vue';
import edit from './edit/edit-details.vue';
import remove from './edit/remove-edit.vue';
import coverSearch from './edit/edit-cover-search.vue';

export default {
  name: 'cardEdit',
  props: {
    card: {
      type: Object,
      required: true,
    },
    cmp: {
      type: Object,
      // required: true,
    },
  },
  data() {
    return {
      component: {
        currCmp: null,
        name: '',
      },
      minComponent: {
        currCmp: null,
        name: '',
        txt: '',
        type: '',
        title: '',
        btnTxt: '',
      },
      propCmp: this.cmp,
      userJoin: false,
    };
  },
  created() {
    if (this.cmp) {
      this.dynamicCmp(this.cmp);
    }
  },
  methods: {
    dynamicCmp(cmp) {
      console.log(cmp);
      if (cmp === 'attachment') this.component.name = 'attach from...';
      if (cmp === 'coverSearch') this.component.name = 'photo search';
      if (cmp === 'editAttachment') {
        this.component.name = 'Remove attachment?';
      } else {
        this.component.name = cmp;
      }
      this.component.currCmp = `card-${cmp}`;
    },
    minDynamicCmp(cmp) {
      // if (cmp === 'removeEditAttachment') {
      //   this.minComponent.name = 'Remove attachment?';
      //   console.log(this.minComponent.name);
      // } else {
      this.minComponent.name = cmp.name;
      this.minComponent.type = cmp.type;
      this.minComponent.txt = cmp.txt;
      this.minComponent.title = cmp.title;
      this.minComponent.btnTxt = cmp.btnTxt;
      console.log(cmp);
      // }
      this.minComponent.currCmp = `card-${cmp.type}`;
    },
    closeModel() {
      this.component.currCmp = null;
      this.minComponent.currCmp = null;
      this.$emit('closeModel');
    },
    join(userId) {
      //TODO
      this.userJoin = true;
    },
    changeBcg(color) {
      let card = JSON.parse(JSON.stringify(this.card));
      // if (typeof color === 'object') {
      console.log(color);
      console.log(card.style.bgUrl);
      console.log(card.style.bgColor);
      if (card.style.bgUrl !== color && color.length > 15) {
        card.style.bgUrl = color;
        card.style.bgColor = null;
      } else if (card.style.bgColor !== color) {
        if (color === card.style.bgColor || color === card.style.bgUrl) {
          console.log(color, 'aa');
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
      this.closeModel();
      this.$emit('updateCard', card);
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
    addChecklist(checklist) {
      let card = JSON.parse(JSON.stringify(this.card));
      card.checklists.push(checklist);
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
    removeAtt() {
      this.$emit('removeAtt');
      setTimeout(() => {
        this.closeModel();
      }, 500);
    },
    updateAtt(newVal) {
      this.$emit('updateAtt', newVal);
      setTimeout(() => {
        this.closeModel();
      }, 500);
    },
  },
  components: {
    'card-attachment': attachment,
    'card-trelix': trelix,
    'card-members': member,
    'card-labels': label,
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
  },
  watch: {
    'cmp.cmp': function (cmpName) {
      console.log(cmpName);

      if (cmpName) {
        cmpName.type ? this.minDynamicCmp(cmpName) : this.dynamicCmp(cmpName.name);
        // ? this.minDynamicCmp(cmpName)
        // : this.dynamicCmp(cmpName.name);
      }
      deep: true;
    },
  },
};
</script>

<style></style>
