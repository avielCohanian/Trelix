<template>
    <section class="full">
        <section class="nav-board">
            <ul class="left">
                <li>Board <i class="el-icon-arrow-down"></i></li>
                <li>Board Name</li>
                <li class="el-icon-star-off"></li>
                |
                <li>Trelix Workspace</li>
                |
                <li><i class="fas fa-users"></i>Workspace visible</li>
                |
                <li v-for="member in getBoard.members" :key="member.id">
                    <avatar
                        :size="35"
                        :username="member.fullname"
                        class="member"
                    ></avatar>
                </li>
                <li><i class="fas fa-user-plus"></i>Invite</li>
            </ul>
            <ul class="right">
                <li>Automation</li>
                |
                <li>filter</li>
                <li class="el-icon-more" @click="toggleMenu">Show menu</li>
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
