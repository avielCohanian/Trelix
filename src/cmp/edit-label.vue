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
                @click="updateLabels(label)"
            >
                <span class="label" :style="{ backgroundColor: label.color }">
                    <span class="label-title" v-if="label.title">{{
                        label.title
                    }}</span>
                    <!-- v-if="isSelectedLabel(labelColor)" -->
                    <span class="check-title el-icon-check"></span>
                </span>
            </li>
        </ul>
        <a></a>
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
            let labelToShow = this.$store.getters.boardLabels;
            let currLabels = this.card.labelIds;
            labelToShow.forEach((lable) => {
                let switchLable = currLabels.find(
                    (currLabel) => currLabel.id === lable.id
                );
                if (switchLable) lable = switchLable;
            });
            if (this.filterLabels) {
                const regex = new RegExp(this.filterLabels, 'i');
                labelToShow = labelToShow.filter((label) =>
                    regex.test(label.title)
                );
            }
            return labelToShow;
        },
    },
};
</script>

<style></style>
