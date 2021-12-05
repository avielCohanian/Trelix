<template>
    <section class="card-edit">
        <div class="sidebar">
            <div class="join-member" v-if="!userJoin">
                <h3>Suggested</h3>
                <a class="join-btn btn" @click="join('userId')">
                    <!-- v-if="meInCardMember(userId)" -->
                    <span class="el-icon-user icon"></span> Join</a
                >
            </div>
            <h3>Add to card</h3>
            <div class="edit-btn">
                <a class="btn" @click="dynamicCmp('members')" title="Members">
                    <span class="el-icon-user icon"></span>
                    Members</a
                >

                <a class="btn" @click="dynamicCmp('labels')" title="Labels">
                    <span class="el-icon-price-tag label-icon icon"></span>
                    Labels</a
                >

                <a
                    class="btn"
                    @click="dynamicCmp('checklist')"
                    title="Checklist"
                >
                    <span class="material-icons-outlined icon">
                        check_box
                    </span>

                    <!-- <span class="el-icon-document-checked icon"> </span> -->
                    Checklist</a
                >

                <a class="btn" @click="dynamicCmp('dates')" title="Dates">
                    <span class="el-icon-time icon"></span>
                    Dates</a
                >

                <a
                    class="btn"
                    @click="dynamicCmp('attachment')"
                    title="Attachment"
                >
                    <span class="el-icon-paperclip icon"></span> Attachment</a
                >

                <a
                    class="btn"
                    @click="dynamicCmp('cover')"
                    title="Cover"
                    v-if="!card.style.bgColor"
                >
                    <span class="cover-icon">
                        <span class="material-icons-outlined icon">
                            web_asset
                        </span>
                    </span>
                    Cover</a
                >
            </div>
        </div>
        <div class="dynamic-cmp" v-if="component.currCmp">
            <header>
                <h2>{{ component.name }}</h2>
                <a @click="closeModel" class="el-icon-close"> </a>
            </header>
            <component
                :is="component.currCmp"
                :card="card"
                @updateMember="updateMember"
                @changeBcg="changeBcg"
                @updateLabel="updateLabel"
                @dynamicCmp="dynamicCmp"
            >
            </component>
        </div>
    </section>
</template>

<script>
import member from './edit-member.vue';
import label from './edit-label.vue';
import attachment from './edit-attachment.vue';
import trelix from './edit-trelix.vue';
import cover from './edit-cover.vue';

export default {
    name: 'cardEdit',
    props: {
        card: {
            type: Object,
            required: true,
        },
        cmp: {
            type: String,
            // required: true,
        },
    },
    data() {
        return {
            component: {
                currCmp: null,
                name: '',
            },
            propCmp: this.cmp,
            userJoin: false,
        };
    },
    created() {
        if (this.cmp) {
            this.dynamicCmp(this.cmp);
        }
    },
    methods: {
        dynamicCmp(cmp) {
            console.log(cmp);
            if (cmp === 'attachment') this.component.name = 'attach from...';
            else this.component.name = cmp;
            this.component.currCmp = `card-${cmp}`;
        },
        closeModel() {
            this.component.currCmp = null;
        },
        join(userId) {
            //TODO
            console.log('todo ', userId);
            this.userJoin = true;
        },
        changeBcg(color) {
            let card = JSON.parse(JSON.stringify(this.card));
            if (card.style.bgColor === color) card.style.bgColor = null;
            else card.style.bgColor = color;
            this.$emit('updateCard', card);
            // this.$store.dispatch({ type: 'updateCard', card });
        },
        updateLabel(label) {
            let card = JSON.parse(JSON.stringify(this.card));
            if (card.labelIds.some((labelId) => labelId.lId === label.id)) {
                const labelIdx = card.labelIds.findIndex(
                    (labelId) => labelId.id === label.id
                );
                card.labelIds.splice(labelIdx, 1);
            } else {
                let currLabel = { lId: label.id, isDone: false };
                card.labelIds.push(currLabel);
            }
            this.$emit('updateCard', card);
        },
        updateMember(currMember) {
            let card = JSON.parse(JSON.stringify(this.card));
            if (card.members.some((member) => member._id === currMember._id)) {
                const labelIdx = card.members.findIndex(
                    (member) => member._id === currMember._id
                );
                card.members.splice(labelIdx, 1);
            } else {
                card.members.push(currMember);
            }
            this.$emit('updateCard', card);
        },
    },
    components: {
        'card-attachment': attachment,
        'card-trelix': trelix,
        'card-members': member,
        'card-labels': label,
        'card-cover': cover,
    },

    computed: {
        meInCardMember(userId) {
            this.card.members.some(member._id === userId);
        },
    },
    watch: {
        cmp(cmpName) {
            if (cmpName) {
                this.dynamicCmp(cmpName);
            }
        },
    },
};
</script>

<style></style>
