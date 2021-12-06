<template>
    <section class="groups">
        <Container
            orientation="horizontal"
            @drop="onColumnDrop($event)"
            drag-handle-selector=".column-drag-handle"
            @drag-start="dragStart"
            :drop-placeholder="upperDropPlaceholderOptions"
        >
            <Draggable v-for="group in getGroups" :key="group.id">
                <group @onCardDrop="onCardDrop" :group="group" />
            </Draggable>
        </Container>
        <div class="add-list">
            <label for="add" @click="toggleGroup" v-if="!isAddGroup">
                <el-input
                    name="add"
                    placeholder="+ Add a list"
                    v-model="newGroup.title"
                ></el-input>
            </label>

            <label v-if="isAddGroup">
                <el-input
                    placeholder="Enter list title..."
                    v-model="newGroup.title"
                ></el-input>

                <el-button type="primary" @click="addGroup">
                    Add list</el-button
                >
                <!-- <font-awesome-icon icon="times" @click="toggleGroup" /> -->
                <i class="el-icon-close" @click="toggleGroup"></i>
            </label>
        </div>
    </section>
</template>

<script>
import { boardService } from '../service/board.service';
import group from './group.vue';
import { Container, Draggable } from 'vue-smooth-dnd';
import { applyDrag, generateItems } from '../service/util.service.js';

export default {
    name: 'groups',
    components: {
        group,
        Container,
        Draggable,
    },
    data() {
        return {
            isAddGroup: false,

            newGroup: boardService.getEmptyGroup(),
            groups: this.getGroups,
            // scene,
            upperDropPlaceholderOptions: {
                className: 'cards-drop-preview',
                animationDuration: '150',
                showOnTop: true,
            },
        };
    },
    created() {
        this.groups = this.getGroups;
    },
    methods: {
        toggleGroup() {
            this.isAddGroup = !this.isAddGroup;
        },

        async addGroup() {
            try {
                var res = await this.$store.dispatch({
                    type: 'addGroup',
                    newGroup: this.newGroup,
                });
                this.newGroup = boardService.getEmptyGroup();
            } catch (err) {
                console.log(err);
            }
        },
        dragStart() {
            console.log('drag started');
        },
        log(...params) {
            console.log(...params);
        },
        onCardDrop({ columnId, dropResult }) {
            if (
                dropResult.removedIndex !== null ||
                dropResult.addedIndex !== null
            ) {
                let groups = JSON.parse(JSON.stringify(this.groups));
                const column = groups.filter((p) => p.id === columnId)[0];
                console.log(column);
                const columnIndex = groups.indexOf(column);
                console.log(columnIndex);
                const newColumn = Object.assign({}, column);
                newColumn = applyDrag(newColumn, dropResult);
                console.log(newColumn);
                groups.splice(columnIndex, 1, newColumn);
                this.groups = groups;
            }
        },
    },
    computed: {
        getGroups() {
            console.log(this.$store.getters.getBoard);
            return this.$store.getters.getBoard.groups;
        },
    },
};
</script>

<style></style>
