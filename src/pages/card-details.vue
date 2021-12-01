<template>
    <section class="screen" v-if="card" @click="closeDetails">
        <article class="card-details">
            <header class="heder">
                <a @click="closeDetails" class="back-btn">
                    <font-awesome-icon icon="times" />
                </a>
            </header>
            <!-- למצוא אייקון מתאים -->

            <!-- {{ card }} -->

            <div class="details">
                <div class="main-details" v-if="headerShow">
                    <header class="secund-header">
                        <!-- <span></span> למצוא אייקון מתאים -->
                        <el-input v-model="card.title"></el-input>
                        <p class="title">
                            in list <a>{{ currGroup.title }}</a>
                        </p>
                        <!--TODO @click in a -->
                    </header>
                    <div
                        class="members"
                        v-if="card.members || card.members.length"
                    >
                        <ul>
                            <h3>Members</h3>
                            <li
                                v-for="member in card.members.length"
                                :key="member._id"
                            >
                                {{ member.imgUrl }}
                                <a>+</a>
                                <!--TODO  למצוא אייקון מתאים -->
                            </li>
                        </ul>
                    </div>

                    <div class="labels">
                        <ul>
                            <h3>Labels</h3>
                            <li
                                v-for="label in card.labelIds.length"
                                :key="label"
                            >
                                {{ getLabel(label) }}
                            </li>
                            <a>+</a>
                            <!--TODO  למצוא אייקון מתאים -->
                        </ul>
                    </div>

                    <div class="due-date">
                        <h3>Due date</h3>
                        <el-checkbox
                            @click="dateDone"
                            v-model="checked"
                        ></el-checkbox>
                        <!-- TODO איך יודעים אם בוצע או לא -->
                        <a @click="openDate">
                            <div class="date-dedline"></div>
                            ></a
                        >
                        <!--TODO  למצוא אייקון מתאים -->
                    </div>

                    <div class="description-container">
                        <i class="el-icon-s-unfold icon"></i>
                        <h3>description</h3>
                        <a v-if="editDescription" @click="openEditDescription"
                            >Edit</a
                        >
                        <p v-if="editDescription" @click="openEditDescription">
                            card.description
                        </p>
                        <div class="description-edit">
                            <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="Add a more detailed description..."
                                v-model="description"
                            >
                            </el-input>
                            <div class="description-edit-btn">
                                <el-button
                                    type="primary"
                                    @click="saveDescription"
                                    >Save</el-button
                                >
                                <a></a>
                            </div>
                        </div>
                    </div>

                    <div class="trelix-attachments" v-if="card.attachments">
                        <!--TODO  לקחת מאלי אייקון של טריילו -->
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

                    <div class="section-attachments">
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

export default {
    name: 'cardDetails',
    data() {
        return {
            card: null,
            currGroup: 'aaa',
            checked: false,
            description: '',
            editDescription: false,
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
                const card = this.$store.getters.currCard;
                this.card = card;
                // this.newReview.aboutToyId = toy._id;
            } catch (err) {
                console.log(err);
            }
        },
        closeDetails() {
            console.log('TODO');
            // TODO: back board page
            // this.$router.push('')
        },
        getLabel(labelId) {
            // console.log('TODO');
            // TODO: connect service and return label by ID
            //    return S.getLabelById(labelId)
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
        saveDescription() {
            this.card.description = this.description;
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
    },
    components: {
        cardEdit,
        checkList,
        activityLog,
    },
    async created() {
        await this.loadCard();
        this.currGroup = {
            style: {},
            id: 'g101',
            title: 'Group 1',
        };
        // this.card = {
        //     id: 'c104',
        //     title: 'Help me',
        //     description: 'description',
        //     comments: [
        //         {
        //             id: 'ZdPnm',
        //             txt: 'also @yaronb please CR this',
        //             createdAt: 1590999817436.0,
        //             byMember: {
        //                 _id: 'u101',
        //                 fullname: 'Tal Tarablus',
        //                 imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
        //             },
        //         },
        //     ],
        //     checklists: [
        //         {
        //             id: 'YEhmF',
        //             title: 'Checklist',
        //             todos: [
        //                 {
        //                     id: '212jX',
        //                     txt: 'To Do 1',
        //                     isDone: false,
        //                 },
        //             ],
        //         },
        //     ],
        //     members: [
        //         {
        //             _id: 'u101',
        //             username: 'Tal',
        //             fullname: 'Tal Tarablus',
        //             imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
        //         },
        //     ],
        //     labelIds: ['l101', 'l102'],
        //     createdAt: 1590999730348,
        //     dueDate: 16156215211,
        //     byMember: {
        //         _id: 'u101',
        //         username: 'Tal',
        //         fullname: 'Tal Tarablus',
        //         imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
        //     },
        //     trelixAttachmentId: ['c202'],
        //     attachments: [
        //         {
        //             link: 'www.google.com',
        //             img: 'src',
        //             upAt: 1638339747876,
        //             name: 'google',
        //         },
        //     ],
        //     style: {
        //         bgColor: '#26de81',
        //     },
        // };
        this.description = this.card.description;
    },
};
</script>

<style></style>
