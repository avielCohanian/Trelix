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
          <li @click="openStarredBoards">Starred <i class="el-icon-arrow-down pointer"></i></li>
          <li @click="openTemplatesBoards">Templates <i class="el-icon-arrow-down pointer"></i></li>
          <li @click="moveToBoards" :style="{margin: '2px'}">Create</li>
        </ul>
      </div>
      <div class="search">
        <el-input placeholder="Search... "></el-input>
        <!-- <div class="icon-header hover pointer">
          <span class="material-icons-outlined"> info </span>
        </div> -->
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
        <i class="el-icon-close pointer" @click="isShowProfile = !isShowProfile"></i>
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
        <div class="user-details detraction">
          <div>
            <strong>{{ createdBy.fullname }}</strong>
          </div>

          <div class="fade">{{ createdBy.email }}</div>
        </div>
      </div>
      <!-- <div class="active">Activity</div> -->
      <!-- <hr /> -->
      <div class="active"  @click="logout">Log out</div>
    </div>

    <div class="modal menu" v-if="isOpenMenu">
      <div class="title">
        <i class="el-icon-close pointer" @click="openMenu"></i>
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
        <i class="el-icon-close pointer" @click="openRecentBoards"></i>
        <i>Recent boards</i>
      </div>
      <hr />
      <div  
      
       v-if=" getBoardsForDisplay &&
        getBoardsForDisplay.boards &&
    getBoardsForDisplay.boards.length 
    "
    >
        <div v-for="board in getBoardsForDisplay.boards" :key="board._id" >
            <!-- <router-link :to="`${board._id}`"> -->
          <div class="board-details" @click="moveToBoard(board._id)">

          <div class="board-preview"  >

            <!-- {{board.style}} -->
         <div class="board-template" :style="board.style"></div>
            <div class="board-txt-container">

         <div class="board-title"> {{board.title}}</div>
            </div>
          </div>
          </div>
            <!-- </router-link> -->
        </div>
      </div>
    </div>

    <div class="modal menu" v-if="isStared">
      <div class="title">
        <i class="el-icon-close pointer" @click="openStarredBoards"></i>
        <i>Starred boards</i>
      </div>
      <hr />
      <div  
      
       v-if=" getBoardsForDisplay &&
        getBoardsForDisplay.boardsStar &&
    getBoardsForDisplay.boardsStar.length 
    "
    >
        <div v-for="board in getBoardsForDisplay.boardsStar" :key="board._id" >
            <!-- <router-link :to="`${board._id}`"> -->

          <div class="board-details" @click="moveToBoard(board._id)">

          <div class="board-preview"  >

            <!-- {{board.style}} -->
         <div class="board-template" :style="board.style"></div>
            <div class="board-txt-container">

         <div class="board-title"> {{board.title}}</div>
            </div>
          </div>
          </div>
            <!-- </router-link> -->
        </div>
      </div>
    </div>

    <div class="modal menu" v-if="isTemplate">
      <div class="title">
        <i class="el-icon-close pointer" @click="openTemplatesBoards"></i>
        <i>Templates</i>
      </div>
      <hr />
      <div  
    >
        <div v-for="temp in templateBoards" :key="temp._id" >
              <div class="board-details" @click="createBoardTemp(temp)"> 

          <div class="board-preview"  >
         <div class="board-template" :style="temp.style"></div>
            <div class="board-txt-container">

         <div class="board-title"> {{temp.title}}</div>
            </div>
          </div>
              </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {boardService} from '../service/board.service.js'
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
      isStared:false,
      isTemplate:false,
      templateBoards:'',
    };
  },
 
  created() {
    this.$store.dispatch({type:'loadBoards'})
      this.getTemplate()
    this.createdBy = this.$store.getters.getUserConnect;
    // this.headerStyle = this.$store.getters.getStyleHeader;
  },
  methods: {
    async createBoardTemp(temp){
        const copyUser = JSON.parse(JSON.stringify(this.$store.getters.getUserConnect));
          try{
            const newBoard = await boardService.createBoardTemp(temp,copyUser)
             copyUser.boards.boards.push(newBoard._id);
              this.$store.dispatch({ type: 'updateUser', currUser: copyUser });
              this.$router.push(`/board/${newBoard._id}`);
          }catch(err){
            throw err
          }
        console.log('hi');
        // this.iScreateBoard = !this.iScreateBoard
      },
    logout(){
       this.isShowProfile = false
       this.$store.commit({ type: 'removeStyleHeader' });
       return this.$router.push("/logout")
  },
   
    openRecentBoards() {
      this.isRecent = !this.isRecent;
       this.isStared = false
        this.isTemplate= false
        this.isOpenMenu =false
    },
    openStarredBoards() {
      this.isStared = !this.isStared;
       this.isTemplate= false
        this.isRecent =false
        this.isOpenMenu =false
    },
    openTemplatesBoards() {
      this.isTemplate= !this.isTemplate;
        this.isRecent =false
         this.isStared = false
           this.isOpenMenu =false
    },
    moveToBoards() {
      this.isOpenMenu =  false
      this.isRecent =false
         this.isStared = false
         this.isTemplate= false
      return this.$router.push(`/${this.createdBy.username}/boards`);
    },
    moveToBoard(boardId) {
       this.isOpenMenu =  false
         this.isStared = false
         this.isTemplate= false
      this.isRecent =  false
      //  this.$router.push(`/${this.createdBy.username}/boards`);
      return this.$router.push(`/board/${boardId}`);
    },
    openMenu() {
      this.isOpenMenu = !this.isOpenMenu;
       this.isTemplate= false
        this.isRecent =false
         this.isStared = false
    },
    showProfile() {
      this.isShowProfile = !this.isShowProfile;
    },
    //  getTemplate(){
    //     this.templateBoards =  boardService.getTemplates()
    //    console.log( this.templateBoards);
    //   },
      async getTemplate(){
        this.templateBoards =  await boardService.getTemplates()
      },
  },
  computed:{
     styleHeader() {
      return this.$store.getters.getStyleHeader;
    },
    getBoardsForDisplay(){
      console.log(this.$store.getters.getBoardsForDisplay);
        return this.$store.getters.getBoardsForDisplay
    }
    
    
  },
  watch:{
        '$store.getters.getUserConnect'(){
          this.createdBy=this.$store.getters.getUserConnect
            // console.log(,'$store.getters.getUserConnect');
        }
    },
  mounted() {},
  components: {
    avatar,
  },
};
</script>
