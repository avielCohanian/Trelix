<template>
    <section class="card-edit">
        <div class="sidebar">
            <!-- <p v-if="card.members.length"> -->
            Add to card
            <a @click="dynamicCmp('join')">
                <!-- <span class="el-icon-user"></span> למצוא את האייקון המתאים-->
                Join</a
            >
            <!-- </p> -->

            <p>Add to card</p>
            <a @click="dynamicCmp('members')">
                <span class="el-icon-user"></span>
                Members</a
            >

            <a @click="dynamicCmp('labels')">
                <!-- <span class="el-icon-user"></span> למצוא את האייקון המתאים -->
                Labels</a
            >

            <a @click="dynamicCmp('checklist')">
                <!-- <span class="el-icon-user"></span> למצוא את האייקון המתאים -->
                Checklist</a
            >

            <a @click="dynamicCmp('dates')">
                <span class="far fa-clock"></span>
                <!-- למצוא את האייקון המתאים -->
                Dates</a
            >

            <a @click="dynamicCmp('attachment')">
                <!-- <span class="el-icon-user"></span> למצוא את האייקון המתאים -->
                Attachment</a
            >

            <a @click="dynamicCmp('cover')">
                <!-- <span class="el-icon-user"></span> למצוא את האייקון המתאים -->
                Cover</a
            >

            <a @click="dynamicCmp('customFields')">
                <!-- <span class="el-icon-user"></span> למצוא את האייקון המתאים -->
                Custom Fields</a
            >
            <component
                v-if="component"
                :is="component"
                @dynamicCmp="dynamicCmp"
            >
            </component>
        </div>
    </section>
</template>

<script>
import attachment from './edit-attachment.vue';
import trelix from './edit-trelix.vue';
export default {
    name: 'cardEdit',
    data() {
        return {
            component: '',
            card: { member: [] },
        };
    },
    methods: {
        dynamicCmp(cmp) {
            // console.log(cmp);
            this.component = `card-${cmp}`;
        },
    },
    components: {
        'card-attachment': attachment,
        'card-trelix': trelix,
    },
    computed: {},
};
</script>

<style></style>
