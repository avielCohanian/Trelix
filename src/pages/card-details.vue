<template>
    <article class="card-details" v-if="card">
        <a @click="back">X</a>
        <!-- למצוא אייקון מתאים -->

        <!-- {{ card }} -->
        <div>
            <header class="header">
                <!-- <span></span> למצוא אייקון מתאים -->
                <el-input v-model="card.title"></el-input>
                <p>
                    in list <a>{{ currGroup.title }}</a>
                </p>
                <!--TODO @click in a -->
            </header>

            <div class="main-details" v-if="headerShoe">
                <div class="members" v-if="card.byMember.length">
                    <ul>
                        <h3>Members</h3>
                        <li
                            v-for="member in card.byMember.length"
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
                        <li v-for="label in card.labelIds.length" :key="label">
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

                <div class="description">
                    <!--TODO  למצוא אייקון מתאים -->
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
                            <el-button type="primary" @click="saveDescription"
                                >Save</el-button
                            >
                            <a></a>
                        </div>
                    </div>
                </div>

                <div class="attachments" v-if="card.attachments">
                    <!--TODO  לקחת מאלי אייקון של טריילו -->
                    <h3>Trello attachments</h3>
                    <div class="attachments-list">
                        <article
                            v-for="(attachment, idx) in card.attachments"
                            :key="attachment"
                            class="attachment-link"
                            @click="attachmentLink(idx)"
                        >
                            <a> <img src="" alt="" /></a>
                            <a @click="removeMsg">remove</a>
                            <!-- <a @click="connectCard">Connect cards…</a> -->
                        </article>
                    </div>
                    <a @click="openAttachment"></a>
                </div>
            </div>
            <card-edit :card="card"></card-edit>
        </div>
    </article>
</template>

<script>
import cardEdit from '../cmp/card-edit.vue';
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
        back() {
            console.log('TODO');
            // TODO: back board page
            // this.$router.push('')
        },
        getLabel(labelId) {
            console.log('TODO');
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
        openAttachment() {
            console.log('TODO');
            // TODO: open cmpDynamic in openAttachment
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
    },
    computed: {
        headerShoe() {
            return (
                this.card.members.length ||
                this.card.members.labelIds.length ||
                this.card.members.dueDate
            );
        },
    },
    components: {
        cardEdit,
    },
    created() {
        this.card = {
            id: 'c104',
            title: 'Help me',
            description: 'description',
            comments: [
                {
                    id: 'ZdPnm',
                    txt: 'also @yaronb please CR this',
                    createdAt: 1590999817436.0,
                    byMember: {
                        _id: 'u101',
                        fullname: 'Tal Tarablus',
                        imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                    },
                },
            ],
            checklists: [
                {
                    id: 'YEhmF',
                    title: 'Checklist',
                    todos: [
                        {
                            id: '212jX',
                            title: 'To Do 1',
                            isDone: false,
                        },
                    ],
                },
            ],
            members: [
                {
                    _id: 'u101',
                    username: 'Tal',
                    fullname: 'Tal Tarablus',
                    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
            ],
            labelIds: ['l101', 'l102'],
            createdAt: 1590999730348,
            dueDate: 16156215211,
            byMember: {
                _id: 'u101',
                username: 'Tal',
                fullname: 'Tal Tarablus',
                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            style: {
                bgColor: '#26de81',
            },
        };
        this.description = this.card.description;
    },
};
</script>

<style></style>
