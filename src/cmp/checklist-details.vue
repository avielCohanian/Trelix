<template>
  <article class="checklist">
    <span class="material-icons-outlined icon"> check_box </span>
    <header class="checklist-header" :style="{ height: editMode }">
      <div class="show" v-if="!editTitleMode">
        <h3 @click="editTitle">
          {{ checklist.title }}
        </h3>
        <div class="todos-btn" v-if="checklist">
          <span v-if="countTodosDone">
            <a v-show="longSow" class="checked-item" @click="toggleCheckedItem">Hide checked items</a>
            <a v-show="!longSow" class="checked-item" @click="toggleCheckedItem"
              >Show checked items({{ countTodosDone }})</a
            >
          </span>

          <a class="delete-checklist" @click="deleteChecklist($event)" ref="checklistDeleteEl">Delete</a>
        </div>
      </div>

      <div v-else class="description-edit">
        <input class="description-edit-input" type="textarea" ref="editInputTitle" v-model="copyList.title" />

        <div class="description-edit-btn">
          <a class="close-btn el-icon-close" @click="editTitle"></a>

          <a class="save" @click="saveTitle">Save</a>
        </div>
      </div>
    </header>

    <div class="progress-z">
      <el-progress :percentage="statistic" :status="progress"> </el-progress>
      <span class="statistic">{{ statistic }}%</span>
    </div>

    <ul class="todos-container">
      <li class="todos" v-for="todo in todosToShow" :key="todo.id">
        <el-checkbox @change="updateStatistic(todo.id)" class="checkbox" v-model="todo.isDone"> </el-checkbox>

        <div class="todo-row" @click="editCurrentTodo(todo.id)">
          <div v-show="todo.id !== editTodoTxt" class="checklist-todo">
            {{ todo.txt }}
          </div>

          <div v-show="todo.id === editTodoTxt" class="edit-container">
            <input type="textarea" v-model="editTodo" ref="editInputTodo" />
            <span class="btn-container">
              <a class="save" @click.stop="updateTodo">Add</a>
              <span class="back-btn close-btn el-icon-close" @click.stop="closeEditContainer"></span>
              <span class="more-btn">
                <span class="el-icon-more"></span>
              </span>
            </span>
          </div>
        </div>
      </li>
    </ul>

    <div class="add-item">
      <a v-if="!editTodoMode" class="item-btn" @click="addTodo">Add an item</a>

      <form v-else @submit.prevent="addNewTodo">
        <input type="textarea" placeholder="Add an item" v-model="newTodo.txt" ref="editInputNew" />
        <a class="add" @click="addNewTodo">Add</a>
        <span @click="closeTodoAdd" class="back-btn close-btn el-icon-close"></span>
      </form>
    </div>
  </article>
</template>

<script>
import { utilService } from '../service/util.service.js';
import { boardService } from '../service/board.service.js';
export default {
  name: 'checklistDetails',
  props: {
    checklist: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newTodo: { txt: '', isDone: false },
      editTitleMode: false,
      copyList: null,
      longSow: true,
      editTodoMode: false,

      updateTodoMode: null,
      editTodo: null,
      editTodoTxt: '',
    };
  },
  created() {
    this.copyList = JSON.parse(JSON.stringify(this.checklist));
  },
  methods: {
    editCurrentTodo(todoId) {
      this.editTodoMode = false;
      this.editTodoTxt = todoId;
      this.updateTodoMode = this.copyList.todos.find((todo) => (todo.id === todoId ? todo : null));
      this.editTodo = this.updateTodoMode.txt;
    },

    updateTodo() {
      let todoIdx = this.copyList.todos.findIndex((t) => t.id === this.updateTodoMode.id);
      this.updateTodoMode.txt = this.editTodo;
      this.copyList.todos.splice(todoIdx, 1, this.updateTodoMode);
      this.editTodoTxt = '';
      this.saveChecklist();
    },

    closeEditContainer() {
      this.editTodoTxt = '';
    },

    addTodo() {
      this.editTodoMode = true;
      this.editTodoTxt = '';
    },
    closeTodoAdd() {
      this.editTodoMode = false;
    },
    addNewTodo() {
      this.closeTodoAdd();
      this.newTodo.id = utilService.makeId();
      this.copyList.todos.push(this.newTodo);
      this.newTodo = { txt: '', isDone: false };
      this.saveChecklist();
    },

    newTodoRest() {
      this.newTodo = { txt: '', isDone: false };
    },
    saveTitle() {
      this.editTitle();
      this.saveChecklist();
    },
    toggleCheckedItem() {
      this.longSow = !this.longSow;
    },

    updateStatistic(todoId) {
      this.$emit('updateList', this.checklist);
    },
    saveChecklist() {
      this.$emit('updateList', this.copyList);
    },
    editTitle() {
      this.editTitleMode = !this.editTitleMode;
    },
    deleteChecklist(e) {
      // delete-checklist
      // .getBoundingClientRect()
      let { x, y } = this.$refs.checklistDeleteEl.getBoundingClientRect();
      let pos = { x, y };
      this.$emit('deleteChecklist', this.checklist.id, pos);
    },
  },
  computed: {
    statistic() {
      if (this.checklist.todos && this.checklist.todos.length) {
        let done = this.checklist.todos.reduce((acc, todo) => {
          return todo.isDone ? ++acc : acc;
        }, 0);
        return Math.round((done / this.checklist.todos.length) * 100);
      } else return 0;
    },
    progress() {
      if (this.statistic === 100) {
        return 'success';
        return 'backgroundColor: #61bd4f';
      }
    },
    editMode() {
      return this.editTitleMode ? '110px' : '48px';
    },
    countTodosDone() {
      let list = this.checklist;
      if (list.todos && list.todos.length) {
        let doneCount = list.todos.reduce((acc, todo) => {
          return todo.isDone ? acc + 1 : acc;
        }, 0);

        return doneCount;
      } else return 0;
    },
    todosToShow() {
      if (this.longSow) {
        return this.checklist.todos;
      }
      return this.checklist.todos.filter((t) => !t.isDone);
    },
  },
  watch: {
    editTitleMode() {
      if (this.editTitleMode) {
        setTimeout(() => {
          this.$refs.editInputTitle.select();
        }, 50);
      }
    },
    editTodoMode() {
      console.log(this.$refs);
      if (this.editTodoMode) {
        setTimeout(() => {
          this.$refs.editInputNew.focus();
        }, 50);
      }
    },
    editInputNew() {
      console.log(this.$refs);
      if (this.editInputNew) {
        setTimeout(() => {
          this.$refs.editInputTodo.focus();
        }, 50);
      }
    },
  },
};
</script>

<style></style>
