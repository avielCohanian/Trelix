<template>
    <!-- <section class="screen" @click="openEditor" v-if="openEditor"> -->
    <section class="card" @click="openDetails(card.id)">
        <!-- <router-link :to="{name:'cardDetails'}">
    go to beteet world
    </router-link> -->
        <header @mouseover="isHover = true" @mouseleave="isHover = false">
            <p>{{ card.title }}</p>

            <p class="material-icons-outlined hover" @click="openEditor" :style="isShow">create</p>
            <!-- <i class="el-icon-edit" @click="openEditor"></i> -->
        </header>
        <div>
            <div class="icons">
                <avatar
                    username="member.username"
                    class="avatar"
                    :size="30"
                ></avatar>
            </div>
        </div>
        <main>
            <div v-if="isOpenEditor" class="editor" >
                <div class="edit-txt">

                <el-input
                    type="textarea"
                    :rows="5"
                    v-model="card.title"
                >
                </el-input>
                <el-button type="primary">Save</el-button>
                </div >
                <div class="chose-edit">
                <ul>
                    <li>Open card</li>
                    <li>Edit labels</li>
                    <li>Change members</li>
                    <li>Change cover</li>
                    <li>Move</li>
                    <li>Copy</li>
                    <li>Edit dates</li>
                    <li>Archive</li>
                </ul>

                </div>
            </div>
        </main>
    </section>
    <!-- </section> -->
</template>

<script>
import avatar from 'vue-avatar';

export default {
    name: 'card',
    props: ['card'],
    data() {
        return {
            isHover: false,
            isOpenEditor: false,
        };
    },
    methods: {
       
        openEditor() {
            this.isOpenEditor = !this.isOpenEditor;
        },
        openDetails(cardId) {
            //TODO: card id
            const BoardId = this.$route.params.BoardId;
            this.$router.push(`/board/${BoardId}/c104`);
        },
    },
    computed:{
 isShow(){
     console.log('aa');
if(this.isHover) return {opacity: 1}
else return {opacity: 0}
        },
    },
    components: {
        avatar,
    },
};
</script>

<style></style>
