<template>
    <section class="edit-label">
        <input
            class="search"
            type="text"
            placeholder="Search labels..."
            v-model="filterLabels"
        />

        <h3 class="labels-title">Labels</h3>
        <ul>
            <li
                v-for="label in labelsToShow"
                :key="label.id"
                @click="updateLabels(label)"
            >
                <div class="label-box">
                    <span
                        class="label-hover"
                        :style="{
                            backgroundColor: label.color,
                        }"
                    ></span>
                    <span
                        class="label"
                        :style="{
                            backgroundColor: label.color,
                        }"
                    >
                        <span>
                            <span class="label-title" v-if="label.title"
                                >{{ label.title }}
                            </span>
                        </span>
                        <span
                            v-show="cardLabel(label.id)"
                            class="check-title el-icon-check check"
                        ></span>
                    </span>
                </div>

                <span class="material-icons-outlined icon"> edit </span>
            </li>
        </ul>
        <a class="add-label"> Create a new label</a>
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
            labelToShow.forEach((label) => {
                let switchLabel = currLabels.find(
                    (currLabel) => currLabel.id === label.id
                );
                if (switchLabel) {
                    label = switchLabel;
                }
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
    methods: {
        cardLabel(labelId) {
            let currLabels = this.card.labelIds;
            return currLabels.some((label) => label.lId === labelId);
        },
        updateLabels(label) {
            this.$emit('updateLabel', label);
        },
    },
};
</script>

<style></style>
