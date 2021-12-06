<template>
  <section class="full">
    <section class="nav-board">
      <ul class="left">
        <li class="pointer">Board <i class="el-icon-arrow-down"></i></li>

        <!-- <li class="pointer name-board" v-if="!isEditTitle">

          <p @click="editTitle" >{{getBoard.title}}</p>
          </li>
          
<span class="edit-title">

          <input
          v-if="isEditTitle"
                    ref="input"
                    class="edit-title-input"
                   
                    :class="{ focus: isEditTitle }"
                    v-model="getBoard.title"
                    @keyup.enter.native="editTitle"
                    @click.native="editTitle"
                ></input>
</span> -->
<li class="edit-title-container">

           <el-input
                    ref="input"
                    class="edit-title"
                    size="mini"
                    :class="{ focus: isEditTitle }"
                    v-model="getBoard.title"
                    @keyup.enter.native="editTitle"
                    @click.native="editTitle"
                ></el-input>
</li>

        <li class="el-icon-star-off pointer"></li>
        <span class="divider"></span>
        <li class="pointer">Trelix Workspace</li>
        <span class="divider"></span>
        <li class="icon pointer">
          <span class="material-icons-outlined">people</span>Workspace visible
        </li>
        <span class="divider"></span>
        <div class="icon-user pointer">
          <li
            v-for="member in getBoard.members"
            :key="member.id"
            class="avatar-logo"
            @click="showProfile(member)"
          >
            <avatar
              v-if="member.imgUrl"
              :src="member.imgUrl"
              :size="35"
              :username="member.fullname"
              class="member icon-member"
            ></avatar>
            <avatar
              v-else
              :size="35"
              :username="member.fullname"
              class="member icon-member"
            ></avatar>
          </li>
        </div>
        <li class="icon pointer">
          <span class="material-icons-outlined">person_add</span>Invite
        </li>
      </ul>
      <div class="modal" v-if="isShowProfile">
        <div class="title">
          <i class="el-icon-close" @click="isShowProfile = !isShowProfile"></i>
          <!-- <i>Account</i> -->
        </div>
        <!-- <hr /> -->
        <!-- <div class="avatar-user "> -->
            <!-- <div class="flex-center"> -->

          <div class="user-details ">
              <div>

          <avatar
            v-if="currMember.imgUrl"
            :src="currMember.imgUrl"
            :size="50"
            username="currMember.username"
            class="member"
          ></avatar>
          <avatar
            v-else
            :size="50"
            username="currMember.username"
            class="member"
          ></avatar>
              </div>
            <div class="name">
              <strong>{{ currMember.fullname }}</strong>
            <div class="mail">{{ currMember.mail }}</div>
            </div>
            </div>

            <div class="choice ">
              <div class="btn-choice">Change permissions... (Normal)</div>
              <div class="btn-choice">view member's board activity</div>
              <div class="btn-choice" @click="removeMember">Remove from board...</div>
            </div>
          <!-- </div> -->
        </div>
      <!-- </div> -->
      <ul class="right">
        <li class="icon pointer">
          <span class="material-icons-outlined">flash_on</span>Automation
        </li>
        <span class="divider"></span>
        <li class="icon pointer">
          <span class="material-icons-outlined">filter_list</span>Filter
        </li>
        <li class="icon pointer " @click="toggleMenu">
          <span class="el-icon-more icon "></span> Show menu</li>
      </ul>
    </section>
    <nav-menu @closeMenu="toggleMenu" :isShow="showMenu" :class="isShowMenu" />
  </section>
</template>

<script>
import avatar from "vue-avatar";
import navMenu from "./menu/nav-menu.vue";

export default {
  name: "navBoard",
  props: ["getBoard"],
  data() {
    return {
      isEditTitle:false,
      isShowProfile: false,
      showMenu: false,
      currMember: null,
    };
  },
  computed: {
    isShowMenu() {
      return this.showMenu ? "open-menu" : "close-menu";
    },
  },
  methods: {
    editTitle() {
            this.isEditTitle = !this.isEditTitle;
           
        },
       async removeMember() {
            try {
                var res = await this.$store.dispatch({
                    type: 'removeMember',
                    member: this.currMember,
                });
                console.log(res);
                    if(res) return this.isShowProfile = false
            } catch (err) {
                console.log(err);
            }
        },
     
    showProfile(member) {
      console.log("clickk");
      this.isShowProfile = !this.isShowProfile;
      this.currMember = member;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
watch: {
        isEditTitle() {
            if (this.isEditTitle) {
                this.$refs.input.select();
            } else this.$refs.input.focus();
        },
        // group(val){
        //   this.group = val
        // }
    },
  mounted() {},
  components: {
    avatar,
    navMenu,
  },
};
</script>

<style></style>
