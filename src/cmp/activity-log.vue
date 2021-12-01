<template>
    <section class="activity-log">
        <header>
            <span class="activity-header">
                <font-awesome-icon icon="tasks" class="icon" />
                <h3>Activity</h3>
            </span>
            <span class="activity-header-btn">
                <el-button @click="showActivity">Show details</el-button>
            </span>
        </header>
    </section>
</template>

<script>
export default {
    methods: {
        showActivity() {
            // TODO: show all activity to the card
        },
    },
};
</script>

<style></style>
