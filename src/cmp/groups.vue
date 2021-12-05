<template>
  <section class="groups">
    <draggable class="list-group flex" :list="getGroups" @change="onDrug">
      <div v-for="group in groups" :key="group.id">
        <!-- <draggable  class="list-group" :list="group" @change="onDrug"> -->
        <group :group="group" @updateGroup="loadGroups" />
        <!-- </draggable > -->
      </div>
    </draggable>
    <div class="add-list">
      <label for="add" @click="toggleGroup" v-if="!isAddGroup">
        <el-input
          :style="{ width: '272px' }"
          class="opacity-more"
          name="add"
          placeholder="+ Add a list"
          v-model="newGroup.title"
        ></el-input>
      </label>
      <div class="add-list-container" v-if="isAddGroup">
        <label>
          <el-input
            placeholder="Enter list title..."
            v-model="newGroup.title"
            @keyup.enter.native="addGroup"
          ></el-input>
          <div class="btn-add">
            <el-button type="primary" @click="addGroup"> Add list</el-button>
            <span class="material-icons-outlined grey" @click="toggleGroup"
              >close</span
            >
          </div>
        </label>
      </div>
    </div>
  </section>
</template>

<script>
import { boardService } from "../service/board.service";
import group from "../cmp/group.vue";
import draggable from "vuedraggable";
export default {
  name: "groups",
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
    //draggable
    //  add: function() {
    //   this.list.push({ name: "Juan" });
    // },
    // replace: function() {
    //   this.list = [{ name: "Edgard" }];
    // },
    // clone: function(el) {
    //   return {
    //     name: el.name + " cloned"
    //   };
    // },
    loadGroups() {
      this.groups = [];
      console.log(this.groups);
      this.groups = JSON.parse(
        JSON.stringify(this.$store.getters.getBoard.groups)
      );
      console.log(this.groups);
    },
    toggleGroup() {
      this.isAddGroup = !this.isAddGroup;
    },
    async addGroup() {
      if (!this.newGroup.title) return;
      try {
        await this.$store.dispatch({
          type: "addGroup",
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
          type: "updateGroups",
          groups: this.groups,
        });
        this.loadGroups();
      } catch (err) {
        console.log(err);
      }
    },
    onDrug(evt) {
      console.log(evt);
      window.console.log(evt);
      this.updateGroups();
    },
  },
  computed: {
    getGroups() {
      return this.groups;
    },
  },
  watch: {
    "$store.getters.getBoard"(board) {
      console.log("watch");
      console.log("board:", board);
      //  this.loadGroups()
      this.groups = board.groups;
      console.log('this.groups',this.groups);
    },
    // 'groups'(){
    //   console.log('watch');
    //    this.loadGroups()
    // }
  },
};
</script>

<style></style>
