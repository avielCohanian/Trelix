<template>
    <section class="card-edit">
        <div class="sidebar">
            <div v-if="card.members.length">
                <h3>Add to card</h3>

                <a class="btn" @click="dynamicCmp('join')">
                    <!-- <span class="el-icon-user"></span> למצוא את האייקון המתאים-->
                    Join</a
                >
            </div>
            <h3>Add to card</h3>
            <div class="edit-btn">
                <a class="btn" @click="dynamicCmp('members')">
                    <span class="el-icon-user"></span>
                    Members</a
                >

                <a class="btn" @click="dynamicCmp('labels')">
                    <span class="el-icon-price-tag icon"></span> Labels</a
                >

                <a class="btn" @click="dynamicCmp('checklist')">
                    <span class="el-icon-document-checked icon"> </span>
                    Checklist</a
                >

                <a class="btn" @click="dynamicCmp('dates')">
                    <span class="el-icon-time"></span>
                    Dates</a
                >

                <a class="btn" @click="dynamicCmp('attachment')">
                    <!-- <span class="el-icon-user"></span> למצוא את האייקון המתאים -->
                    Attachment</a
                >

                <a class="btn" @click="dynamicCmp('cover')">
                    <!-- <span class="el-icon-user"></span> למצוא את האייקון המתאים -->
                    Cover</a
                >

                <a class="btn" @click="dynamicCmp('customFields')">
                    <!-- <span class="el-icon-user"></span> למצוא את האייקון המתאים -->
                    Custom Fields</a
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

export default {
    name: 'cardEdit',
    props: {
        card: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
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
    },
    components: {
        'card-attachment': attachment,
        'card-trelix': trelix,
        'card-members': member,
        'card-labels': label,
    },

    computed: {},
};
</script>

<style></style>
