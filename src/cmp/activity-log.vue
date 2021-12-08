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
      <avatar v-if="user.imgUrl" :src="user.imgUrl" :size="32" class="avatar"></avatar>
      <avatar v-else :username="user.fullname" :size="32" class="avatar"></avatar>
      <form>
        <input
          v-if="!editMode"
          type="textarea"
          placeholder="Write a comment..."
          class="comment-edit"
          @click="editModeComment"
        />
        <div class="edit-btn">
          <a class="save-btn"> Save</a>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import avatar from 'vue-avatar';

export default {
  data() {
    return {
      user: null,
      editMode: false,
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
  },
  components: {
    avatar,
  },
};
</script>

<style></style>
