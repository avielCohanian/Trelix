<template>
  <article class="checklist">
    <span class="material-icons-outlined icon"> check_box </span>
    {{ checklist.id }}
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

          <a class="delete-checklist" @click="deleteChecklist">Delete</a>
        </div>
      </div>

      <div v-else class="description-edit">
        <input
          class="description-edit-input"
          type="textarea"
          ref="editInput"
          v-model="copyList.title"
          @blur="editTitle"
          @keyup.enter="editTitle"
        />

        <div class="description-edit-btn">
          <a class="close-btn el-icon-close" @click="editTitle"></a>

          <a class="save" @click="saveTitle">Save</a>
        </div>
      </div>
    </header>

    <div class="progress-z">
      <el-progress :percentage="statistic" :status="progress"></el-progress>
    </div>
    <ul class="todos-container">
      <li class="todos" v-for="todo in todosToShow" :key="todo.id">
        <el-checkbox class="checkbox" v-model="todo.isDone" @click.stop> </el-checkbox>
        <!-- @click.self="x" -->
        <div class="todo-row" @click="editCurrentTodo(todo.id)">
          <div v-if="todo.id !== editCurrentTodoMode && !updateTodoMode" class="checklist-todo">
            {{ todo.txt }}
          </div>

          <div v-else class="edit-container">
            <input type="textarea" v-model="editTodo.txt" />
            <a class="save" @click="updateTodo">Add</a>
            <span class="back-btn close-btn el-icon-close" @click="closeEditContainer"></span>
          </div>
        </div>
      </li>
    </ul>

    <div class="add-item">
      <a v-if="!editTodoMode" class="item-btn" @click="addTodo">Add an item</a>

      <form v-else @submit.prevent="addNewTodo">
        <input type="textarea" placeholder="Add an item" v-model="newTodo.txt" />
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
      checklistName: this.checklist.name,
      newTodo: { txt: '', isDone: false },
      todoToEdit: null,
      editTitleMode: false,
      copyList: null,
      longSow: true,
      editTodoMode: false,

      updateTodoMode: false,
      editTodo: null, //currTodo
      editCurrentTodoMode: null, //todoId
    };
  },
  created() {
    this.copyList = JSON.parse(JSON.stringify(this.checklist));
  },
  methods: {
    x(todoId) {
      return todoId !== this.editCurrentTodoMode;
    },
    toggleCheckedItem() {
      this.longSow = !this.longSow;
    },
    addTodo() {
      this.editTodoMode = true;
    },
    editCurrentTodo(todoId) {
      this.editCurrentTodoMode = todoId;
      this.updateTodoMode = true;
      this.editTodo = this.copyList.todos.find((todo) => todo.id === todoId);
    },
    closeTodoAdd() {
      this.editTodoMode = false;
    },
    closeEditCurrentTodo() {
      this.editTodoMode = null;
      this.copyList.todos = null;
      console.log(this.editTodoMode);
    },
    addNewTodo() {
      this.closeTodoAdd();
      // this.editCurrentTodoMode = false;
      if (!this.newTodo.id) {
        this.newTodo.id = utilService.makeId();
        this.copyList.todos.push(this.newTodo);
      } else {
        let todoIdx = this.copyList.todos.findIndex((t) => (t.id = this.newTodo.id));
        this.copyList.todos.splice(todoIdx, 1, this.newTodo);
      }
      this.newTodo = { txt: '', isDone: false };
      this.saveChecklist();
    },
    updateTodo() {
      // editTodo
      let todoIdx = this.copyList.todos.findIndex((t) => (t.id = this.editTodo.id));
      this.copyList.todos.splice(todoIdx, 1, this.editTodo);
      // this.editTodo = null;
      this.updateTodoMode = false;
      this.saveChecklist();
    },
    newTodoRest() {
      this.newTodo = { txt: '', isDone: false };
    },
    saveTitle() {
      this.editTitle();
      this.saveChecklist();
    },

    saveChecklist() {
      this.$emit('updateList', this.copyList);
    },
    editTitle() {
      this.editTitleMode = !this.editTitleMode;
    },
    deleteChecklist() {
      this.$emit('deleteChecklist', this.checklist.id);
    },
    closeEditContainer() {
      console.log(this.editCurrentTodoMode);
      this.editCurrentTodoMode = null;
      this.editTodo = null;
      console.log(this.editCurrentTodoMode);
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
};
</script>

<style></style>
