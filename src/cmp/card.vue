<template>
    <!-- <section class="screen" @click="openEditor" v-if="openEditor"> -->
    <section class="card" @click="openDetails(card.id)">
        <!-- <router-link :to="{name:'cardDetails'}">
    go to beteet world
    </router-link> -->
        <header @mouseover="isHover = true" @mouseleave="isHover = false" class="single">
            <p>{{ card.title }}</p>

            <p
                class="material-icons-outlined hover"
                @click.stop="openEditor"
                :style="isShow"
            >
                create
            </p>
            <!-- <i class="el-icon-edit" @click="openEditor"></i> -->
        </header>
        <div>
            <!-- <div class="icons"> -->
                <!-- <avatar
                    username="member.username"
                    class="avatar"
                    :size="30"
                ></avatar> -->
            <!-- </div> -->
        </div>
        <main>
            <div v-if="isOpenEditor" class="editor" @click.stop>
                <p class="material-icons-outlined btn-x" @click="openEditor">
                    close
                </p>
                <div class="edit-txt">
                    <el-input
                        type="textarea"
                        :rows="5"
                        v-model="cardToUpdate.title"
                        @keyup.enter.native="updateCard"
                    >
                    </el-input>
                    <el-button type="primary" @click="updateCard"
                        >Save</el-button
                    >
                </div>
                <div class="chose-edit">
                    <ul>
                        <li @click="openDetails(card.id)">
                            <span class="material-icons-outlined">
                                branding_watermark </span
                            >Open card
                        </li>
                        <li @click="dynamicCmp('labels')">
                            <span class="material-icons-outlined"> sell </span
                            >Edit labels
                        </li>
                        <li @click="dynamicCmp('members')">
                            <span class="material-icons-outlined">
                                person_outline </span
                            >Change members
                        </li>
                        <li @click="dynamicCmp('cover')">
                            <span class="material-icons-outlined">
                                branding_watermark </span
                            >Change cover
                        </li>
                        <li>
                            <span class="material-icons-outlined">
                                arrow_forward </span
                            >Move
                        </li>
                        <li>
                            <span class="material-icons-outlined">
                                file_copy </span
                            >Copy
                        </li>
                        <li @click="dynamicCmp('dates')">
                            <span class="material-icons-outlined">
                                watch_later
                            </span>
                            Edit dates
                        </li>
                        <li @click="deleteCard">
                            <span class="material-icons-outlined">
                                move_to_inbox </span
                            >Archive
                        </li>
                    </ul>
                </div>
                <div class="dynamic-cmp" v-if="component.currCmp">
                    <header>
                        <h2>{{ component.name }}</h2>
                        <a @click="closeModel" class="el-icon-close"> </a>
                    </header>
                    <component
                        :is="component.currCmp"
                        :card="card"
                        @dynamicCmp="dynamicCmp"
                    >
                    </component>
                </div>
            </div>
        </main>
    </section>
    <!-- </section> -->
</template>

<script>
import avatar from 'vue-avatar';
import member from './edit-member.vue';
import label from './edit-label.vue';
import attachment from './edit-attachment.vue';
import trelix from './edit-trelix.vue';

export default {
    name: 'card',
    props: ['card'],
    data() {
        return {
            isHover: false,
            isOpenEditor: false,
            cardToUpdate: JSON.parse(JSON.stringify(this.card)),
             component: {
                currCmp: null,
                name: '',
            },
        };
    },
    methods: {
        dynamicCmp(cmp) {
            console.log(cmp);
            this.component.name = cmp;
            this.component.currCmp = `card-${cmp}`;
        },
        closeModel() {
            this.component.currCmp = null;
        },
         async deleteCard() {
            try {
                var res = await this.$store.dispatch({
                    type: 'deleteCard',
                    card: this.card,
                });
                console.log(res);
                    if(res) return this.openEditor();
            } catch (err) {
                console.log(err);
            }
        },
        async updateCard() {
            console.log(this.cardToUpdate);
            try {
                var res = await this.$store.dispatch({
                    type: 'updateCard',
                    card: this.cardToUpdate,
                });
                if (res) this.openEditor();
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        },
        openEditor() {
            this.isOpenEditor = !this.isOpenEditor;
        },
        openDetails(cardId) {
            //TODO: card id
            const BoardId = this.$route.params.BoardId;
            this.$router.push(`/board/${BoardId}/c104`);
        },
    },
    computed: {
        isShow() {
            console.log('aa');
            if (this.isHover) return { opacity: 1 };
            else return { opacity: 0 };
        },
    },
    components: {
        avatar,
        'card-attachment': attachment,
        'card-trelix': trelix,
        'card-members': member,
        'card-labels': label,
    },
};
</script>

<style></style>
