<template>
  <section class="app-header" :style="styleHeader" v-if="styleHeader ">
    <nav>
      <div class="nav-list">
        <i class="material-icons-outlined pointer grid" @click="openMenu">
          apps
        </i>
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
          <strong> Trelix</strong>
        </div>
        <ul>
          <li @click="openRecentBoards">
            Recent <i class="el-icon-arrow-down pointer"></i>
          </li>
          <li>Starred <i class="el-icon-arrow-down pointer"></i></li>
          <li>Templates <i class="el-icon-arrow-down pointer"></i></li>
          <li @click="moveToBoards">Create</li>
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
        <div class="user-details">
          <div>
            <strong>{{ createdBy.fullname }}</strong>
          </div>

          <div class="fade">{{ createdBy.mail }}</div>
        </div>
      </div>
      <div class="active">Activity</div>
      <hr />
      <div class="active"  @click="logout">Log out</div>
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
      <div  
      
       v-if=" getBoardsForDisplay &&
        getBoardsForDisplay.boards &&
    getBoardsForDisplay.boards.length 
    "
    >
        <div v-for="board in getBoardsForDisplay.boards" :key="board._id" class="board-details">
          <div class="board-preview" @click="moveToBoard(board._id)" >

            <!-- {{board.style}} -->
         <div class="board-template" :style="board.style"></div>
            <div class="board-txt-container">

         <div class="board-title"> {{board.title}}</div>
            </div>
          </div>
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
      boards: null,
      // starBoards: [],
      createdBy: null,
      isHover: false,
      isShowProfile: false,
      isOpenMenu: false,
      isRecent: false,
    };
  },
 
  created() {
    this.createdBy = this.$store.getters.getUserConnect;
    // this.headerStyle = this.$store.getters.getStyleHeader;
  },
  methods: {
    logout(){
       this.isShowProfile = false
       this.$store.commit({ type: 'removeStyleHeader' });
       return this.$router.push("/logout")
  },
   
    openRecentBoards() {
      this.isRecent = !this.isRecent;
    },
    moveToBoards() {
      this.isOpenMenu =  false
      return this.$router.push(`/${this.createdBy.username}/boards`);
    },
    moveToBoard(boardId) {
      this.isRecent =  false
      return this.$router.push(`/board/${boardId}`)
    },
    openMenu() {
      this.isOpenMenu = !this.isOpenMenu;
    },
    showProfile() {
      this.isShowProfile = !this.isShowProfile;
    },
  },
  computed:{
     styleHeader() {
      return this.$store.getters.getStyleHeader;
    },
    getBoardsForDisplay(){
        return this.$store.getters.getBoardsForDisplay
    }
    
  },
  mounted() {},
  components: {
    avatar,
  },
};
</script>
