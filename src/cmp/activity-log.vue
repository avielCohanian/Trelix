<template>
    <section class="activity-log">
        <font-awesome-icon icon="tasks" class="svg" />
        <header>
            <span class="activity-header">
                <h3>Activity</h3>
            </span>
            <span class="activity-header-btn">
                <a @click="showActivity">Show details</a>
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
