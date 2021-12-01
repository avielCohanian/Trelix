<template>
    <section class="edit-label">
        <el-input
            placeholder="Search labels..."
            v-model="filterLabels"
        ></el-input>
        <h3 class="labels-title">Labels</h3>
        <ul>
            <li
                v-for="label in labelsToShow"
                :key="label.id"
                @click="updateMember(label)"
            ></li>
        </ul>
    </section>
</template>

<script>
export default {
    name: 'edit-label',
    props: {
        card: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            filterLabels: '',
        };
    },
    computed: {
        labelsToShow() {
            let labelToShow = this.card.labelIds;
            console.log(this.card.labelIds);

            if (this.filterLabel) {
                console.log(labelToShow);
                const regex = new RegExp(this.filterLabel, 'i');
                labelToShow = this.card.labels.filter((label) =>
                    regex.test(label.title)
                );
            }
            return labelToShow;
        },
    },
};
</script>

<style></style>
