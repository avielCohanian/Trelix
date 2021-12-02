<template>
    <section class="full">
        <section class="nav-board"> 
            <ul class="left">
                <li class="pointer">Board <i class="el-icon-arrow-down "></i></li>
                <li class="pointer">Board Name</li>
                <li class="el-icon-star-off pointer"></li>
                <span class="divider "></span>
                <li class="pointer">Trelix Workspace</li>
                <span class="divider"></span>
                <li class="icon pointer">
                    <span class="material-icons-outlined">people</span>Workspace
                    visible
                </li>
                <span class="divider"></span>
                <div class="icon-user pointer">
                    <li
                        v-for="member in getBoard.members"
                        :key="member.id"
                        class="avatar-logo"
                        @click="showProfile"
                    >
                        <avatar
                            :size="35"
                            :username="member.fullname"
                            class="member icon-member"
                        ></avatar>
                    </li>
                </div>
                <li class="icon pointer">
                    <span class="material-icons-outlined">person_add</span
                    >Invite
                </li>
            </ul>
            <div class="modal" v-if="isShowProfile">
                <div class="title">
                    <i
                        class="el-icon-close"
                        @click="isShowProfile = !isShowProfile"
                    ></i>
                    <i>Account</i>
                </div>
                <hr />
                <div class="avatar-user">
                    <avatar
                        :size="32"
                        username="member.username"
                        class="member"
                    ></avatar>
                    <div
                        class="user-details"
                        v-for="member in getBoard.members"
                        :key="member.id"
                    >
                        <div>{{ member.fullname }}</div>

                        <div>{{ member.mail }}</div>
                    </div>
                </div>
                <div>Activity</div>
                <hr />
                <div>Log out</div>
            </div>
            <ul class="right">
                <li class="icon pointer">
                    <span class="material-icons-outlined">flash_on</span
                    >Automation
                </li>
                <span class="divider"></span>
                <li class="icon pointer">
                    <span class="material-icons-outlined">filter_list</span
                    >filter
                </li>
                <li class="el-icon-more icon pointer" @click="toggleMenu">
                    Show menu
                </li>
            </ul>
        </section>
        <nav-menu @closeMenu="toggleMenu" :class="isShowMenu" />
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
    computed: {
        isShowMenu() {
            return this.showMenu ? 'open-menu' : 'close-menu';
        },
    },
    methods: {
        showProfile() {
            console.log('clickk');
            this.isShowProfile = !this.isShowProfile;
        },
        toggleMenu() {
            console.log('CLOSE ELI');
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
