<template>
    <section class="screen" v-if="card" @click="closeDetails">
        <article class="card-details" @click.stop>
            <header class="header">
                <a
                    class="back-btn close-btn el-icon-close"
                    @click="closeDetails"
                >
                </a>
                <div class="secund-header">
                    <font-awesome-icon class="svg" :icon="['fab', 'trello']" />
                    <!-- <span></span> למצוא אייקון מתאים -->
                    <div class="secund-header-input" @click="toggleTitle">
                        <input
                            type="text"
                            :class="{ focus: isOpenTitle }"
                            v-model="card.title"
                            @keyup.enter="saveTitle"
                            @blur="saveTitle"
                        />
                    </div>
                    <!--TODO @click in a dynamicCmp -->
                </div>
                <p class="title">
                    in list <a>{{ currGroup.title }}</a>
                </p>
            </header>

            <div class="details">
                <div class="main-details" v-if="headerShow">
                    <div class="header-optional">
                        <div
                            class="members"
                            v-if="card.members && card.members.length"
                        >
                            <h3>Members</h3>
                            <ul class="member-container">
                                <li
                                    v-for="member in card.members"
                                    :key="member._id"
                                >
                                    <avatar
                                        v-if="member.imgUrl"
                                        :src="member.imgUrl"
                                        :size="35"
                                        class="member"
                                    ></avatar>
                                    <avatar
                                        v-else
                                        :username="member.fullname"
                                        :size="35"
                                        class="member"
                                    ></avatar>
                                </li>
                                <a class="plus-btn">
                                    <span class="el-icon-plus plus"></span>
                                </a>
                                <!-- <a @click="">+</a> -->
                                <!--TODO  למצוא אייקון מתאים -->
                            </ul>
                        </div>

                        <div class="labels">
                            <h3>Labels</h3>
                            <ul class="labels-container">
                                <li v-for="label in labels" :key="label.id">
                                    <span
                                        class="label"
                                        :style="{
                                            backgroundColor: label.color,
                                        }"
                                    >
                                        {{ label.title }}</span
                                    >
                                </li>
                                <!-- <a @click="">+</a> -->
                                <a class="plus-btn">
                                    <span class="el-icon-plus plus"></span>
                                </a>
                            </ul>
                        </div>

                        <div class="dueDate" v-if="card.dueDate">
                            <h3>Due date</h3>
                            <div class="dueDate-container">
                                <el-checkbox
                                    class="checkBox"
                                    @click="dateDone"
                                    v-model="checked"
                                ></el-checkbox>
                                <!-- TODO איך יודעים אם בוצע או לא -->
                                <a
                                    @click="openDate"
                                    class="date-dedline-container"
                                >
                                    {{ card.dueDate | moment('MMMM ') }}
                                    {{ dueDateDay }}
                                    at
                                    {{ card.dueDate | moment(' h:mm: A') }}
                                    <span class="el-icon-arrow-down"></span>
                                </a>
                                <!--TODO  למצוא אייקון מתאים -->
                            </div>
                        </div>
                    </div>

                    <div class="description">
                        <i class="el-icon-s-unfold icon"></i>
                        <header>
                            <h3>Description</h3>
                            <a
                                class="edit-btn"
                                v-show="!editDescription"
                                @click="openEditDescription"
                                >Edit</a
                            >
                        </header>
                        <div class="description-container">
                            <!-- ref="editInput" -->
                            <p
                                v-if="!editDescription"
                                @click="openEditDescription"
                            >
                                {{ card.description }}
                            </p>
                            <div v-else class="description-edit">
                                <el-input
                                    type="textarea"
                                    :rows="5"
                                    placeholder="Add a more detailed description..."
                                    ref="editInput"
                                    v-model="description"
                                >
                                </el-input>

                                <div class="description-edit-btn">
                                    <a
                                        class="close-btn el-icon-close"
                                        @click="closeDescription"
                                    ></a>

                                    <a class="save" @click="saveDescription"
                                        >Save</a
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- TODO ALL logic -->
                    <div
                        class="trelix-attachments"
                        v-if="card.attachment.trelixAttachments"
                    >
                        <font-awesome-icon
                            class="svg"
                            :icon="['fab', 'trello']"
                        />
                        <h3>Trello attachments</h3>
                        <div class="attachments-list">
                            <article
                                v-for="(attachment, idx) in card.attachments"
                                :key="idx"
                                class="attachment-link"
                                @click="attachmentLink(idx)"
                            >
                                <a> <img src="" alt="" /></a>
                                <a @click="removeMsg">remove</a>
                                <!-- <a @click="connectCard">Connect cards…</a> -->
                            </article>
                        </div>
                        <a @click="openAttachment">Add Trelix attachment</a>
                    </div>

                    <!-- TODO ALL logic -->
                    <div
                        class="section-attachments"
                        v-if="card.attachment.computerAttachment"
                    >
                        <!--TODO  למצוא אייקון מתאים -->
                        <span></span>
                        <h3>Attachments</h3>
                        <div class="attachment-list">
                            <!-- <div > -->
                            <a
                                v-for="att in cardAttachments"
                                :key="att.link"
                                class="attachment-link"
                                :href="att.link"
                            >
                                <img v-if="att.img" src="att.img" alt="" />
                                <img v-else src="" alt="" />
                                <!--TODO  תמונת לינק קבועה-->
                                <p class="attachment-option">
                                    <span
                                        >{{ att.name || att.link || att.img }}
                                    </span>
                                    <!--TODO  למצוא אייקון מתאים   external-link-alt-->
                                    <span>
                                        <span
                                            >Added
                                            {{ att.upAt | moment('from') }}
                                            <span v-if="dayLeft(att.upAt)">
                                                at {{ getTime(att.upAt) }}</span
                                            >
                                        </span>
                                        -
                                    </span>
                                    <a @click.stop="addLinkToActivity(att.link)"
                                        >Comment</a
                                    >
                                    -
                                    <a @click.stop="removeMsg">Remove</a>
                                    -
                                    <a @click.stop="editName(att.name)">Edit</a>
                                </p>
                                <a
                                    v-show="att.img"
                                    v-if="isCover"
                                    @makeCover.stop="makeCover(att.img)"
                                    >Make cover</a
                                >
                                <a
                                    v-else
                                    v-show="att.img"
                                    @makeCover.stop="makeCover(att.img)"
                                    >Remove cover</a
                                >
                            </a>

                            <!-- </div> -->
                        </div>

                        <a @click="openAttachment">Add an item </a>
                    </div>

                    <div class="checklists-container">
                        <check-list
                            v-for="checklist in card.checklists"
                            :key="checklist.id"
                            :checklist="checklist"
                        ></check-list>
                    </div>
                    <div class="activity-container">
                        <activity-log></activity-log>
                    </div>
                </div>
                <card-edit class="card-edit" :card="card"></card-edit>
            </div>
        </article>
    </section>
</template>

<script>
import cardEdit from '../cmp/card-edit.vue';
import checkList from '../cmp/checklist-details.vue';
import activityLog from '../cmp/activity-log.vue';

import avatar from 'vue-avatar';
import moment from 'moment';

import { boardService } from '../service/board.service.js';

export default {
    name: 'cardDetails',
    data() {
        return {
            card: null,
            currGroup: 'aaa',
            checked: false,
            description: '',
            editDescription: false,
            isOpenTitle: false,
            labels: [],
        };
    },
    methods: {
        async loadCard() {
            try {
                let board = await this.$store.dispatch({
                    type: 'loadBoard',
                    boardId: 'b101',
                });
                const cardId = this.$route.params.cardId;
                // const card = await boardService.getById(cardId);
                this.$store.commit({
                    type: 'cardById',
                    cardId,
                });
                const card = JSON.parse(
                    JSON.stringify(this.$store.getters.currCard)
                );
                this.card = card;
                // this.newReview.aboutToyId = toy._id;
            } catch (err) {
                console.log(err);
            }
        },
        closeDetails() {
            console.log('TODO');
            const { boardId } = this.$route.params;
            // this.$router.push(`/board/${boardId}`);
            // TODO: board id
            this.$router.push(`/board/b101`);
            // TODO: back board page
            // this.$router.push('')
        },
        async getLabel() {
            // console.log('TODO');
            // TODO: connect service and return label by ID
            //    let currLabel = await storageService.getLabelById();
            // console.log(labelId);
            let { boardId } = this.$route.params;
            boardId = 'b101';
            try {
                let labels = await boardService.getLabelByCard(
                    boardId,
                    this.card
                );
                console.log(labels);
                return labels;
            } catch (err) {
                console.log(err);
            }
        },
        dateDone() {
            this.checked = !this.checked;
        },
        openDate() {
            console.log('TODO');
            // TODO: open cmpDynamic in datesMode
        },
        openEditDescription() {
            this.editDescription = !this.editDescription;
        },
        closeDescription() {
            this.editDescription = false;
        },
        saveDescription() {
            this.card.description = this.description;
            this.editDescription = false;
        },
        attachmentLink(attachmentIdx) {
            console.log('TODO');
            // TODO: move in groups/board to another place
        },
        removeMsg(a) {
            console.log('TODO');
            // TODO: show if he shore delete
        },
        getTime(t) {
            return `${new Date(t).getHours()} :${new Date(t).getMinutes()} `;
        },
        dayLeft(t) {
            return Date.now() - t > 100 * 60 * 60 * 24;
        },
        openAttachment() {
            console.log('TODO');
            // TODO: open cmpDynamic in openAttachment in trelix mode
        },
        openAttachment() {
            console.log('TODO');
            // TODO: open cmpDynamic in openAttachment
        },
        addLinkToActivity(link) {
            // TODO: start msg to the activity with link dynamicCmp
            console.log(link);
        },
        editName(attName) {
            // TODO: show input with attName and edit it with dynamicCmp
        },

        makeCover(imgUrl) {
            // TODO: img in bcg
        },
        toggleTitle() {
            console.log('lll');
            this.isOpenTitle = !this.isOpenTitle;
        },
        async updateCard() {
            try {
                await this.$store.dispatch({
                    type: 'updateCard',
                    card: JSON.parse(JSON.stringify(this.card)),
                });
            } catch (err) {
                console.log(err);
            }
        },
        async saveTitle() {
            let card = JSON.parse(JSON.stringify(this.card));
            card.title = this.card.title;
            try {
                await this.updateCard();
                this.isOpenTitle = false;
            } catch (err) {
                console.log(err);
            }
        },
        selectInInput() {
            console.log(this.$refs);
        },
    },
    computed: {
        headerShow() {
            return (
                this.card.members.length ||
                this.card.labelIds.length ||
                this.card.dueDate
            );
        },
        cardAttachments() {
            // TODO: return only 3 attachment
            return this.card.attachments;
        },
        isCover() {
            // TODO: if we have bcg to the card
            // return this.card.bcg;
        },
        dueDateDay() {
            let t = this.card.dueDate;
            return new Date(t).getUTCDay() + 1;
        },
    },
    mounted() {
        // this.selectInInput();
        // this.$refs.editInput.focus();
    },

    components: {
        cardEdit,
        checkList,
        activityLog,
        avatar,
    },
    async created() {
        await this.loadCard();
        this.currGroup = {
            style: {},
            id: 'g101',
            title: 'Group 1',
        };
        this.description = this.card.description;
        this.labels = await this.getLabel();
    },
};
</script>

<style></style>
