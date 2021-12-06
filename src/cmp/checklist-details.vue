<template>
    <article class="checklist">
        <span class="material-icons-outlined icon"> check_box </span>

        <header class="checklist-header">
            <div class="show" v-if="!editTitleMode">
                <h3 @click="editTitle">
                    {{ checklist.title }}
                </h3>
                <div class="todos-btn">
                    <a
                        class="checked-item"
                        v-if="countTodosDone(copyList.id)"
                        @click="toggleCheckedItem(copyList.id)"
                        >Hide checked items</a
                    >
                    <a
                        v-else
                        class="checked-item"
                        @click="toggleCheckedItem(copyList.id)"
                        >Show checked items({{
                            countTodosDone(copyList.id)
                        }})</a
                    >
                    <a
                        class="delete-checklist"
                        @click="deleteChecklist(copyList.id)"
                        >Delete</a
                    >
                </div>
            </div>

            <div v-else class="description-edit">
                <input
                    class="description-edit-input"
                    type="textarea"
                    ref="editInput"
                    v-model="copyList.title"
                />

                <div class="description-edit-btn">
                    <a class="close-btn el-icon-close" @click="editTitle"></a>

                    <a class="save" @click="saveTitle">Save</a>
                </div>
            </div>
        </header>

        <div class="progress-z">
            <el-progress
                :percentage="statistic"
                :status="progress"
            ></el-progress>
        </div>
        <ul class="todos-container">
            <li
                class="todos"
                v-for="(todo, idx) in checklist.todos"
                :key="todo.id"
                @click="editCurrentTodo(todo.id)"
            >
                <el-checkbox
                    class="checkbox"
                    v-model="todo.isDone"
                    @click.self="x"
                >
                </el-checkbox>

                <div
                    v-if="todo.id !== editCurrentTodoMode"
                    class="checklist-todo"
                >
                    {{ todo.txt }}
                </div>

                <form v-else>
                    <label :for="idx">
                        <input
                            type="textarea"
                            :id="idx"
                            :name="idx"
                            v-model="newTodo.txt"
                        />
                    </label>
                    <a class="save" @click="addNewTodo">Add</a>
                    <a class="back-btn close-btn el-icon-close"></a>
                </form>
            </li>
        </ul>

        <div class="add-item">
            <a v-if="!editTodoMode" class="item-btn" @click="addTodo"
                >Add an item</a
            >

            <form v-else>
                <input
                    type="textarea"
                    placeholder="Add an item"
                    v-model="newTodo.txt"
                />
                <a class="add" @click="addNewTodo">Add</a>
                <a
                    @click="closeTodoAdd"
                    class="back-btn close-btn el-icon-close"
                ></a>
            </form>
        </div>
        <!-- </div> -->
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
            editTitleMode: false,
            editTodoMode: false,
            editCurrentTodoMode: null,
            copyList: null,
        };
    },
    created() {
        this.copyList = JSON.parse(JSON.stringify(this.checklist));
    },
    methods: {
        countTodosDone(checklistId) {
            let list = this.checklist;
            let doneCount = list.todos.reduce((acc, todo) => {
                return todo.isDone ? acc + 1 : acc;
            }, 0);
            return doneCount;
            // TODO: return count todos is done
        },
        x() {},
        toggleCheckedItem(checklistId) {
            // TODO: all logic Which button show
        },
        addTodo() {
            this.editTodoMode = true;
        },
        editCurrentTodo(todoId) {
            this.editCurrentTodoMode = todoId;
        },
        closeTodoAdd() {
            this.editTodoMode = false;
        },
        closeEditCurrentTodo() {
            this.editTodoMode = false;
        },
        addNewTodo() {
            this.closeTodoAdd();
            this.editCurrentTodoMode = false;
            if (!this.newTodo.id) {
                this.newTodo.id = utilService.makeId();
                this.copyList.todos.push(this.newTodo);
            } else {
                let todoIdx = this.copyList.todos.findIndex(
                    (t) => (t.id = this.newTodo.id)
                );
                this.copyList.todos.splice(todoIdx, 1, this.newTodo);
            }
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
            this.$emit('updateChecklist', this.copyList);
        },
        editTitle() {
            this.editTitleMode = !this.editTitleMode;
        },
    },
    computed: {
        statistic() {
            let done = this.checklist.todos.reduce((acc, todo) => {
                return todo.isDone ? ++acc : acc;
            }, 0);
            return Math.round((done / this.checklist.todos.length) * 100);
        },
        progress() {
            if (this.statistic === 100) {
                return 'success';
                return 'backgroundColor: #61bd4f';
            }
        },
    },
};
</script>

<style></style>
