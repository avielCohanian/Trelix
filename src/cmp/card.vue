<template>
    <!-- <section class="screen" @click="openEditor" v-if="openEditor"> -->
    <section class="card" @click="openDetails(card.id)">
        <!-- <router-link :to="{name:'cardDetails'}">
    go to beteet world
    </router-link> -->
        <header>
            <p>{{ card.title }}</p>

            <p class="material-icons-outlined" @click="openEditor">create</p>
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
            <div v-if="isOpenEditor" class="editor">
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
    components: {
        avatar,
    },
};
</script>

<style></style>
