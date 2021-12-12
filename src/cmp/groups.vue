<template>
  <section class="groups">
    <!-- @mouseover="login" @keydown="isOver" @keyup="isOver"> -->
    <!-- <div class="mouseover" :style="move">
             <span class="material-icons-outlined"> favorite </span>
         </div> -->
    <Container
      orientation="horizontal"
      @drop="onColumnDrop($event)"
      drag-handle-selector="header"
      :drop-placeholder="upperDropPlaceholderOptions"
      drag-class="card-ghost"
    >
      <Draggable v-for="group in groups" :key="group.id">
        <div>
          <group :group="group" :board="board" @updateGroup="loadGroups" />
        </div>
      </Draggable>
    </Container>
    <!-- @updateGroupDrug="endDragg" -->

    <div class="add-list">
      <div class="add-list-new" @click="toggleGroup" v-if="!isAddGroup">
        <span class="icon-add">  </span>
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
            <el-button type="primary" class="btn" @click="addGroup"> Add list</el-button>
            <span class="material-icons-outlined grey" @click="toggleGroup">close</span>
          </div>
        </label>
      </div>
    </div>
  </section>
</template>

<script>
import { boardService } from '../service/board.service';
import { applyDrag } from '../service/util.service.js';
import group from '../cmp/group.vue';
// import draggable from 'vuedraggable';
import { Container, Draggable } from 'vue-smooth-dnd';
// import NavSide from './nav-side.vue';

export default {
  name: 'groups',

  data() {
    return {
      // isOpenModal:true,
      isAddGroup: false,
      newGroup: boardService.getEmptyGroup(),
      groups: [],
      board: null,
      upperDropPlaceholderOptions: {
        className: 'cards-drop-preview',
        animationDuration: '150',
        showOnTop: true,
      },
      // mouseOver:true
    };
  },
  created() {
    this.loadGroups();
    this.board = JSON.parse(JSON.stringify(this.$store.getters.getBoard));
  },
  methods: {
    // login(ev){
    //     if (this.mouseOver) {
    //         this.$store.dispatch({type:'updateMouse', mouseEvent:{x:ev.clientX+100, y:ev.clientY+100}})
    //     }
    // },
    // isOver(){
    //         this.mouseOver=!this.mouseOver
    // },
    async onColumnDrop(dropResult) {
      const board = Object.assign({}, this.board);
      board.groups = applyDrag(board.groups, dropResult);
      await this.$store.dispatch({ type: 'updateBoard', board });
    },
    async endDragg() {
      await this.$store.dispatch({
        type: 'updateGroups',
        groups: this.groups,
      });
      this.loadGroups();
    },
    loadGroups() {
      this.groups = [];

      this.groups = JSON.parse(JSON.stringify(this.$store.getters.getBoard.groups));
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
  },
  computed: {
    // move(){

    //     const target =this.$store.getters.getMouseEvents
    //     console.log(target);
    //     return{top:`${target.y}px`,left:`${target.x}px`}
    // },
    getGroups() {
      return this.groups;
    },
  },
  components: {
    Draggable,
    Container,
    group,
    // NavSide,
  },
  watch: {
    '$store.getters.getBoard'(board) {
      this.board = { ...board };
      this.groups = [...board.groups];
    },
  },
};
</script>

<style lang="scss">
.card-ghost {
  transform: rotateZ(5deg);
}
.mouseover {
  position: fixed;
  z-index: 100000;
  height: 50px;
  width: 50px;
  color: red;
}
.groups {
}
</style>
