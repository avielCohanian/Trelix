<template>
    <section class="app-header">
        <nav>
            <div class="nav-list">
                <i class="material-icons-outlined pointer grid"> apps </i>
                <!-- <i class="el-icon-s-grid"></i> -->

                <div class="logo pointer">
                    <font-awesome-icon :icon="['fab', 'trello']" /><strong>
                        Trelix</strong
                    >
                </div>
                <ul>
                    <li>Workspace <i class="el-icon-arrow-down pointer"></i></li>
                    <li>Recent <i class="el-icon-arrow-down pointer"></i></li>
                    <li>Starred <i class="el-icon-arrow-down pointer"></i></li>
                    <li>Templates <i class="el-icon-arrow-down pointer"></i></li>
                    <li>Create</li>
                </ul>
            </div>
            <div class="search">
                <el-input placeholder="Search... "></el-input>
                <div class="icon-header hover pointer" >
                    <span class="material-icons-outlined" > info </span>
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
              class="member "
            ></avatar>
            <avatar
              v-else
              :size="35"
               @click.native="showProfile"
              :username="createdBy.fullname"
              class="member "
            ></avatar>
                </div>
            </div>
        </nav>
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
              v-if="createdBy.imgUrl"
              :src="createdBy.imgUrl"
              :size="40"
              :username="createdBy.fullname"
              class="member "
            ></avatar>
            <avatar
              v-else
              :size="40"
              :username="createdBy.fullname"
              class="member "
            ></avatar>
                <!-- <avatar
                    :size="40"
                    username="member.username"
                    class="member"
                ></avatar> -->
                <div class="user-details">
                    <div ><strong>{{ createdBy.fullname }}</strong></div>

                    <div class="fade">{{ createdBy.mail }}</div>
                </div>
            </div>
            <div class="active">Activity</div>
            <hr />
            <div class="active">Log out</div>
        </div>
    </section>
</template>

<script>
import avatar from 'vue-avatar';

export default {
    name: 'appHeader',
    props: ['createdBy'],
    data() {
        return {
            isShowProfile: false,
        };
    },
    computed: {},
    methods: {
        showProfile() {
            console.log('clickk');
            this.isShowProfile = !this.isShowProfile;
        },
    },
    mounted() {},
    components: {
        avatar,
    },
};
</script>

<style></style>
