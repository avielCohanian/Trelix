<template>
    <section class="groups">
        <draggable
            class="list-group flex"
            v-model="groups"
            @change="onDrug"
            @end="endDragg"
        >
            <div v-for="group in groups" :key="group.id">
                <group
                    :group="group"
                    @updateGroup="loadGroups"
                    @updateGroupDrug="endDragg"
                />
            </div>
        </draggable>
        <div class="add-list">
            <div class="add-list-new" @click="toggleGroup" v-if="!isAddGroup">
                <span class="material-icons-outlined icon"> add </span>
                <span class="txt-add"> Add a list </span>
            </div>
            <div class="add-list-container" v-if="isAddGroup">
                <label>
                    <el-input
                        placeholder="Enter list title..."
                        v-model="newGroup.title"
                        @keyup.enter.native="addGroup"
                    ></el-input>
                    <div class="btn-add">
                        <el-button type="primary" class="btn" @click="addGroup">
                            Add list</el-button
                        >
                        <span
                            class="material-icons-outlined grey"
                            @click="toggleGroup"
                            >close</span
                        >
                    </div>
                </label>
            </div>
        </div>
    </section>
</template>

<script>
import { boardService } from '../service/board.service';
import group from '../cmp/group.vue';
import draggable from 'vuedraggable';
export default {
    name: 'groups',
    components: {
        group,
        draggable,
    },
    data() {
        return {
            isAddGroup: false,
            newGroup: boardService.getEmptyGroup(),
            groups: [],
        };
    },
    created() {
        this.loadGroups();
    },
    methods: {
        async endDragg() {
            await this.$store.dispatch({
                type: 'updateGroups',
                groups: this.groups,
            });
            this.loadGroups();
        },
        loadGroups() {
            this.groups = [];

            this.groups = JSON.parse(
                JSON.stringify(this.$store.getters.getBoard.groups)
            );
        },
        toggleGroup() {
            this.isAddGroup = !this.isAddGroup;
        },
        async addGroup() {
            if (!this.newGroup.title) return;
            try {
                await this.$store.dispatch({
                    type: 'addGroup',
                    newGroup: this.newGroup,
                });
                this.newGroup = boardService.getEmptyGroup();
                this.loadGroups();
            } catch (err) {
                console.log(err);
            }
        },
        async updateGroups() {
            try {
                await this.$store.dispatch({
                    type: 'updateGroups',
                    groups: this.groups,
                });
                this.loadGroups();
            } catch (err) {
                console.log(err);
            }
        },
        onDrug(evt) {
            // window.console.log(evt);
            // this.updateGroups();
        },
    },
    computed: {
        getGroups() {
            return this.groups;
        },
    },
    watch: {
        '$store.getters.getBoard'(board) {
            this.groups = board.groups;
        },
    },
};
</script>

<style></style>
