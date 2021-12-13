<template>
  <section class="activity-log">
    <font-awesome-icon icon="tasks" class="svg" />
    <header>
      <span class="activity-header">
        <h3>Activity</h3>
      </span>
      <span class="activity-header-btn">
        <a class="show-btn" @click="showActivity">Show details</a>
      </span>
    </header>

    <div class="activity-container">
      <form @submit.prevent="saveCommit(0)">
        <avatar v-if="user.imgUrl" :src="user.imgUrl" :size="32" class="avatar"></avatar>
        <avatar v-else :username="user.fullname" :size="32" class="avatar"></avatar>
        <input
          type="textarea"
          :class="edit"
          placeholder="Write a comment..."
          class="comment-edit"
          v-model="newCommit.cmmTxt"
          @click="editModeComment"
        />
        <div class="edit-btn" v-if="edit">
          <a class="save-btn" :class="saveBtn" @click="saveCommit(0)"> Save</a>
        </div>
      </form>
    </div>

    <ul class="commit-list">
      <li v-for="cmm in currCommits" :key="cmm.id">
        <div class="user-avatar">
          <avatar v-if="cmm.byMember.imgUrl" :src="cmm.byMember.imgUrl" :size="32" class="avatar"></avatar>
          <avatar v-else :username="cmm.byMember.fullname" :size="32" class="avatar"></avatar>
        </div>

        <form @submit.prevent>
          <strong>{{ cmm.byMember.fullname }}</strong>
          {{ cmm.createdAt | moment('from') }}

          <!-- :value="cmm.cmmTxt" -->
          <input
            type="textarea"
            placeholder="Write a comment..."
            class="comment-edit"
            :class="editCmm(cmm.id)"
            v-model="cmm.cmmTxt"
            @click.stop
          />

          <div class="edit-btn" v-if="editCmm(cmm.id)">
            <a class="save-btn" :class="saveBtn" @click="saveCommit(cmm.id)"> Save</a>
            <a class="back-btn close-btn el-icon-close" @click="closeDetails"> </a>
          </div>
          <div v-else class="cmm-btn">
            <a class="edit-cmm-btn" @click="editUserComment(cmm)"> Edit</a>
            <span class="span">-</span>
            <a class="delete-btn" @click="deleteCommit(cmm.id)"> Delete</a>
          </div>
        </form>
      </li>
    </ul>
  </section>
</template>

<script>
import avatar from 'vue-avatar';
import moment from 'moment';
import { boardService } from '../service/board.service.js';
import { utilService } from '../service/util.service.js';
export default {
  data() {
    return {
      user: null,
      props: {
        card: {
          type: Object,
          required: true,
        },
      },
      editMode: false,
      cardEdit: null,
      activity: null,
      newCommit: null,
    };
  },
  created() {
    this.user = this.$store.getters.getUserConnect;
    this.newCommit = this.getEmptyActivity();
  },
  methods: {
    showActivity() {
      // TODO: show all activity to the card
    },
    editModeComment() {
      this.editMode = true;
    },
    editModeClose() {
      this.editMode = false;
    },
    editUserComment(cmm) {
      this.activity = cmm;
      console.log(this.activity.id);
    },
    saveCommit(cmmId = null) {
      if (!cmmId) {
        this.newCommit.byMember = this.user;
        this.newCommit.id = utilService.makeId();
        this.newCommit.createdAt = Date.now();
        this.$emit('saveCommit', this.newCommit);
        this.newCommit = this.getEmptyActivity();
      } else {
        this.$emit('updateCmm', this.activity);
        this.activity = null;
      }
      this.editModeClose();
    },
    deleteCommit(cmmId) {
      this.$emit('removeCommit', cmmId);
    },
    getEmptyActivity() {
      return {
        cmmTxt: '',
        txt: 'added commit ',
        createdAt: null,
        byMember: {},
        card: {
          id: '',
          title: '',
        },
      };
    },
    editCmm(cmmId) {
      return this.activity && this.activity.id === cmmId ? 'edit' : '';
    },
    closeDetails() {
      this.activity = null;
    },
  },
  computed: {
    edit() {
      return this.editMode ? 'edit' : '';
    },

    saveBtn() {
      return 'save';
    },
    currCommits() {
      return JSON.parse(JSON.stringify(this.$store.getters.currCard.comments));
    },
  },

  components: {
    avatar,
  },
};
</script>
<style></style>
