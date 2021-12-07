<template>
  <section class="app-header" :style="styleHeader" v-if="styleHeader">
    <nav>
      <div class="nav-list">
        <i class="material-icons-outlined pointer grid" @click="openMenu">
          apps
        </i>
        <!-- <i class="el-icon-s-grid"></i> -->

        <div
          @click="moveToBoards"
          class="logo pointer"
          @mouseover="isHover = true"
          @mouseleave="isHover = false"
        >
          <img
            v-if="isHover"
            src="https://res.cloudinary.com/trelix-casep21/image/upload/v1638632845/ezgif.com-gif-maker_ro1ned.gif"
            class="img-logo"
          />
          <img
            v-if="!isHover"
            src="https://res.cloudinary.com/trelix-casep21/image/upload/v1638632838/ezgif.com-gif-maker_1_hbqgql.gif"
            class="img-logo"
          />

          <!-- <font-awesome-icon v-if="!isHover" :icon="['fab', 'trello']" /> -->
          <strong> Trelix</strong>
        </div>
        <ul>
          <li>Workspace <i class="el-icon-arrow-down pointer"></i></li>
          <li @click="openRecentBoards">
            Recent <i class="el-icon-arrow-down pointer"></i>
          </li>
          <li>Starred <i class="el-icon-arrow-down pointer"></i></li>
          <li>Templates <i class="el-icon-arrow-down pointer"></i></li>
          <li>Create</li>
        </ul>
      </div>
      <div class="search">
        <el-input placeholder="Search... "></el-input>
        <div class="icon-header hover pointer">
          <span class="material-icons-outlined"> info </span>
        </div>
        <div class="icon-header hover pointer">
          <span class="material-icons-outlined"> notifications </span>
        </div>
        <div class="icon-header pointer pointer">
          <avatar
            @click.native="showProfile"
            v-if="createdBy.imgUrl"
            :src="createdBy.imgUrl"
            :size="35"
            :username="createdBy.fullname"
            class="member"
          ></avatar>
          <avatar
            v-else
            :size="35"
            @click.native="showProfile"
            :username="createdBy.fullname"
            class="member"
          ></avatar>
        </div>
      </div>
    </nav>
    <div class="modal" v-if="isShowProfile">
      <div class="title">
        <i class="el-icon-close" @click="isShowProfile = !isShowProfile"></i>
        <i>Account</i>
      </div>
      <hr />
      <div class="avatar-user">
        <avatar
          v-if="createdBy.imgUrl"
          :src="createdBy.imgUrl"
          :size="40"
          :username="createdBy.fullname"
          class="member"
        ></avatar>
        <avatar
          v-else
          :size="40"
          :username="createdBy.fullname"
          class="member"
        ></avatar>
        <!-- <avatar
                    :size="40"
                    username="member.username"
                    class="member"
                ></avatar> -->
        <div class="user-details">
          <div>
            <strong>{{ createdBy.fullname }}</strong>
          </div>

          <div class="fade">{{ createdBy.mail }}</div>
        </div>
      </div>
      <div class="active">Activity</div>
      <hr />
      <div class="active">Log out</div>
    </div>

    <div class="modal menu" v-if="isOpenMenu">
      <div class="title">
        <i class="el-icon-close" @click="openMenu"></i>
        <i>More from Atlassian</i>
      </div>
      <hr />
      <div class="center active" @click="moveToBoards">
        <div class="bcg-blue">
          <img
            src="https://res.cloudinary.com/trelix-casep21/image/upload/v1638632838/ezgif.com-gif-maker_1_hbqgql.gif"
          />
        </div>
        <div>Trelix</div>
      </div>
    </div>

    <div class="modal menu" v-if="isRecent">
      <div class="title">
        <i class="el-icon-close" @click="openRecentBoards"></i>
        <i>Recent boards</i>
      </div>
      <hr />
      <div class="center active" @click="moveToBoards">
        <div v-for="board in boards" :key="board._id">
            {{board.style}}
         <div :style="board.style"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import avatar from "vue-avatar";

export default {
  name: "appHeader",
  // props: ['createdBy'],
  data() {
    return {
      boards: "",
      starBoards: "",
      createdBy: "",
      isHover: false,
      isShowProfile: false,
      isOpenMenu: false,
      isRecent: false,
    };
  },
  computed: {
    styleHeader() {
      return this.$store.getters.getStyleHeader;
    },
  },
  created() {
      console.log(this.$store.getters.getBoardsForDisplay.boards);
    this.boards = this.$store.getters.getBoardsForDisplay.boards;
    this.starBoards = this.$store.getters.getBoardsForDisplay.boards.starBoards;
    // console.log(this.boards);
    this.createdBy = this.$store.getters.getUserConnect;
    console.log(this.createdBy);
    this.headerStyle = this.$store.getters.getStyleHeader;
  },
  methods: {
    openRecentBoards() {
      this.isRecent = !this.isRecent;
    },
    moveToBoards() {
      console.log("move");
      this.isRecent = false
      return this.$router.push(`/${this.createdBy.username}/boards`);
    },
    openMenu() {
      console.log("run");
      this.isOpenMenu = !this.isOpenMenu;
    },
    showProfile() {
      this.isShowProfile = !this.isShowProfile;
    },
  },
  // watch:{
  //      '$store.getters.getStyleHeader'(){
  //          this.headerStyle = this.$store.getters.getStyleHeader
  //      }

  // },
  mounted() {},
  components: {
    avatar,
  },
};
</script>

<style>
.img-board{

            }
</style>
