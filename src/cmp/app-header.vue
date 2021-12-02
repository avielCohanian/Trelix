<template>
    <section class="app-header">
        <nav>
            <div class="nav-list">
                <i class="el-icon-s-grid"></i>
              
                <div class="logo">   <font-awesome-icon :icon="[ 'fab', 'trello' ]" /><strong> Trelix</strong></div>
                <ul>
                    <li>Workspace <i class="el-icon-arrow-down"></i></li>
                    <li>Recent <i class="el-icon-arrow-down"></i></li>
                    <li>Starred <i class="el-icon-arrow-down"></i></li>
                    <li>Templates <i class="el-icon-arrow-down"></i></li>
                    <li>Create</li>
                </ul>
            </div>
            <div class="search">
                <el-input placeholder="Search... "></el-input>
                <i class="el-icon-info"></i>
                <i class="el-icon-bell"></i>
                <avatar  @click.native="showProfile" :size="35"  username="member.username" class="member" ></avatar>
            </div>
        </nav>
        <div class="modal" v-if="isShowProfile">
                  <div class="title">
                    <i class="el-icon-close" @click="isShowProfile = !isShowProfile"></i>
                    <i>Account</i>
                </div>
                <hr />
                <div class="avatar-user"> 

                <avatar  :size="35 "  username="member.username" class="member" ></avatar>
                <div class="user-details">
               <div>{{createdBy.fullname}}</div>
               
               <div>{{createdBy.mail}}</div>
                </div>
                </div>
               <div>Activity</div>
               <hr>
               <div>Log out</div>
                
        </div>
    </section>
</template>

<script>
import avatar from 'vue-avatar';

export default {
    name: 'appHeader',
    props:['createdBy'],
    data(){
        return{
            isShowProfile:false,

        }
    },
    computed: {},
    methods: {
        showProfile(){
            console.log('clickk');
            this.isShowProfile = ! this.isShowProfile
        }
    },
    mounted(){
    },
    components: {
        avatar,
    },
};
</script>

<style></style>
