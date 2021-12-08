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
      <form v-if="!editMode">
        <avatar v-if="user.imgUrl" :src="user.imgUrl" :size="32" class="avatar"></avatar>
        <avatar v-else :username="user.fullname" :size="32" class="avatar"></avatar>
        <input
          type="textarea"
          :class="edit"
          placeholder="Write a comment..."
          class="comment-edit"
          @click="editModeComment"
        />

        <div class="edit-btn" v-if="edit">
          <a class="save-btn" :class="saveBtn" @click="saveCommit(commit.id)"> Save</a>
        </div>
      </form>
    </div>

    <ul class="commit-list">
      <li v-for="commit in cardCommit" :key="commit.id">
        <div class="user-avatar">
          <avatar v-if="commit.byMember.imgUrl" :src="commit.byMember.imgUrl" :size="32" class="avatar"></avatar>
          <avatar v-else :username="commit.byMember.fullName" :size="32" class="avatar"></avatar>
        </div>
        <form v-if="cardEdit === activity.id">
          <strong>{{ commit.byMember.fullName }}</strong>
          {{ commit.createdAt | moment('from') }}

          <input :value="commit.txt" type="textarea" placeholder="Write a comment..." class="comment-edit" />
          <!-- -->
          <div v-if="cardEdit === activity.id" class="edit-btn">
            <a class="edit-btn" @click="editUserComment(comment.id)"> Edit</a>
            <a class="delete-btn"> Delete</a>
          </div>
        </form>
      </li>
    </ul>
  </section>
</template>

<script>
import avatar from 'vue-avatar';
import moment from 'moment';

export default {
  data() {
    return {
      user: null,
      editMode: false,
      cardCommit: [
        { id: 'sas', txt: 'sacasca', createdAt: Date.now(), byMember: { fullName: 'yosi1' } },
        { id: '1as', txt: '46747467', createdAt: Date.now(), byMember: { fullName: 'yosi2' } },
        { id: '3as', txt: 'scsa', createdAt: Date.now(), byMember: { fullName: 'yosi3' } },
      ],
      cardEdit: null,
      activity: { id: null },
    };
  },
  created() {
    this.user = this.$store.getters.getUserConnect;
    console.log(this.user);
  },
  methods: {
    showActivity() {
      // TODO: show all activity to the card
    },
    editModeComment() {
      this.editMode = !this.editMode;
    },
    editUserComment(aId) {
      this.activity.id = aId;
    },
    saveCommit(commitId) {},
  },
  computed: {
    edit() {
      return 'edit';
    },
    saveBtn() {
      return 'save';
    },
  },

  components: {
    avatar,
  },
};
</script>

<style></style>
