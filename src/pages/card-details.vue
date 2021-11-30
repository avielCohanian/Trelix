<template>
    <article class="card-details">
        <a @click="back">X</a>
        <!-- למצוא אייקון מתאים -->
        <div>
            <header class="header">
                <!-- <span></span> למצוא אייקון מתאים -->
                <!-- <el-input v-model="card.title"></el-input> -->
                <p>
                    <!-- in list <a>{{ currGroup.title }}</a> -->
                </p>
                <!--TODO @click in a -->
            </header>

            <!-- <div class="main-details" v-if="headerShoe"> -->

            <!-- </div> -->
            <card-edit></card-edit>
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
            currGroup: null,
        };
    },
    methods: {
        back() {
            console.log('TODO');
            // TODO: back board page
            // this.$router.push('')
        },
    },
    computed: {
        headerShoe() {
            return (
                card.members.length ||
                card.members.labelIds.length ||
                card.members.dueDate
            );
        },
    },
    components: {
        cardEdit,
    },
};
</script>

<style></style>
