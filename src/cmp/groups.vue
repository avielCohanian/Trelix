<template>
    <section class="groups">
        <div v-for="group in getGroups" :key="group.id">
            <group :group="group" />
        </div>
  <label for="add" @click="toggleGroup" v-if="!isAddGroup">
            <el-input
                name="add"
                placeholder="+ Add a list"
                v-model="newGroup.title"
            ></el-input>
        </label>

        <label v-if="isAddGroup" >
            <el-input
                placeholder="Enter list title..."
                v-model="newGroup.title"
            ></el-input>
            

            <el-button type="primary" @click="addGroup"> Add list</el-button>
            <!-- <font-awesome-icon icon="times" @click="toggleGroup" /> -->
            <i class="el-icon-close" @click="toggleGroup"></i>
            
        </label>

    </section>
</template>

<script>
import { boardService } from '../service/board.service';
import group from './group.vue';

export default {
    name: 'groups',
    components: {
        group,
    },
    data() {
        return {
            isAddGroup: false,

             newGroup: boardService.getEmptyGroup(),
        };
    },
    created() {},
    methods: {
        toggleGroup() {
            this.isAddGroup = !this.isAddGroup;
        },

        async addGroup() {
            try {
                console.log(this.newGroup);
                var res = await this.$store.dispatch({
                    type: 'addGroup',
                    newGroup: this.newGroup,
                });
                this.newGroup = boardService.getEmptyGroup();
                console.log(res);
            } catch (err) {
                console.log(err);
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
