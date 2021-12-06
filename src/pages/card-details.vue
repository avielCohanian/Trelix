<template>
    <section class="screen" v-if="card" @click="closeDetails">
        <article class="card-details" @click.stop>
            <div
                class="color-header"
                v-if="card.style && (card.style.bgColor || card.style.bgUrl)"
                :style="bgColor"
            >
                <span class="cover-back-btn">
                    <a
                        class="back-btn close-btn el-icon-close"
                        @click="closeDetails"
                    >
                    </a>
                </span>
                <a class="cover-btn" @click="dynamicCmp('cover')">
                    <span class="cover-icon">
                        <span class="material-icons-outlined icon">
                            web_asset
                        </span>
                    </span>
                    Cover</a
                >
            </div>
            <header class="header">
                <a
                    v-if="!card.style.bgColor"
                    class="back-btn close-btn el-icon-close"
                    @click="closeDetails"
                >
                </a>
                <div class="secund-header" v-if="card.title">
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
                <p class="title" v-if="currGroup">
                    in list <a>{{ currGroup.title }}</a>
                </p>
            </header>

            <div class="details">
                <div class="main-details">
                    <div class="header-optional" v-if="headerShow">
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
                                <a
                                    class="plus-btn"
                                    @click="dynamicCmp('members')"
                                >
                                    <span class="el-icon-plus plus"></span>
                                </a>
                                <!--TODO  למצוא אייקון מתאים -->
                            </ul>
                        </div>

                        <div class="labels" v-if="card.labelIds">
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
                                <a
                                    class="plus-btn"
                                    @click="dynamicCmp('labels')"
                                >
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
                                    {{ card.dueDate | moment('MMM ') }}
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
                            <p
                                v-show="!editDescription"
                                @click="openEditDescription"
                            >
                                {{ card.description }}
                            </p>
                            <div
                                v-show="editDescription"
                                class="description-edit"
                            >
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
                        v-if="
                            card.attachment.trelixAttachments &&
                            card.attachment.trelixAttachments.length
                        "
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
                        v-if="
                            card.attachment.computerAttachment &&
                            card.attachment.computerAttachment.length
                        "
                    >
                        <span class="el-icon-paperclip icon"></span>
                        <h3>Attachments</h3>
                        <div class="attachment-list">
                            <!-- <div > -->
                            <a
                                v-for="(att, idx) in cardAttachments"
                                :key="idx"
                                class="attachment-link"
                            >
                                <!-- :href="att.link" -->
                                <div class="img">
                                    <img :src="att.url" alt="" />
                                    <!-- <img v-else src="" alt="" /> -->
                                </div>
                                <!--TODO  תמונת לינק קבועה-->
                                <div class="attachment-option-container">
                                    <p class="attachment-option">
                                        <span class="link">
                                            {{ att.name }}
                                            <span
                                                class="el-icon-top-right"
                                            ></span>
                                        </span>
                                        <span class="title-option">
                                            <span>
                                                <span
                                                    >Added
                                                    {{
                                                        att.upAt
                                                            | moment('from')
                                                    }}
                                                    <span
                                                        v-if="dayLeft(att.upAt)"
                                                    >
                                                        at
                                                        {{
                                                            getTime(att.upAt)
                                                        }}</span
                                                    >
                                                </span>
                                                -
                                            </span>

                                            <a
                                                class="title-option-btn"
                                                @click.stop="
                                                    addLinkToActivity(att.link)
                                                "
                                                >Comment</a
                                            >
                                            -
                                            <a
                                                class="title-option-btn"
                                                @click.stop="
                                                    dynamicCmp(
                                                        'removeEditAttachment'
                                                    )
                                                "
                                                >Remove</a
                                            >
                                            -
                                            <a
                                                class="title-option-btn"
                                                @click.stop="
                                                    dynamicCmp('editAttachment')
                                                "
                                                >Edit</a
                                            >
                                        </span>
                                        <span class="cover">
                                            <span
                                                class="material-icons-outlined"
                                            >
                                                web_asset
                                            </span>
                                            <a>Make cover</a>
                                        </span>
                                    </p>

                                    <div v-if="!att.url" class="cover3">
                                        <!-- <span class="material-icons-outlined">
                                            web_asset
                                        </span> -->
                                        <!-- v-show="att.img"
                                            v-if="isCover"
                                            @makeCover.stop="makeCover(att.img)" -->
                                        <a>Make cover</a>
                                        <!-- v-else
                                            v-show="att.img"
                                            @makeCover.stop="makeCover(att.img)" -->
                                        <!-- <a>Remove cover</a> -->
                                    </div>
                                </div>
                            </a>

                            <!-- </div> -->
                        </div>

                        <a
                            class="add-item"
                            @click="dynamicCmp('editAttachment')"
                            >Add an item
                        </a>
                    </div>

                    <div class="checklists-container" v-if="card.checklists">
                        <check-list
                            v-for="checklist in card.checklists"
                            :key="checklist.id"
                            :checklist="checklist"
                        ></check-list>
                    </div>
                    <div class="activity-container" v-if="card.activity">
                        <activity-log></activity-log>
                    </div>
                </div>
                <card-edit
                    class="card-edit"
                    :card="card"
                    :cmp="dynamicCmpToShow"
                    @updateCard="updateCard"
                ></card-edit>
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
            currGroup: null,
            checked: false,
            description: '',
            editDescription: false,
            isOpenTitle: false,
            labels: [],
            cmp: null,
        };
    },
    methods: {
        async loadCard() {
            try {
                // let board = await this.$store.dispatch({
                //     type: 'loadBoard',
                //     boardId: 'b101',
                // });
                const cardId = this.$route.params.cardId;
                const currCard = await this.$store.dispatch({
                    type: 'cardById',
                    cardId,
                });
                const card = JSON.parse(JSON.stringify(currCard));
                this.card = card;
                if (this.card.labelIds) {
                    this.labels = await this.getLabel();
                }
                let { boardId } = this.$route.params;
                this.currGroup = await boardService.getGroupByCardId(
                    boardId,
                    cardId
                );
                this.description = this.card.description;
            } catch (err) {
                console.log(err);
            }
        },
        closeDetails() {
            console.log('TODO');
            const { boardId } = this.$route.params;
            // this.$router.push(`/board/${boardId}`);
            // TODO: board id
            this.$router.push(`/board/${boardId}`);
            // TODO: back board page
            // this.$router.push('')
        },
        async getLabel() {
            let { boardId } = this.$route.params;
            try {
                let labels = await boardService.getLabelByCard(
                    boardId,
                    this.card
                );
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
            this.isOpenTitle = !this.isOpenTitle;
        },
        async updateCard(card) {
            try {
                if (!card) card = JSON.parse(JSON.stringify(this.card));
                await this.$store.dispatch({
                    type: 'updateCard',
                    card,
                });
                await this.loadCard();
                // this.$emit('updateCard')
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
        dynamicCmp(cmp) {
            this.cmp = cmp;
            setTimeout(() => {
                this.cmp = null;
            }, 500);
        },
    },
    computed: {
        dynamicCmpToShow() {
            return this.cmp;
        },
        headerShow() {
            return (
                (this.card.members && this.card.members.length) ||
                (this.card.labelIds && this.card.labelIds.length) ||
                this.card.dueDate
            );
        },
        cardAttachments() {
            let computerAttachment = this.card.attachment.computerAttachment;
            // TODO: return only 3 attachment
            return computerAttachment;
        },
        isCover() {
            // TODO: if we have bcg to the card
            // return this.card.bcg;
        },
        dueDateDay() {
            let t = this.card.dueDate;
            return new Date(t).getUTCDay() + 1;
        },
        bgColor() {
            if (this.card.style.bgColor) {
                return { backgroundColor: `${this.card.style.bgColor}` };
            } else if (this.card.style.bgUrl) {
                return {
                    backgroundImage: `${this.card.style.bgUrl.backgroundImage}`,
                };
            }
        },
    },
    watch: {
        editDescription() {
            if (this.editDescription) {
                this.$refs.editInput.focus();
            }
        },
    },
    mounted() {
        // this.selectInInput();
    },

    components: {
        cardEdit,
        checkList,
        activityLog,
        avatar,
    },
    async created() {
        await this.loadCard();
    },
};
</script>

<style></style>
