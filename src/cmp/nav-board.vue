<template>
    <section class="full">
        <section class="nav-board">
            <ul class="left">
                <li>Board <i class="el-icon-arrow-down"></i></li>
                <li>Board Name</li>
                <li class="el-icon-star-off"></li>
                <span class="divider"></span>
                <li>Trelix Workspace</li>
                <span class="divider"></span>
                <li class="icon"><span class="material-icons-outlined ">people</span>Workspace visible</li>
                <span class="divider"></span>
                <li v-for="member in getBoard.members" :key="member.id" class="avatar-logo" @click="showProfile">
                    <avatar
                        :size="35"
                        :username="member.fullname"
                        class="member icon-member"
                    ></avatar>
                </li>
                <li class="icon"><span class="material-icons-outlined ">person_add</span>Invite</li>
            </ul>
            <div class="modal" v-if="isShowProfile">
                  <div class="title">
                    <i class="el-icon-close" @click="isShowProfile = !isShowProfile"></i>
                    <i>Account</i>
                </div>
                <hr />
                <div class="avatar-user"> 

                <avatar  :size="35 "  username="member.username" class="member" ></avatar>
                <div class="user-details" v-for="member in getBoard.members" :key="member.id">
               <div>{{member.fullname}}</div>
               
               <div>{{member.mail}}</div>
                </div>
                </div>
               <div>Activity</div>
               <hr>
               <div>Log out</div>
                
        </div>
            <ul class="right">
                <li class="icon"><span class="material-icons-outlined ">flash_on</span>Automation</li>
               <span class="divider"></span>
                <li class="icon"><span class="material-icons-outlined">filter_list</span>filter</li>
                <li class="el-icon-more icon" @click="toggleMenu">Show menu</li>
            </ul>
        </section>
        <nav-menu @closeMenu="toggleMenu" v-if="showMenu" />
    </section>
</template>

<script>
import avatar from 'vue-avatar';
import navMenu from '../cmp/nav-menu.vue';

export default {
    name: 'navBoard',
    props: ['getBoard'],
    data() {
        return {
            isShowProfile: false,
            showMenu: false,
        };
    },
    computed: {},
    methods: {
        showProfile() {
            console.log('clickk');
            this.isShowProfile = !this.isShowProfile;
        },
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },

    },
    mounted() {},
    components: {
        avatar,
        navMenu,
    },
};
</script>

<style></style>
